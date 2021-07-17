import { IconButton } from '@material-ui/core';
import { MessageTwoTone } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import NotificationCard from './NotificationCard';
import ProfilePicture from '../User/ProfilePicture';
import { Link } from 'react-router-dom';

export default function OpenChats() {

    const { userDetails } = useAuth();

    const [chatrooms, setChatrooms] = useState();

    useEffect(() => {

        //If user id hasn't loaded yet, just return
        if (userDetails?.activeChats) {
            const { activeChats } = userDetails
            const rooms = Object.values(activeChats).map((val, index) => {
                return {
                    id: Object.keys(activeChats)[index],
                    ...val
                }
            })
            setChatrooms(rooms.sort(({date: x},{date: y}) => x.toMillis() - y.toMillis()))
        }

    }, [userDetails?.chatNotifications])

    return (
        <div className="rounded-md bg-white m-2 p-2 max-w-sm w-72 shadow-md">
            {console.log(chatrooms)}
            {!chatrooms ? "No notifications" : <>
            <p>Open Chats</p>
            {chatrooms.map(({senderUsername, senderId, message, roomId})=> (
                <div className="flex flex-row">
                    <ProfilePicture uid={senderId} className="w-10 h-10"/>
                    <div className="flex-1">
                        <p>{senderUsername}</p>
                        <p>{message}</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <Link to={`/app/messages/${roomId}`}>
                            <IconButton className="flex-1">
                                <MessageTwoTone/>
                            </IconButton>
                        </Link>
                    </div>
                </div>
            ))}
            
            </>}
        </div>
    )
}
