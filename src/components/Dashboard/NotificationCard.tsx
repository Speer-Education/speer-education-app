import React from 'react'
import TimeAgo from 'react-timeago';

export default function NotificationCard({message, id, name, date}) {
    return (
        <div className="rounded-xl shadow-lg p-4">
            <h3>{name}</h3>
            <p className="text-gray-800">{message}</p>
            {date && <p className="text-gray-700 text-md">Send <TimeAgo date={date.toDate().getTime()} /></p>}
        </div>
    )
}
