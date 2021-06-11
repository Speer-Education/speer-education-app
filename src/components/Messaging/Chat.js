import React, { useState, useEffect, useRef } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, Send } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
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
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const messagesEndRef = useRef(null);

    //TO get the room name and messages
    useEffect(() => {
        if (roomId) {

            setLoading(true);
            //Get Room Name
            const unsub1 = db.collection('rooms').doc(roomId).onSnapshot(async (snapshot) => { //<-- Add an unsubscribe
                const snapData = snapshot.data()
                //If there is a name (it means it is a group chat)
                if(snapData?.name){
                    setRoomName(snapData.name)
                    setRoomPic(snapData.picture || "") 
                //If there is no name (A direct message between two person chat)
                } else {
                    const { roomName, roomPic } = await findRoomNameAndRoomPic(snapData);
                    setRoomName(roomName) //Implemented function (actually from Sidebar.js) to get the actual room name    
                    setRoomPic(roomPic)                 
                }
                setLoading(false);
            })
           

            //Get Messages
            const unsub2 = db.collection('rooms').doc(roomId).collection('messages').orderBy('date','asc').onSnapshot(snapshot => (
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
        
    }, [roomId])

    useEffect(() => {
        scrollToBottom()
      }, [messages, loading]);
    

    const sendMessage = (e) => {
        e.preventDefault(); 

        //Fixed bug (now requires text to send message)
        if (input !== ""){
            db.collection('rooms').doc(roomId).collection('messages').add({
                message: input,
                date: firebase.firestore.FieldValue.serverTimestamp(),
                senderId: user?.uid, 
                senderUsername: userDetails.name 
            })
    
            setInput(""); /* Reset the input at the end */
        }
    }

    const findRoomNameAndRoomPic = async (data) => {
        let recipientId = data?.users.filter((userId) => userId !== user?.uid)[0] //<-- Remove the destructuring
        return {
            roomName:(await db.doc(`users/${recipientId}`).get()).data()?.name, //<-- asynchrously fetch user id's
            roomPic: await storage.ref(`/profilepics/${recipientId}.png`)?.getDownloadURL()
        }
        
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView()
      }

    return (
        <div className="chat">
            {loading ? <div className="chat__Loader"><Loader/></div>: 
             <>
            <div className="chat__header">
                <Avatar src={roomPic}/> 
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                </div>
            </div>
            <div className="chat__body">
                {messages.map(message => (
                    <ChatMessage 
                    key={message.id} 
                    message={message.data.message} 
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
                        <input type="text" value={input} placeholder="Type a Message!" onChange={(e) => setInput(e.target.value)}/>
                        <IconButton type="submit" onClick={sendMessage}>
                            <Send />
                        </IconButton>
                    </div>
                </form>
            </div> </>}
        </div>
    )
}

export default Chat
