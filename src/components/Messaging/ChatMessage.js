import React from 'react';
import './ChatMessage.css';
import TimeAgo from 'react-timeago';
import { Link } from 'react-router-dom';

/**
 * Returns the chat message bubble for the user
 * @component
 * @param {params} param0 message, username, timestamp, isCurrentUser
 * @returns Component
 */
function ChatMessage({ hasFiles, files, message, username, timestamp, isCurrentUser }) {

    const URL_REGEX = /\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]/ig;

    const renderText = txt =>
        txt
        .split(" ")
        .map(part =>
        URL_REGEX.test(part) ? <a href={part} className="font-medium text-blue-800">{part} </a> : part + " "
        );

    if (hasFiles) {
        return (<div className="my-1">
            {!isCurrentUser && <span className="text-sm text-gray-500">{username}</span>}
            <p className={`p-2 rounded-lg w-max max-w-prose bg-gray-100 ${isCurrentUser && "bg-blue-200 ml-auto"}`}>
                <span className="chat__name">{username}</span>
                {files.map(file => {
                    return (
                        <a href={file.downloadUrl} target = "_blank" rel = "noopener noreferrer" key={`${file.downloadUrl} + ${file.filename}`}><span className="font-bold text-purple-600 block mb-1">{file.filename}</span></a>
                    )
                })}
                <span className="chat__timestamp"> <TimeAgo date={timestamp} /></span>
            </p>
        </div>)
    } else {

    return (<div className="my-1">
        {!isCurrentUser && <span className="text-sm text-gray-500">{username}</span>}
        <p className={`p-2 rounded-lg w-max max-w-prose bg-gray-100 ${isCurrentUser && "bg-blue-200 ml-auto"}`}>
            <span className="text-gray-800 break-words whitespace-pre-wrap">{renderText(message)}</span>
            <span className="chat__timestamp"> <TimeAgo date={timestamp} /></span>
        </p>
    </div>)
    }
}

export default ChatMessage
