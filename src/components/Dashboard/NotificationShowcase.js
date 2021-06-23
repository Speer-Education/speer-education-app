import React, { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';

export default function NotificationShowcase() {

    const { user } = useAuth();

    const [ notifications, setNotifications ] = useState([]);
    
    useEffect(() => {
        
        //If user id hasn't loaded yet, just return
        async function setNotifications() {
            if (user?.uid) {
                //get the latest messages.
                //First get the array of rooms the user has (if user has no rooms, return an empty array.)
                const userDoc = await db.doc(`users/${user.uid}`).get()
                const userData = userDoc.data();
                const rooms = userData?.rooms || [] ;

                //If user has no rooms, just return
                if(rooms?.length === 0) return
                
                //Use the room Id's to get the notifications. (Go to each room, and into the messages documents, and find 2 messages from the other user)
                //then come back to the main room, sort the messages from all the rooms and take the top 5 most recent to display.
            }
        }

        setNotifications()
        
    }, [user?.uid])

    return (
        <div className="notificationShowcase">
            {console.log(notifications)}
            { notifications?.length === 0 ? "No notifications" : "notification Showcase" }
        </div>
    )
}
