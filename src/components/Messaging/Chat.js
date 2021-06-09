import React from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile } from '@material-ui/icons';
import "./Chat.css";

function Chat() {
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar/> {/* src={*other user's prof pic or room picture*} */}
                <div className="chat__headerInfo">
                    <h3>Room Name</h3>
                    <p>Last seen at...</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                <p className="chat__message">Hey Guys</p>
            </div>
            <div className="chat__footer">

            </div>
        </div>
    )
}

export default Chat
