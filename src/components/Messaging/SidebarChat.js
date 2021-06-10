import React, { useState, useEffect } from 'react';
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import { Link, useRouteMatch } from 'react-router-dom';
import { db } from '../../config/firebase';

function SidebarChat({ id, roomName }) {

    const [messages, setMessages] = useState('');
    let { url } = useRouteMatch();

    useEffect(() => {
        if (id) {
            db.collection('rooms').doc(id).collection('messages').orderBy('date', 'desc').onSnapshot(snap => {
                setMessages(snap.docs.map( doc => doc.data()))
            })
        }
    }, [id])

    return (
        <Link to={`${url}/${id}`}>
            <div className="sidebarChat">
                <Avatar /> {/* Add src={*room_pic*} in the Avatar tag <-- Room pic defaults to the other user's prof pic if there are
                only 2 users, and  the group pic if it is a group chat. <-- Implement this to come from Sidebar and be passed down as a prop <-- Do that when you get
                another user*/}
                <div className="sidebarChat__info">
                    <h2>{roomName}</h2> 
                    <p>{messages[0] ? messages[0].message.substring(0,16) + "..." : "No Message History"}</p>
                </div>
            </div>
        </Link>
    )
}

export default SidebarChat
