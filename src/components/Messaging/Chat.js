import React, { useState, useEffect } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, Send } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import { db } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import firebase from 'firebase';
import "./Chat.css";
import ChatMessage from './ChatMessage';

function Chat() {

    const { user, userDetails } = useAuth();

    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState(""); //Will have to reach out again and figure out what its room name is.
    const [roomPic, setRoomPic] = useState("");
    const [messages, setMessages] = useState([]);

    //TO get the room name and messages
    useEffect(() => {
        if (roomId) {
            //Get Room Name
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
                const snapData = snapshot.data()
                //If there is a name (it means it is a group chat)
                if(snapData.name){
                    setRoomName(snapData.name)
                    /* setRoomPic(snapData.picture || "") <-- Sets the room picture*/
                //If there is no name (A direct message between two person chat)
                } else {
                    const { roomName, roomPic } = findRoomNameAndRoomPic(snapData);
                    setRoomName(roomName) //Implemented function (actually from Sidebar.js) to get the actual room name    
                    /* setRoomPic(roomPic)  <-- Sets the room picture*/                 
                }
            })

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

    const sendMessage = (e) => {
        e.preventDefault(); 

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            date: firebase.firestore.FieldValue.serverTimestamp(),
            senderId: user?.uid, 
            senderUsername: userDetails.name 
        })

        setInput(""); /* Reset the input at the end */
    }

    const findRoomNameAndRoomPic = (data) => {
        for (let i = 0; i < data.users.length; i++) {
            if (data.users[i].userId !== user?.uid) {

                //Find profile pic *here*

                return {
                    roomName: data.users[i].username,
                    // roomPic: Find profile pic 
                }
            }
        }
        return "ERROR: NO ROOM NAME FOUND"
    }

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
                    isCurrentUser={message.data.senderId === user?.uid} /> 
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
