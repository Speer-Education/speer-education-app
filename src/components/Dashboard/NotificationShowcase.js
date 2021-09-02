import React, { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import NotificationCard from './NotificationCard';

export default function NotificationShowcase() {

    const { userDetails } = useAuth();

    const [notifications, setNotifications] = useState();

    useEffect(() => {

        //If user id hasn't loaded yet, just return
        if (userDetails?.chatNotifications) {
            setNotifications(userDetails.chatNotifications.reverse())
        }

    }, [userDetails?.chatNotifications])

    return (
        <div className="notificationShowcase">
            {!notifications ? "No notifications" : <>
            <h2>Recent Messages</h2>
            {notifications.map((message,index) => (
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
