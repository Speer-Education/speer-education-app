import React from 'react';
import './ChatMessage.css';

function ChatMessage({ message, username, timestamp, isCurrentUser }) {
    return (
        <p className={`chat__message ${isCurrentUser && "chat__receiver"}`}>
            <span className="chat__name">{username}</span>
            <span className="chat__messageText">{message}</span>
            <span className="chat__timestamp">{timestamp}</span>  {/*Will have to maek the timstamp be adjusted to the user's timezone*/}
        </p>
    )
}

export default ChatMessage
