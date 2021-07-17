import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { Avatar } from "@material-ui/core";
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import { db, storage } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';

function Sidebar() {

    const { user, userDetails } = useAuth();

    const [rooms, setRooms] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        //If user is blank
        if (!user) return

        //Fetch rooms where the user is in them
        const unsubscribe = db.collection('rooms').where('users', 'array-contains', user?.uid).onSnapshot(snap => {

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
                    const { roomName, isMentor, roomPic } = await findRoomNameAndRoomPic(docData);

                    return {
                        id: doc.id,
                        data: docData,
                        name: roomName,
                        isMentor: isMentor,
                        pic: roomPic
                    }
                }
            })).then(res => {
                setLoading(false)
                setRooms(res)
            })
            
        })

        return () => {
            unsubscribe();
        }
    }, [user?.uid])


    //resolve a room name for this
    //TODO: should add the name to the room document instead of loading like this
    const findRoomNameAndRoomPic = async (data) => {
        let recipientId = data.users.filter((id) => id !== user?.uid)[0]

        const userData = (await db.doc(`users/${recipientId}`).get()).data()

        return {
            roomName: userData?.name, //<-- asynchrously fetch user id's
            roomPic: await storage.ref(`/profilepics/${recipientId}.png`)?.getDownloadURL(),
            isMentor: userData?.isMtr,
        }
        // return "ERROR: NO ROOM NAME FOUND"
    }

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={userDetails?.picture} />
                <h1 className="sidebar__headerUsername">{userDetails?.name}</h1>
            </div>
            <div className="sidebar__searchContainer">
                <div className="sidebar__search">
                    <SearchOutlined />
                    <input type="text" placeholder="Search by name" value={search} onChange={(e) => setSearch(e.target.value)}/>
                </div>
            </div>
            <div className="sidebar__chats">
                {rooms.filter(room => room.name.toLowerCase().includes(search.toLowerCase())).map(room => {
                    return <SidebarChat key={room?.id} id={room?.id} roomName={room.name} isMentor={room.isMentor} roomPic={room.pic} />
                })}
                {rooms.length === 0 && !loading? "You have no chat rooms yet!": null}
                {loading? <div className="sidebar__loader"><Loader /></div>: null}
            </div>
            <Link to="/app/mentors">
                <Button className="sidebar__mentorButton">
                    Connect with more mentors!
                </Button>
            </Link>
        </div>
    )
}

export default Sidebar;
