import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from '@material-ui/icons/Chat';
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import { db } from '../../config/firebase';

function Sidebar() {

    const [rooms, setRooms] = useState([]);
    
    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot( snap => {
            setRooms(snap.docs.map(doc => {

                // If user id is found in doc.data().user-ids, then return the document (Implement this later), and also if there is a name, can straight away
                //set it in the returned obect, if not, find the username of the other user in the room, and set that as the name.
                return {
                    id: doc.id,
                    data: doc.data(),
                }
            })
            )
        })

        return () => {
            unsubscribe();
        }
    }, []) 

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                {/* Pass picture of user as prop into this avatar in the future */}
                <Avatar />
                <IconButton>
                    <ChatIcon/>
                </IconButton>
            </div>
            <div className="sidebar__searchContainer">
                <div className="sidebar__search">
                    <SearchOutlined/>
                    <input type="text" placeholder="Search by name"/>
                </div>
            </div>
            <div className="sidebar__chats">
                {rooms.map(room => {
                    // Pass in the correct room name
                    return <SidebarChat key={room.id} id={room.id} roomName={room.data.users[1].username}/>
                })}
            </div>
        </div>
    )
}

export default Sidebar;
