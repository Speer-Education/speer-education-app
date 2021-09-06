import React, { useState, useEffect } from 'react';
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import { Link, useRouteMatch } from 'react-router-dom';
import { db } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import history from '../../hooks/history';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

function SidebarChat({ id, roomName, isMentor, roomPic, read }) {
    const { user } = useAuth();
    const [messages, setMessages] = useState('');
    let { url } = useRouteMatch();

    //Fetches the latest message for display
    useEffect(() => {
        if (id) {
            db.collection('rooms').doc(id).onSnapshot(doc => {
                setMessages(doc.data().lastMessage)
            })
        }
    }, [id])

    return (
        <Link to={`${url}/${id}`}>
            <div className={`flex items-center p-3 pr-5 ${(`${url}/${id}` === history.location.pathname)?'bg-gray-100':''}`}>
                <Avatar src={roomPic}/> {/* Add src={*room_pic*} in the Avatar tag. Room pic defaults to the other user's prof pic if there are
                only 2 users, and  the group pic if it is a group chat. <-- Implement this to come from Sidebar and be passed down as a prop */}
                <div className="sidebarChat__info">
                    <h2>{roomName} {isMentor ? <i className="fas fa-user-check"></i> : null}</h2> 
                    <p className="text-sm text-gray-600">{messages ? `${messages.senderId === user?.uid?"You: ":""}${messages.message}` : "No Message History"}</p>
                </div>
                {!read ? <FiberManualRecordIcon style={{color: "#F58B09"}}/> : null}
            </div>
        </Link>
    )
}

export default SidebarChat
