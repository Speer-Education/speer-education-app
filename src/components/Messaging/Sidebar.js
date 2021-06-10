import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { Avatar } from "@material-ui/core";
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import { db } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

function Sidebar() {

    const { user, userDetails } = useAuth();

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot(snap => {

            setRooms(snap.docs.filter(doc => isUsersRoom(doc.data())).map(doc => {

                const docData = doc.data();
                //Means it is a group chat
                if (docData.name) {
                    return {
                        id: doc.id,
                        data: docData,
                        name: docData.name, //Straight away can put name there if there is a name for the group (will be the case for when multiple people)
                        //pic: docData.picture || ""
                    }
                } else {
                    const { roomName, roomPic } = findRoomNameAndRoomPic(docData);

                    return {
                        id: doc.id,
                        data: docData,
                        name: roomName,
                        //pic: roomPic
                    }
                }
            }))
        })

        return () => {
            unsubscribe();
        }
    }, [user?.uid])

    const isUsersRoom = (data) => {
        for (let i = 0; i < data.users.length; i++) {
            if (data.users[i].userId === user?.uid) {
                console.log("successful!")
                return true
            }
        }
        return false
    }

    const findRoomNameAndRoomPic = (data) => {
        for (let i = 0; i < data.users.length; i++) {
            if (data.users[i].userId !== user?.uid) {

                //Find room picture

                return {
                    roomName: data.users[i].username,
                    //roomPic: Find prof pic and put it here
                }
            }
        }
        return "ERROR: NO ROOM NAME FOUND"
    }

    return (
        <div className="sidebar">
            {console.log(user?.uid)}
            {console.log(userDetails)}
            <div className="sidebar__header">
                <Avatar src={userDetails?.picture} />
                <h1 className="sidebar__headerUsername">{userDetails?.name}</h1>
            </div>
            <div className="sidebar__searchContainer">
                <div className="sidebar__search">
                    <SearchOutlined />
                    <input type="text" placeholder="Search by name" />
                </div>
            </div>
            <div className="sidebar__chats">
                {rooms.map(room => {
                    return <SidebarChat key={room?.id} id={room?.id} roomName={room.name} />
                })}
            </div>
            <Link to="/main-app/mentors">
                <Button className="sidebar__mentorButton">
                    Connect with more mentors!
                </Button>
            </Link>
        </div>
    )
}

export default Sidebar;
