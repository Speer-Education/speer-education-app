import React, { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import NotificationCard from './NotificationCard';

export default function OpenChats() {

    const { userDetails } = useAuth();

    const [chatrooms, setChatrooms] = useState();

    useEffect(() => {

        //If user id hasn't loaded yet, just return
        if (userDetails?.chatNotifications) {
            setChatrooms(userDetails.chatNotifications.reverse())
        }

    }, [userDetails?.chatNotifications])

    return (
        <div className="rounded-md bg-white m-2 p-2 max-w-sm w-72 shadow-md">
            {console.log(chatrooms)}
            {!chatrooms ? "No notifications" : <>
            <p>Open Chats</p>
            {chatrooms.map((message,index) => (
                <NotificationCard 
                    key={index}
                    message={message.message}
                    id={message.senderId}
                    name={message.senderUsername}
                    date={message.date}
                />
            ))}
            
            </>}
        </div>
    )
}
