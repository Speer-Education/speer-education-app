import React, { useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, Send } from '@material-ui/icons';
import "./Chat.css";
import ChatMessage from './ChatMessage';

function Chat() {

    const [input, setInput] = useState("");

    const sendMessage = (e) => {
        e.preventDefault();
        console.log(input);
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar /> {/* src={*other user's prof pic or room picture*} */}
                <div className="chat__headerInfo">
                    <h3>Room Name</h3>
                    <p>Last seen at...</p>
                </div>
            </div>
            <div className="chat__body">
                <ChatMessage message={"cool!"} username={"Ee Hsin"} timestamp={"10:25pm"} isCurrentUser={true} />
                <ChatMessage message={"Not Cool!"} username={"Tzi Hwee"} timestamp={"10:25pm"} isCurrentUser={false} />
            </div>
            <div className="chat__footer">
                <form>
                    <IconButton>
                        <AttachFile /> {/*Eventually make it able to attach a file*/}
                    </IconButton>
                    <div className="chat__footerInput">
                        <input type="text" value={input} placeholder="Type a Message!" onChange={(e) => setInput(e.target.value)}/>
                        <IconButton type="submit" onClick={sendMessage}>
                            <Send />
                        </IconButton>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Chat
