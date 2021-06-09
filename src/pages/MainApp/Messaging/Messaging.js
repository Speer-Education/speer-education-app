import React from 'react';
import Sidebar from '../../../components/Messaging/Sidebar';
import Chat from '../../../components/Messaging/Chat';
import './Messaging.css';

// Should eventually make this responsive, mobile version will not show the sidebar and messaging section 
//at the same time. When the person is clicked it shows the messaging section only, with an arrow to leave back to menu.
function Messaging() {
    return (
        <div className="messaging">
            <div className="messaging__body">
                {/* Sidebar Section then the Chat Section*/}
                <Sidebar/>
                <Chat/>
            </div>
        </div>
    )
}

export default Messaging
