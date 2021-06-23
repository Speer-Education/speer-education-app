import React, { useState, useEffect, useRef } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, Send } from '@material-ui/icons';
import { useParams, Link } from 'react-router-dom';
import Filter from 'bad-words';
import { firebase, db, storage } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import "./Chat.css";
import ChatMessage from './ChatMessage';
import Loader from '../Loader/Loader';

function Chat() {

    const { user, userDetails } = useAuth();

    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState(""); //Will have to reach out again and figure out what its room name is.
    const [roomPic, setRoomPic] = useState("");
    const [recipientId, setRecipientId] = useState();
    const [isMentor, setIsMentor] = useState();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const messagesEndRef = useRef(null);
    const filter = new Filter();

    //TO get the room name and messages
    useEffect(() => {
        if (roomId && user) {

            setLoading(true);
            //Get Room Name
            const unsub1 = db.collection('rooms').doc(roomId).onSnapshot(async (snapshot) => { //<-- Add an unsubscribe
                const snapData = snapshot.data()
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

            //Get Messages
            const unsub2 = db.collection('rooms').doc(roomId).collection('messages').orderBy('date', 'asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        data: doc.data()
                    }
                }))
            )
            )

            return () => {
                unsub1();
                unsub2();
            }
        }

    }, [roomId, user])

    useEffect(() => {
        scrollToBottom()

    }, [messages, loading]);


    const sendMessage = (e) => {
        e.preventDefault();

        //Fixed bug (now requires text to send message)
        if (input !== "") {

            db.collection('rooms').doc(roomId).collection('messages').add({
                message: input,
                date: firebase.firestore.FieldValue.serverTimestamp(),
                senderId: user?.uid,
                senderUsername: userDetails.name
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

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView()
    }

    return (
        <div className="chat">
            {loading ? <div className="chat__loader"><Loader /></div> :
                <>
                    <div className="chat__header">
                        {recipientId ?
                            <Link to={`/app/profile/${recipientId}`}>
                                <Avatar src={roomPic} />
                                <div className="chat__headerInfo">
                                    <h3>{roomName} {isMentor ? <i class="fas fa-user-check"></i> : null}</h3>
                                </div>
                            </Link> : <>
                                <Avatar src={roomPic} />
                                <div className="chat__headerInfo">
                                    <h3>{roomName}</h3>
                                </div>
                            </>}
                    </div>
                    <div className="chat__body">
                        {messages.map(message => (
                            <ChatMessage
                                key={message.id}
                                message={filter.clean(message.data.message)}
                                username={message.data.senderUsername}
                                timestamp={message.data.date?.toDate().toUTCString()}
                                isCurrentUser={message.data.senderId === user?.uid} />
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="chat__footer">
                        <form>
                            <IconButton>
                                <AttachFile />
                            </IconButton>
                            <div className="chat__footerInput">
                                {/* <input type="text" value={input} placeholder="Type a Message!" onChange={(e) => setInput(e.target.value)}/> */}
                                <textarea cols="2" rows="3" value={input} placeholder="Type a Message!" onChange={(e) => setInput(e.target.value)} />
                                <IconButton type="submit" onClick={sendMessage}>
                                    <Send />
                                </IconButton>
                            </div>
                        </form>
                    </div> </>}
        </div >
    )
}

export default Chat
