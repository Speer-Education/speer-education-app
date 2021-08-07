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

    if (hasFiles) {
        return (
            <p className={`my-2 p-2 rounded-lg w-max max-w-prose bg-gray-100 ${isCurrentUser && "bg-blue-200 ml-auto"}`}>
                <span className="chat__name">{username}</span>
                {files.map(file => {
                    return (
                        <a href={file.downloadUrl} target = "_blank" rel = "noopener noreferrer" key={`${file.downloadUrl} + ${file.filename}`}><span className="font-bold text-purple-600 block mb-1">{file.filename}</span></a>
                    )
                })}
                <span className="chat__timestamp"> <TimeAgo date={timestamp} /></span>
            </p>
        )
    } else {

    return (
        <p className={`my-2 p-2 rounded-lg w-max max-w-prose bg-gray-100 ${isCurrentUser && "bg-blue-200 ml-auto"}`}>
            <span className="chat__name">{username}</span>
            <span className="chat__messageText">{message}</span>
            <span className="chat__timestamp"> <TimeAgo date={timestamp} /></span>
        </p>
    )
    }
}

export default ChatMessage
