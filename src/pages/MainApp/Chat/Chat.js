import React from 'react';
import Sidebar from '../../../components/Chat/Sidebar';
import './Chat.css';

// Should eventually make this responsive, mobile version will not show the sidebar and messaging section 
//at the same time. When the person is clicked it shows the messaging section only, with an arrow to leave back to menu.
function Chat() {
    return (
        <div className="chat">
            <div className="chat__body">
                {/* Sidebar */}
                <Sidebar/>

                {/* Messaging Section */}
            </div>
        </div>
    )
}

export default Chat
