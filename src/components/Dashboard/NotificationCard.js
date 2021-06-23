import React from 'react'

export default function NotificationCard({message, id, name, date}) {
    return (
        <div className="notificationCard">
            <p>{message}</p>
            <p>{name}</p>
            <p>{id}</p>
            <p>{date.toDate().toUTCString()}</p>
        </div>
    )
}
