import React, { useState, useEffect, useRef } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, Send } from '@material-ui/icons';
import { useParams, Link } from 'react-router-dom';
import Filter from 'bad-words';
import { firebase, db, storage } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import badWordsList from '../../config/badWords.json';
import ChatMessage from './ChatMessage';
import Loader from '../Loader/Loader';
import { useOnScreen } from '../../hooks/useHooks';
import { getSnapshot } from '../../hooks/firestore';
import { InView } from 'react-intersection-observer';
import ProfileCard from './ProfileCard';
import AttachmentsCard from './AttachmentsCard';
import TextareaAutosize from 'react-textarea-autosize';

let messageArray = []
let listeners = []    // list of listeners
let start = null      // start position of listener
let end = null        // end position of listener

const DOCUMENTS_PER_PAGE = 15;

function Chat({screenSize}) {

    const { user, userDetails } = useAuth();

    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomDoc, setRoomDoc] = useState({});
    const [roomName, setRoomName] = useState(""); //Will have to reach out again and figure out what its room name is.
    const [roomPic, setRoomPic] = useState("");
    const [recipientId, setRecipientId] = useState();
    const [isMentor, setIsMentor] = useState();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadedAllMessages, setLoadedAllMessages] = useState(false);
    const [fileMessages, setFileMessages] = useState([]);
    const [newMessageFlag, setNewMessageFlag] = useState(false);
    const [showProfPicAndAttachments, setShowProfPicAndAttachments] = useState(false);
    const [doneInitialScroll, setDoneInitialScroll] = useState(false);

    const messagesEndRef = useRef(null);
    const filter = new Filter({ emptyList: true, list: badWordsList });

    //For if screen size updates
    useEffect(() => {
        if (screenSize >= 2){
            setShowProfPicAndAttachments(false)
        }
    }, [screenSize])

    //TO get the room name and messages
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

    useEffect(() => {
        if (roomId && user) {
            setLoading(true);
            //Get Room Name
            const unsub1 = db.collection('rooms').doc(roomId).onSnapshot(async (snapshot) => { //<-- Add an unsubscribe
                const snapData = snapshot.data()
                setRoomDoc(snapData)
                //If there is a name (it means it is a group chat)
                if (snapData?.name) {
                    setRoomName(snapData.name)
                    setRoomPic(snapData.picture || "")
                    //If there is no name (A direct message between two person chat)
                } else {
                    const { roomName, roomPic, isMentor, recipientId } = await findRoomNameAndRoomPicAndRecipientId(snapData);
                    setRoomName(roomName) //Implemented function (actually from Sidebar.js) to get the actual room name    
                    setRoomPic(roomPic)
                    setIsMentor(isMentor)
                    setRecipientId(recipientId)
                }
                setLoading(false);
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

    

    function handleUpdatedMessages(snapshot) {
        // append new messages to message array
        snapshot.forEach((message) => {
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
        console.log(messageArray)
        messageArray = messageArray.filter(({ date }) => date != null);
        //Sort array because it is unsorted, filter date as it might be null
        messageArray.sort(({ date: x }, { date: y }) => {
            return x.toDate() - y.toDate()
        })
        setMessages(messageArray)
        setLoading(false)
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

        console.log(start)
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
        console.log('getting more messages')
        let ref = db.collection('rooms').doc(roomId).collection('messages')
        setLoading(true)
        if (!start) {
            console.log('no more posts');
            setLoadedAllMessages(true);
            setLoading(false)
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
            console.log('no more posts');
            setLoadedAllMessages(true);
            setLoading(false)
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
        if (!user) return;

        //Check whether there are files and then send them. (Don't need to worry about below, if the user adds files and adds a message, it will send the files as one message then
        //the text message as the next message. If not, it just sends the files (or vice versa if there are no files))
        if (fileMessages.length > 0) {

            //TODO: Add a state here for fileSendLoading...

            //Record current Timestamp.
            const fileSendDate = new Date();

            //Go through the files here and upload them to storage, keep track of the id. The room should be messageFiles/roomId/
            const fileMessagesStorageDetails = await Promise.all(fileMessages.map(async (file, index) => {
                const storagePath = `roomFiles/${roomId}/${`${roomId}_${fileSendDate.toISOString()}`}_${index}`;
                const result = await storage.ref(storagePath).put(file);
                return { path: storagePath, ref: await result.ref.getDownloadURL() };
            }))

            const attachments = fileMessagesStorageDetails.map((storageDetail, index) => {

                let fileName = fileMessages[index].name;

                const isImage = (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(fileName);

                return {
                    filename: fileName,
                    fileType: isImage ? "image" : "others",
                    bucketPath: storageDetail.path,
                    uploadedOn: fileSendDate,
                    downloadUrl: storageDetail.ref,
                }
            })

            db.collection('rooms').doc(roomId).collection('messages').add({
                messageType: "file",
                files: attachments,
                date: firebase.firestore.FieldValue.serverTimestamp(),
                senderId: user.uid,
                senderUsername: userDetails.name,
                recipientIds: roomDoc.users.filter(mod => mod != user.uid)
            })

            setFileMessages([]); //Reset the files at the end
        }

        //Fixed bug (now requires text to send message)
        if (input !== "") {

            db.collection('rooms').doc(roomId).collection('messages').add({
                messageType: "text",
                message: input,
                date: firebase.firestore.FieldValue.serverTimestamp(),
                senderId: user.uid,
                senderUsername: userDetails.name,
                recipientIds: roomDoc.users.filter(mod => mod != user.uid)
            })

            setInput(""); /* Reset the input at the end */
        }
    }

    const findRoomNameAndRoomPicAndRecipientId = async (data) => {
        let recipientId = data?.users.filter((userId) => userId !== user?.uid)[0] //<-- Remove the destructuring

        const userData = (await db.doc(`users/${recipientId}`).get()).data()

        return {
            roomName: userData?.name, //<-- asynchrously fetch user id's
            roomPic: await storage.ref(`/profilepics/${recipientId}.png`)?.getDownloadURL(),
            isMentor: userData?.isMtr,
            recipientId: recipientId
        }

    }

    useEffect(() => {
        if(newMessageFlag) newMessageFlag.current?.scrollIntoView()
        setNewMessageFlag(false);
    },[newMessageFlag])

    const handleFileUpload = (e) => {
        let files = e.target.files;
        files = [...files]; //Turning FileList into an array

        //Too many files
        if (files.length > 3) {
            //TODO: Notify user that we only take the first 3 files, too many files.

            //Then cut the files array to only the first 3.
            files.splice(3);
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
        messagesEndRef.current?.scrollIntoView()
      }
    // console.log(messages)
    return (<>
        {showProfPicAndAttachments ? null : <div className="flex flex-1 flex-col overflow-hidden space-y-2 p-2 max-h-full w-full" style={{height: 'calc(100vh - 6rem)'}}>
            <button onClick={screenSize >= 2 ? null : toggleShowProfPicAndAttachments} className="border-none"> {/* This toggles on and off the prof pic and attachment sections */}
                <div className={`px-5 py-2 flex flex-row items-center bg-white ${screenSize >= 2 ? null : "hover:bg-gray-200"} rounded-lg shadow-lg`}>
                    {screenSize < 3 ? <Link to={`/app/messages`} className="mr-5"> <i className="fas fa-arrow-left"></i></Link> : null}
                    {recipientId ?
                        <Link to={`/app/profile/${recipientId}`} title="Visit Mentor Profile" className="flex flex-row items-center">
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
                    {screenSize >= 3 ? <Link to={`/app/messages`} className="ml-auto"><i className="far fa-times-circle text-red-500 text-2xl"></i></Link> : null}
                </div>
            </button>
            <div className="p-8 overflow-auto flex-1 flex flex-col w-full bg-white rounded-lg shadow-lg">
                <InView as="div" onChange={(inView, entry) => { if (inView && !loading) getMoreMessages() }} />
                {loading && <div className="w-full grid place-items-center"><Loader />,</div>}
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
                <div ref={messagesEndRef} />
            </div>
            <div className="flex min-h-16 items-center bg-white rounded-lg shadow-lg">
                <form className="flex flex-1 m-2 leading-4 resize-none space-x-1 items-center" onKeyPress={handleKeyPress}>
                    <input accept="*" multiple id="icon-button-file" type="file" hidden onChange={handleFileUpload} />
                    <label htmlFor="icon-button-file">
                        <IconButton className="w-min" component="span">
                            <AttachFile />
                        </IconButton>
                        {fileMessages.length === 1 ? "1 File Uploaded" : (fileMessages.length > 1 ? `${fileMessages.length} Files Uploaded` : null)}
                    </label>
                    <TextareaAutosize className="w-full h-full rounded-xl p-2 border-none outline-none resize-none overflow-hidden" value={input} placeholder="Write A Message" onChange={(e) => setInput(e.target.value)} maxRows="10" minRows="2"/>
                    <IconButton className="w-12" type="submit" onClick={sendMessage}>
                        <Send />
                    </IconButton>
                </form>
            </div>
        </div >}
        <div className={`${screenSize < 2 ? "hidden" : null}`} style={screenSize < 3 ? {width: '275px'} : {width: '350px'}}>
            <ProfileCard uid={recipientId}/>
            <AttachmentsCard roomId={roomId} attachments={roomDoc?.attachments}/>
        </div>
        {showProfPicAndAttachments ? <div className={`${screenSize >= 2 ? "hidden" : null}`} style={{minWidth: 'calc(100vw - 260px)'}}>
            <button onClick={toggleShowProfPicAndAttachments} className="bg-transparent border-none p-5 cursor-pointer"><i className="fas fa-arrow-left text-2xl"></i></button>
            <ProfileCard uid={recipientId}/>
            <AttachmentsCard roomId={roomId} attachments={roomDoc?.attachments}/>
        </div> : null}
    </>)
}

export default Chat
