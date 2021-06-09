import React from 'react';
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";

function SidebarChat() {
    return (
        <div className="sidebarChat">
            <Avatar /> {/* Add src={*room_pic*} in the Avatar tag <-- Room pic defaults to the other user's prof pic if there are
            only 2 users, and  the group pic if it is a group chat.*/}
            <div className="sidebarChat__info">
                <h2>Person/Room Name</h2> {/* If the room has only 2 people, it will display
                the name of the other person in the chat (so just person name), but if it is a group chat (more than 2 people), 
                there will be a name property and we show the room name instead.*/}
                <p>Last Message...</p> {/* Just take the last message from the room database, but shorten it to like 20 characters and add an ...*/}
            </div>
        </div>
    )
}

export default SidebarChat
