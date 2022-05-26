//@ts-nocheck
import React, { useState, useEffect, useRef, lazy } from 'react';
import { Avatar, IconButton } from '@mui/material';
import { AttachFile, EnhancedEncryptionSharp, Send } from '@mui/icons-material';
import { useParams, Link } from 'react-router-dom';
import Filter from 'bad-words';
import { firebase, db, storage, functions } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import badWordsList from '../../config/badWords.json';
import ChatMessage from './ChatMessage';
import Loader from '../Loader/Loader';
import { InView } from 'react-intersection-observer';
import TextareaAutosize from 'react-textarea-autosize';
import imageCompression from 'browser-image-compression';
import SendMessageLoader from '../Loader/SendMessageLoader';
import { logEvent } from '../../utils/analytics';
import { MessageDocument, MessageRoomDocument } from '../../types/Messaging';
import GroupProfileCard from './GroupProfileCard';

const LazyProfileCard = lazy(() => import('./ProfileCard'));
const LazyAttachmentsCard = lazy(() => import('./AttachmentsCard'));

let messageArray = []
let listeners = []    // list of listeners
let start = null      // start position of listener
let end = null        // end position of listener

const DOCUMENTS_PER_PAGE = 15;

function Chat({screenSize}) {

    const { user, userDetails } = useAuth();

    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomDoc, setRoomDoc] = useState<MessageRoomDocument>();
    const [roomName, setRoomName] = useState<string>(""); //Will have to reach out again and figure out what its room name is.
    const [roomPic, setRoomPic] = useState("");
    const [roomUsers, setRoomUsers] = useState<string[]>([]);
    const [recipientId, setRecipientId] = useState<string>();
    const [isMentor, setIsMentor] = useState();
    const [messages, setMessages] = useState<MessageDocument[]>([]);
    const [loading, setLoading] = useState(true);
    const [messageLoading, setMessageLoading] = useState(true);
    const [sendLoading, setSendLoading] = useState(false);
    const [loadedAllMessages, setLoadedAllMessages] = useState(false);
    const [fileMessages, setFileMessages] = useState([]);
    const [newMessageFlag, setNewMessageFlag] = useState(false);
    const [showProfPicAndAttachments, setShowProfPicAndAttachments] = useState(false);
    const [doneInitialScroll, setDoneInitialScroll] = useState(false);
    const [fileSizeWarning, setFileSizeWarning] = useState(false);
    const [tooManyFilesWarning, setTooManyFilesWarning] = useState(false);
    const [roomDoesNotExistWarning, setRoomDoesNotExistWarning] = useState(false);

    const messagesEndRef = useRef(null);
    const filter = new Filter({ emptyList: true, list: badWordsList });

    //For if screen size updates
    useEffect(() => {
        if (screenSize >= 2){
            setShowProfPicAndAttachments(false)
        }
    }, [screenSize])

    //TO get the messages
    useEffect(() => {
        if (!user) return;

        //Clear all variables before reloading page.
        messageArray = [];
        listeners = [];
        start = null;
        end = null;
        setMessages(messageArray)
        getMessages();

        return () => detachListeners();
    }, [roomId, user]);

    //To get the roomName and info
    useEffect(() => {
        if (roomId && user) {
            setLoading(true);
            //Get Room Name
            const unsub1 = db.collection('rooms').doc(roomId).onSnapshot(async (snapshot) => { //<-- Add an unsubscribe
                //NO ERROR, ROOM EXISTS
                setRoomDoesNotExistWarning(false);
                //TODO: fixable after firebase migration
                //@ts-ignore
                const snapData = {
                    id: snapshot.id,
                    ref: snapshot.ref,
                    ...(snapshot.data())
                } as MessageRoomDocument

                setRoomDoc(snapData)
                
                logEvent('loaded_room',{
                    roomId: roomId,
                    ...snapData
                })

                //If there is a name (it means it is a group chat)
                if (snapData?.name) {
                    setRoomName(snapData.name)
                    setRoomPic(snapData.picture || "")
                    setRoomUsers(snapData.users)
                //If there is no name (A direct message between two person chat)
                } else {
                    const { roomName, roomPic, isMentor, recipientId } = await findRoomNameAndRoomPicAndRecipientId(snapData);
                    setRoomName(roomName) //Implemented function (actually from Sidebar.js) to get the actual room name    
                    setRoomPic(roomPic)
                    setIsMentor(isMentor)
                    setRecipientId(recipientId) //Switch this to undefined, and add the line below to test group chats for now.
                    // setRoomUsers(snapData.users) 
                }
                setLoading(false);
            }, error => {
                console.log("error", error);
                setRoomDoesNotExistWarning(true);
                setLoading(false);
                return
            })

            return () => {
                unsub1();
            }
        }

    }, [roomId, user])

    //To scroll to bottom when messages are loaded
    useEffect(() => {
        //Only scrolls once when messages have loaded
        if (!doneInitialScroll && messages.length > 0){
            scrollToBottom()
            setDoneInitialScroll(true)
        }        
    }, [messages]);

    //When room ID changes, setDoneInitialScroll to false so it scrolls to bottom again
    useEffect(() => {
        setDoneInitialScroll(false)
    }, [roomId])

    //UseEffect to run everytime the fileSize warning comes up so the warning is only there for 5 seconds.
    useEffect(() => {
        if (fileSizeWarning === true){
            setTimeout(() => {
                setFileSizeWarning(false);
            }, 5000)
        }
    }, [fileSizeWarning])

    function handleUpdatedMessages(snapshot) {
        if(!user) return;
        // append new messages to message array
        snapshot.forEach((message) => {
            //Update the message's read field for the user to true
            if(!(message.data()?.read || {})[user.uid]){
                message.ref.update({ [`read.${user.uid}`] : true })
            } 

            // filter out any duplicates (from modify/delete events)         
            messageArray = messageArray.filter(x => x.id !== message.id)
            messageArray.push({ id: message.id, ...message.data() })
        })

        // remove post from local array if deleted
        snapshot.docChanges().forEach(change => {
            if (change.type === 'removed') {
                const message = change.doc
                //Remove post from our array if it is here
                messageArray = messageArray.filter(x => x.id !== message.id)
            }
        });
        
        messageArray = messageArray.filter(({ date }) => date != null);
        //Sort array because it is unsorted, filter date as it might be null
        messageArray.sort(({ date: x }, { date: y }) => {
            return x.toDate() - y.toDate()
        })
        setMessages(messageArray)
        setMessageLoading(false)
    }

    async function getMessages() {
        // query reference for the messages we want
        // single query to get startAt snapshot

        let ref = db.collection('rooms').doc(roomId).collection('messages')
        let snapshots = await ref.orderBy('date', 'desc')
            .limit(DOCUMENTS_PER_PAGE).get()
        // save startAt snapshot
        start = snapshots.docs[snapshots.docs.length - 1]

        let listener;

        if (!start) {
            listener = ref.orderBy('date', 'asc')
                .onSnapshot(snap => {
                    setNewMessageFlag(true)
                    handleUpdatedMessages(snap)
                })
        } else {
            // create listener using startAt snapshot (starting boundary)    
            listener = ref.orderBy('date', 'asc')
                .startAt(start)
                .onSnapshot(snap => {
                    setNewMessageFlag(true)
                    handleUpdatedMessages(snap)
                })
        }

        // add listener to list
        listeners.push(listener)
    }

    async function getMoreMessages() {
        let ref = db.collection('rooms').doc(roomId).collection('messages')
        setMessageLoading(true)
        if (!start) {
            setLoadedAllMessages(true);
            setMessageLoading(false)
            return;
        }
        // single query to get new startAt snapshot
        let snapshots = await ref.orderBy('date', 'desc')
            .startAt(start)
            .limit(DOCUMENTS_PER_PAGE).get()
        // previous starting boundary becomes new ending boundary
        end = start
        start = snapshots.docs[snapshots.docs.length - 1]
        // create another listener using new boundaries     
        if (!end) {
            setLoadedAllMessages(true);
            setMessageLoading(false)
            return;
        }
        let listener = ref.orderBy('date', 'asc')
            .startAt(start).endBefore(end)
            .onSnapshot(handleUpdatedMessages)
        listeners.push(listener)
    }

    // call to detach all listeners
    function detachListeners() {
        listeners.forEach(listener => listener())
    }

    const sendMessage = async (e) => {
        e.preventDefault();

        //We need to ensure that user exists, that room exists, and that it is not still loading. <-- We have to check for loading because
        // roomDoesNotExist starts off as true, and we need to make sure it stays as true even after loading.
        if (!user || roomDoesNotExistWarning || loading) return;

        //Check whether there are files and then send them. (Don't need to worry about below, if the user adds files and adds a message, it will send the files as one message then
        //the text message as the next message. If not, it just sends the files (or vice versa if there are no files))
        if (fileMessages.length > 0) {

            setSendLoading(true);

            //GO through the files to ensure they are all the suitable size.
            for (let i=0; i < fileMessages.length; i++){

                //Check whether the file is an image
                const isImage = ((((((((((((((((((((((((((((((((((((((((/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i)))))))))))))))))))))))))))))))))))))))).test(fileMessages[i].name);

                //If image is less than 5MB but bigger than 0.5MB, we compress it down to 0.5MB.
                if (isImage && fileMessages[i].size > 500000 && fileMessages[i].size <= 5000000){
                    const compressedFile = await imageCompression(fileMessages[i], {maxSizeMB: 0.49});
                    fileMessages[i] = compressedFile;
                }
            }

            //Creating roomNameObject object
            const {read, roomNameObject} = createReadAndRoomName(roomDoc)

            //Record current Timestamp.
            const fileSendDate = new Date();

            //Go through the files here and upload them to storage, keep track of the id. The room should be messageFiles/roomId/
            const fileMessagesStorageDetails = await Promise.all(fileMessages.map(async (file, index) => {
                const storagePath = `roomFiles/${roomId}/${fileSendDate.toISOString()}_${file.name}`;
                const result = await storage.ref(storagePath).put(file);
                return { path: storagePath, ref: await result.ref.getDownloadURL() };
            }))

            const attachments = fileMessagesStorageDetails.map((storageDetail, index) => {

                let fileName = fileMessages[index].name;

                const isImage = ((((((((((((((((((((((((((((((((((((((((/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i)))))))))))))))))))))))))))))))))))))))).test(fileName);

                return {
                    filename: fileName,
                    fileType: isImage ? "image" : "others",
                    fileSize: fileMessages[index].size,
                    bucketPath: storageDetail.path,
                    uploadedOn: fileSendDate,
                    downloadUrl: storageDetail.ref,
                }
            })

            const recipientIds =  roomDoc.users.filter(mod => mod !== user.uid)

            db.collection('rooms').doc(roomId).collection('messages').add({
                messageType: "file",
                files: attachments,
                date: firebase.firestore.FieldValue.serverTimestamp(),
                senderId: user.uid,
                senderUsername: userDetails.name,
                recipientIds: recipientIds,
                roomName: roomNameObject,
                read: read,
            }).then(() => {
                if (input === ""){
                    setSendLoading(false)
                    scrollToBottom()
                } 
                logEvent("send_file_message", {
                    files: attachments.length,
                    roomId: roomId,
                });

                if (input === ""){
                    // If there is no text imput, then we can go ahead and call the sendEmailNotification function
                    functions.httpsCallable('sendEmailNotification')({ recipientIds: recipientIds})
                    .catch((error) => {
                        console.error(error)
                    })
                }
            })
            
            setFileMessages([]); //Reset the files at the end
        }

        //Fixed bug (now requires text to send message)
        if (input !== "") {

            setSendLoading(true);

            //Creating roomNameObject object
            const {read, roomNameObject} = createReadAndRoomName(roomDoc)

            const recipientIds =  roomDoc.users.filter(mod => mod !== user.uid)

            db.collection('rooms').doc(roomId).collection('messages').add({
                messageType: "text",
                message: input,
                date: firebase.firestore.FieldValue.serverTimestamp(),
                senderId: user.uid,
                senderUsername: userDetails.name,
                recipientIds: recipientIds,
                roomName: roomNameObject,
                read: read,
            }).then(() => {
                setSendLoading(false);
                scrollToBottom();
                logEvent("send_message", {
                    roomId: roomId,
                    messageLength: input.length,
                });
                // Call the sendEmailNotification backend function
                functions.httpsCallable('sendEmailNotification')({ recipientIds: recipientIds})
                .catch((error) => {
                    console.error(error)
                })
            })
            
            setInput(""); /* Reset the input at the end */
        }
    }

    const findRoomNameAndRoomPicAndRecipientId = async (data) => {
        let recipientId = data?.users.filter((userId) => userId !== user?.uid)[0] //<-- Remove the destructuring

        const userData = (await db.doc(`usersPublic/${recipientId}`).get()).data()

        return {
            roomName: userData?.name, //<-- asynchrously fetch user id's
            roomPic: `https://storage.googleapis.com/speer-education-dev.appspot.com/users/${recipientId}/thumb-profilePicture.png`,
            isMentor: userData?.isMtr,
            recipientId: recipientId
        }

    }

    const createReadAndRoomName = (roomDoc) => {

            //Creating read object
            const read = {}
            roomDoc.users.forEach((id) => read[id] = false) //Set all as false
            read[user.uid] = true //then set our current user to true (since we are sending we obv have read it)

            //Creating roomNameObject object
            const roomNameObject = {};

            //If more than 2 users, it's a group
            if (roomDoc.users.length > 2){

                //For roomNameObject, just use roomName for all
                roomDoc.users.forEach((id) => roomNameObject[id] = roomName)

            } else {
                //Since only 2 users, we put both the id's and the our users' name
                roomDoc.users.forEach((id) => roomNameObject[id] = userDetails.name) 
                //We don't want our id to be our own name, we set it to the current roomName (the other user's name)
                roomNameObject[user.uid] = roomName 
            }


        return {read: read, roomNameObject: roomNameObject}
    }

    useEffect(() => {
        if(newMessageFlag) newMessageFlag.current?.scrollIntoView()
        setNewMessageFlag(false);
    },[newMessageFlag])

    const handleFileAdd = (e) => {
        let files = e.target.files;
        files = [...files]; //Turning FileList into an array

        //Too many files
        if (files.length > 3) {
            //TODO: Notify user that we only take the first 3 files, too many files.
            setTooManyFilesWarning(true);

            //Then cut the files array to only the first 3.
            files.splice(3);
        }

        //GO through the files to ensure they are all the suitable size.
        for (let i=0; i < files.length; i++){

            //Limit is 5MB
            if (files[i].size > 5000000) {
                //Since the file is too big, we empty fileMessages, set off the alert to the user, and stop the uploading.
                setFileMessages([]);
                setFileSizeWarning(true);
                setSendLoading(false);
                scrollToBottom();

                //TODO: add a sound to notify user (actually shouldn't do this here, should do this in a useEffect that listens to the Warning becoming true)
                return;
            } 
        }

        //Set the file message.
        setFileMessages(files);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) {
            e.preventDefault();
            sendMessage(e);
        }
    }

    const toggleShowProfPicAndAttachments = () => {
        setShowProfPicAndAttachments(!showProfPicAndAttachments)
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
      }
    // console.log(messages)
    return <>
        {showProfPicAndAttachments ? null : <div className="flex flex-1 flex-col overflow-hidden space-y-2 p-2 max-h-full w-full h-app">
            {/* When the screen size is small, the button toggles on and off the profile and attachment sections normally on the right of laptop version.
            When the screen size is normal/big, the link is used instead of the button, and it should lead to the user's profile*/}
            <button onClick={screenSize < 2 ? toggleShowProfPicAndAttachments : null} className="border-none"> 
                <div className={`px-5 py-2 flex flex-row items-center bg-white ${screenSize >= 2 ? null : "hover:bg-gray-200"} rounded-lg shadow-lg`}>
                    {/* This is the left arrow that leads back to the message page for small devices */}
                    {screenSize < 3 ? <Link to={`/messages`} className="mr-5"> <i className="fas fa-arrow-left"></i></Link> : null}
                    {/* If there is a recipientId & the screen size is normal/big, links to profile page, if not (it is a group), so no need link. */}
                    {loading? "Loading...": recipientId && screenSize >= 2 ?
                        <Link to={`/profile/${recipientId}`} title="Visit Mentor Profile" className="flex flex-row items-center">
                            <Avatar src={roomPic} />
                            <div className="pl-5 mb-1 font-medium">
                                <h3>{roomName} {isMentor ? <i className="fas fa-user-check"></i> : null}</h3>
                            </div>
                        </Link> : <>
                            <Avatar src={roomPic} />
                            <div className="pl-5 mb-1 font-medium">
                                <h3>{roomName}</h3>
                            </div>
                        </>}
                    {screenSize >= 3 ? <Link to={`/messages`} className="ml-auto"><i className="far fa-times-circle text-red-500 text-2xl"></i></Link> : null}
                </div>
            </button>
            <div className="py-8 px-2 md:p-8 overflow-auto flex-1 flex flex-col w-full bg-white rounded-lg shadow-lg">
                <InView as="div" onChange={(inView, entry) => { if (inView && !loading) getMoreMessages() }} />
                {messageLoading && <div className="w-full grid place-items-center"><Loader /></div>}
                {roomDoesNotExistWarning && <div className="w-full h-full grid place-items-center text-center"><h1 className="text-red-600">ROOM DOES NOT EXIST, OR YOUR DON'T HAVE ACCESS</h1></div>}
                {messages.map(({ messageType, files, message, date, id, senderId, senderUsername }) => (
                    messageType === "file" ? <ChatMessage
                        key={id}
                        hasFiles
                        files={files}
                        username={senderUsername}
                        timestamp={date.toMillis()}
                        isCurrentUser={senderId === user?.uid}
                    /> : <ChatMessage
                        key={id}
                        message={filter.isProfane(message) ? filter.clean(message) : message}
                        username={senderUsername}
                        timestamp={date.toMillis()}
                        isCurrentUser={senderId === user?.uid} />
                ))}
                {fileSizeWarning ? <><ChatMessage 
                    message={"One or more of the files were too large."}
                    isCurrentUser={true}
                    isErrorMessage={true}
                /> 
                <ChatMessage 
                    message={"We have imposed a maximum file size of 5MB for files."}
                    isCurrentUser={true}
                    isErrorMessage={true}
                /></> : null}
                <div ref={messagesEndRef} />
            </div>
            <div className="flex min-h-16 items-center bg-white rounded-lg shadow-lg">
                <form className="flex flex-1 m-2 leading-4 resize-none space-x-1 items-center" onKeyPress={handleKeyPress}>
                    <div className="flex flex-1 flex-col items-center">
                        <input accept="*" multiple id="icon-button-file" type="file" hidden onChange={handleFileAdd} />
                        <label htmlFor="icon-button-file">
                            <IconButton className="w-min" component="span" size="large">
                                <AttachFile />
                            </IconButton>
                        </label>
                        {fileMessages.length > 0 ? <span className="text-sm text-gray-500">{fileMessages.length} files</span> : null}
                    </div>
                    <TextareaAutosize className="w-full h-full rounded-xl p-2 border-none outline-none resize-none overflow-hidden" value={input} placeholder="Write A Message" onChange={(e) => setInput(e.target.value)} maxRows="10" minRows="2"/>
                    <IconButton
                        className="w-12"
                        type="submit"
                        onClick={sendMessage}
                        disabled={sendLoading}
                        size="large">
                        {sendLoading ? <SendMessageLoader/> : <Send />}
                    </IconButton>
                </form>
            </div>
        </div >}
        {/* ProfCard & Attachment cards are down here. */}
        {/* This first section appears for screen sizes 2 and above */}
        <div className={`${screenSize < 2 ? "hidden" : ""} flex flex-col h-app`} style={screenSize < 3 ? {width: '275px'} : {width: '350px'}}>
            {/* THis is the profile card, if there is no recipientId, we show the group profile card instead */}
            {recipientId ? <LazyProfileCard uid={recipientId} roomExists={!roomDoesNotExistWarning}/> : 
            <GroupProfileCard roomExists={!roomDoesNotExistWarning} roomUsers={roomUsers}/>} 
            <LazyAttachmentsCard roomId={roomId} attachments={roomDoc?.attachments} roomExists={!roomDoesNotExistWarning}/>
        </div>
        {/* This second section is for screen sizes below 2 */}
        {showProfPicAndAttachments ? <div 
            className={`${screenSize >= 2 ? "hidden" : "h-app overflow-auto"}`} 
            /* Adjusted the minimum width for when screen size is 1 and 0. */
            style={screenSize === 1 ? {minWidth: 'calc(100vw - 260px)'}: {minWidth: 'calc(100vw)'}}
            >
            {/* Small left arrow button to exit for mobile mode */}
            <button onClick={toggleShowProfPicAndAttachments} className="bg-transparent border-none p-5 cursor-pointer"><i className="fas fa-arrow-left text-2xl"></i></button>
            {/* THis is the profile card, if there is no recipientId, we show the group profile card instead */}
            {recipientId ? <LazyProfileCard uid={recipientId} roomExists={!roomDoesNotExistWarning}/> : 
            <GroupProfileCard roomExists={!roomDoesNotExistWarning} roomUsers={roomUsers}/>} 
            <LazyAttachmentsCard roomId={roomId} attachments={roomDoc?.attachments} roomExists={!roomDoesNotExistWarning}/>
        </div> : null}
    </>;
}

export default Chat
