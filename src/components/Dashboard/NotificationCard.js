import React from 'react'
import TimeAgo from 'react-timeago';

export default function NotificationCard({message, id, name, date}) {
    return (
        <div className="notificationCard">
            <p>{message}</p>
            <p>{name}</p>
            <p>{id}</p>
            {date && <p><TimeAgo date={date.toDate().getTime()} /></p>}
        </div>
    )
}
