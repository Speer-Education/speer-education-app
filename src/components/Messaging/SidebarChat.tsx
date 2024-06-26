import { useState, useEffect, forwardRef } from 'react';
import "./SidebarChat.css";
import { Avatar, Tooltip } from "@mui/material";
import { Link, useLocation } from 'react-router-dom';
import { db, publicUserCollection } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Message, MessageRoom } from '../../types/Messaging';
import { doc, onSnapshot } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useMediaQuery } from 'react-responsive';
import { ArrowRight } from '@mui/icons-material';
import {useSnackbar} from 'notistack';

const SidebarChat = forwardRef<HTMLDivElement, {
    id: string,
    roomName: string,
    isMentor?: boolean,
    roomPic: string,
    read: boolean,
}>(({ id, roomName, isMentor = false, roomPic, read }, ref) =>{
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message>();
    const [senderInfo, loadSenderInfo, error] = useDocumentData((messages?.senderId &&  messages.senderId !== user?.uid)? doc(publicUserCollection, messages.senderId): null);
    const location = useLocation();
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const { enqueueSnackbar } = useSnackbar();
    
    useEffect(() => {
        if (error) enqueueSnackbar(error.message, { variant: 'error' });
    }, [error, enqueueSnackbar]); 
    
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
            <div ref={ref} className={`flex items-center p-2 md:p-3 pr-5 bg-white rounded-lg shadow-sm md:shadow-none ${(`/messages/${id}` === location.pathname)?'bg-gray-100':''} transition-colors hover:bg-gray-100`}>
                <Avatar src={roomPic}/> {/* Add src={*room_pic*} in the Avatar tag. Room pic defaults to the other user's prof pic if there are
                only 2 users, and  the group pic if it is a group chat. <-- Implement this to come from Sidebar and be passed down as a prop */}
                <div className="sidebarChat__info">
                    <h2>{roomName} {isMentor ? <Tooltip title="This is a verified mentor" placement="top"><span>🎓</span></Tooltip> : null}</h2> 
                    <p className="text-sm text-gray-600">{messages ? `${messages.senderId === user?.uid?"You: ":(`${senderInfo?.name}: ` || "...")}${messages.message}` : "No Message History"}</p>
                </div>
                {isMobile && <ArrowRight/>}
                {!read ? <FiberManualRecordIcon style={{color: "#F58B09"}}/> : null}
            </div>
        </Link>
    )
})

export default SidebarChat
