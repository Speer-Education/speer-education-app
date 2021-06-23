import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function NotificationShowcase() {

    const [ notifications, setNotifications ] = useState([]);
    
    useEffect(() => {
        //get the latest messages.
        //First get the array of rooms the user has (if user has no rooms, return an empty array.)

        //
    }, [])

    return (
        <div className="notificationShowcase">
            {console.log(notifications)}
            { notifications?.length === 0 ? "No notifications" : "notification Showcase" }
        </div>
    )
}
