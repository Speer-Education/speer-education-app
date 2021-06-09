import React from 'react';
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";

function SidebarChat() {
    return (
        <div className="sidebarChat">
            <Avatar /> {/* Add src{*profile_pic_link*} in the Avatar tag */}
            <div className="sidebarChat__info">
                <h2>Person/Room Name</h2> {/* If the room is not a group chat, it has no name property and it will display
                the name of the other person in the chat (so just person name), but if it is a group chat, there will be a name
                property and we show the room name instead.*/}
                <p>Last Message...</p> {/* Just take the last message from the room database*/}
            </div>
        </div>
    )
}

export default SidebarChat
