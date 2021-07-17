import React, { useState, useEffect } from 'react';
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import { Link, useRouteMatch } from 'react-router-dom';
import { db } from '../../config/firebase';

function SidebarChat({ id, roomName, isMentor, roomPic }) {

    const [messages, setMessages] = useState('');
    let { url } = useRouteMatch();

    //Fetches the latest message for display
    //TODO: new backend code has last messages in the room document, no need for excessive room read.
    useEffect(() => {
        if (id) {
            db.collection('rooms').doc(id).collection('messages').orderBy('date', 'desc').limit(1).onSnapshot(snap => {
                setMessages(snap.docs.map( doc => doc.data()))
            })
        }
    }, [id])

    return (
        <Link to={`${url}/${id}`}>
            <div className="sidebarChat">
                <Avatar src={roomPic}/> {/* Add src={*room_pic*} in the Avatar tag. Room pic defaults to the other user's prof pic if there are
                only 2 users, and  the group pic if it is a group chat. <-- Implement this to come from Sidebar and be passed down as a prop */}
                <div className="sidebarChat__info">
                    <h2>{roomName} {isMentor ? <i class="fas fa-user-check"></i> : null}</h2> 
                    <p>{messages[0] ? messages[0].message.substring(0,16) + "..." : "No Message History"}</p>
                </div>
            </div>
        </Link>
    )
}

export default SidebarChat
