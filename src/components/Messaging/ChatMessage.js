import React from 'react';
import './ChatMessage.css';
import TimeAgo from 'react-timeago';

/**
 * Returns the chat message bubble for the user
 * @component
 * @param {params} param0 message, username, timestamp, isCurrentUser
 * @returns Component
 */
function ChatMessage({ message, username, timestamp, isCurrentUser }) {
    return (
        <p className={`chat__message ${isCurrentUser && "chat__receiver"}`}>
            <span className="chat__name">{username}</span>
            <span className="chat__messageText">{message}</span>
            <span className="chat__timestamp"> <TimeAgo date={timestamp} /></span>
        </p>
    )
}

export default ChatMessage
