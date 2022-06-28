import React, { useState, useEffect, forwardRef } from 'react';
import "./SidebarChat.css";
import { Avatar } from "@mui/material";
import { Link, useLocation, useMatch, useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Message, MessageRoom } from '../../types/Messaging';
import { collection, doc, onSnapshot } from 'firebase/firestore';

const SidebarChat = forwardRef<HTMLDivElement, {
    id: string,
    roomName: string,
    isMentor?: boolean,
    roomPic: string,
    read: boolean,
}>(({ id, roomName, isMentor = false, roomPic, read }, ref) =>{
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message>();
    const location = useLocation();
    //Fetches the latest message for display
    useEffect(() => {
        if (id) {
            return onSnapshot(doc(db, 'rooms', id), doc => {
                const roomDoc = doc.data() as MessageRoom
                setMessages(roomDoc.lastMessage)
            })
        }
    }, [id])

    return (
        <Link to={`${id}`}>
            <div ref={ref} className={`flex items-center p-3 pr-5 ${(`/messages/${id}` === location.pathname)?'bg-gray-100':''} transition-colors hover:bg-gray-100`}>
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
})

export default SidebarChat
