import React, { useState, useEffect } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, Send } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import { db } from '../../config/firebase';
import firebase from 'firebase';
import "./Chat.css";
import ChatMessage from './ChatMessage';

function Chat() {

    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState(""); //Will have to reach out again and figure out what its room name is.
    const [messages, setMessages] = useState([]);

    const sendMessage = (e) => {
        e.preventDefault(); 

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            date: firebase.firestore.FieldValue.serverTimestamp(),
            senderId: "h67gh6", //<-- Hard Coded for now
            senderUsername: "Dan Jones" //<-- Hard Coded for now
        })

        setInput(""); /* Reset the input at the end */
    }

    //TO get the room name and messages
    useEffect(() => {
        if (roomId) {
            //Get Room Name
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().users[1].username) //Use logic to get the actual room name 
            ))

            //Get Messages
            db.collection('rooms').doc(roomId).collection('messages').orderBy('date','asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => {
                    return {
                        id: doc.id, 
                        data: doc.data()
                    }
                }))
                )
            )
        }
        
    }, [roomId])

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar /> {/* src={*other user's prof pic or room picture*} */}
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
                    isCurrentUser={message.data.senderId === "h67gh6"} /> //<-- Hard coded for now
                ))}
            </div>
            <div className="chat__footer">
                <form>
                    <IconButton>
                        <AttachFile /> {/*Eventually make it able to attach a file*/}
                    </IconButton>
                    <div className="chat__footerInput">
                        <input type="text" value={input} placeholder="Type a Message!" onChange={(e) => setInput(e.target.value)}/>
                        <IconButton type="submit" onClick={sendMessage}>
                            <Send />
                        </IconButton>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Chat
