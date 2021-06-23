import React, { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';

export default function NotificationShowcase() {

    const { user, userDetails } = useAuth();

    const [notifications, setNotifications] = useState();

    useEffect(() => {

        //If user id hasn't loaded yet, just return
        async function getNotifications() {
            if (user?.uid && userDetails?.chatNotifications) {
                setNotifications(userDetails.chatNotifications)
            }
        }

        getNotifications()

    }, [user?.uid, userDetails?.chatNotifications])

    return (
        <div className="notificationShowcase">
            {console.log(notifications)}
            {!notifications ? "No notifications" : "notification Showcase"}
        </div>
    )
}
