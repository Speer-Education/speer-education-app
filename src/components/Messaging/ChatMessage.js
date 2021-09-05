import React from 'react';
import './ChatMessage.css';
import TimeAgo from 'react-timeago';
import { Link } from 'react-router-dom';
import AttachmentItem from './AttachmentItem';
import { FolderOpenOutlined } from '@material-ui/icons';

/**
 * Returns the chat message bubble for the user
 * @component
 * @param {params} param0 message, username, timestamp, isCurrentUser
 * @returns Component
 */
function ChatMessage({ hasFiles, files, message, username, timestamp, isCurrentUser, isErrorMessage }) {

    const URL_REGEX = /\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]/ig;

    const renderText = txt =>
        txt
        .split(" ")
        .map(part =>
        URL_REGEX.test(part) ? <a href={part} className="font-medium text-blue-800 break-all">{part} </a> : part + " "
        );

    if (hasFiles) {
        return (<div className="my-1">
            {!isCurrentUser && <span className="text-sm text-gray-500">{username}</span>}
            <p className={`p-2 rounded-lg bg-gray-100 ${isCurrentUser && "bg-blue-200 ml-auto"}`} style={{width: "fit-content", maxWidth: "32ch"}}>
                <span className="chat__name">{username}</span>
                {files.map(({downloadUrl, filename},index) => {
                    return (
                        <AttachmentItem 
                            hoverClass={isCurrentUser&&"hover:bg-blue-300 hover:bg-opacity-50"}
                            IconComponent={FolderOpenOutlined}
                            title={filename}
                            key={index}
                            onClick={() => window.open(downloadUrl, "_blank")}
                        />
                    )
                })}
                <span className="chat__timestamp"> <TimeAgo date={timestamp} /></span>
            </p>
        </div>)
    } else {

    return (<div className="my-1">
        {!isCurrentUser && <span className="text-sm text-gray-500">{username}</span>}
        <p className={`p-2 rounded-lg max-w-prose bg-gray-100 ${isCurrentUser && "bg-blue-200 ml-auto"}`} style={{width: "fit-content"}}>
            <span className={`${isErrorMessage ? "text-red-600": "text-gray-800"} break-words whitespace-pre-wrap`}>{renderText(message)}</span>
            <span className="chat__timestamp"> <TimeAgo date={timestamp} /></span>
        </p>
    </div>)
    }
}

export default ChatMessage
