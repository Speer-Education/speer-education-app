import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { Avatar } from "@material-ui/core";
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import { db, storage } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

function Sidebar() {

    const { user, userDetails } = useAuth();

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        //If user is blank
        if (!user) return

        const unsubscribe = db.collection('rooms').where('users','array-contains', user?.uid).onSnapshot(snap => {

            Promise.all(snap.docs.map(async doc => {

                const docData = doc.data();
                //Means it is a group chat
                if (docData.name) {
                    return {
                        id: doc.id,
                        data: docData,
                        name: docData.name, //Straight away can put name there if there is a name for the group (will be the case for when multiple people)
                        pic: docData.picture || ""
                    }
                } else {
                    const { roomName, roomPic } = await findRoomNameAndRoomPic(docData);
                    
                    return {
                        id: doc.id,
                        data: docData,
                        name: roomName,
                        pic: roomPic
                    }
                }
            })).then(res => setRooms(res))
        })

        return () => {
            unsubscribe();
        }
    }, [user?.uid])


    const findRoomNameAndRoomPic = async (data) => {
        let recipientId = data.users.filter((id) => id !== user?.uid)[0]
        return {
            roomName: (await db.doc(`users/${recipientId}`).get()).data()?.name,
            roomPic: await storage.ref(`/profilepics/${recipientId}.png`).getDownloadURL()
        }
        // return "ERROR: NO ROOM NAME FOUND"
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
                    return <SidebarChat key={room?.id} id={room?.id} roomName={room.name} roomPic={room.pic}/>
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
