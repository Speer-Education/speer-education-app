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
import ProfilePicture from '../User/ProfilePicture';
import Spinner from '../Loader/Spinner';
import history from '../../hooks/history';
function Sidebar({screenSize}) {

    const { user, userDetails } = useAuth();

    const [rooms, setRooms] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        //If user is blank
        if (!user) return

        //Fetch rooms where the user is in them
        const unsubscribe = db.collection('rooms').where('users', 'array-contains', user?.uid).orderBy('lastMessage.date','desc').onSnapshot(snap => {

            Promise.all(snap.docs.map(async doc => {

                const docData = doc.data();
                //Means it is a group chat
                if (docData.users.length > 2) {
                    return {
                        id: doc.id,
                        data: docData,
                        name: docData.roomName[user?.uid], //Straight away can put name there if there is a name for the group (will be the case for when multiple people)
                        pic: docData.picture || "" //TODO: No picture property, will need to add this for group rooms.
                    }
                } else {
                    const { isMentor, roomPic } = await findRoomPicAndIsMentor(docData);

                    return {
                        id: doc.id,
                        data: docData,
                        name: docData.roomName[user?.uid],
                        isMentor: isMentor,
                        pic: roomPic,
                    }
                }
            })).then(res => {
                if(res.length > 0 && history.location.pathname === '/app/messages') {
                    history.push(`/app/messages/${res[0].id}`);
                }
                setLoading(false)
                setRooms(res)
            })
            
        })

        return () => {
            unsubscribe();
        }
    }, [user?.uid])


    //resolve a room name for this
    const findRoomPicAndIsMentor = async (data) => {
        let recipientId = data.users.filter((id) => id !== user?.uid)[0]

        const userData = (await db.doc(`users/${recipientId}`).get()).data()

        return {
            roomPic: await storage.ref(`/profilepics/thumb-${recipientId}.png`)?.getDownloadURL(),
            isMentor: userData?.isMtr,
        }
        // return "ERROR: NO ROOM NAME FOUND"
    }

    return (
        <div className="flex flex-col flex-1 rounded-md bg-white m-2 shadow-lg" style={{maxHeight: `${screenSize >= 1 ? "calc(100vh - 20rem)" : "100%"}`}}>
            <div className="flex justify-between items-center px-4 py-3">
                <ProfilePicture uid={user?.uid} className="h-8 w-8 rounded-full"/>
                <h1 className="sidebar__headerUsername">{userDetails?.name}</h1>
            </div>
            <div className="sidebar__searchContainer">
                <div className="sidebar__search">
                    <SearchOutlined />
                    <input type="text" placeholder="Search by name" value={search} onChange={(e) => setSearch(e.target.value)}/>
                </div>
            </div>
            <div className="flex flex-col overflow-y-auto">
                {rooms.filter(room => room.name.toLowerCase().includes(search.toLowerCase())).map(room => {
                    console.log(room.name, room.data.lastMessage)
                    return <SidebarChat key={room?.id} id={room?.id} roomName={room.name} isMentor={room.isMentor} roomPic={room.pic} read={(room.data.lastMessage.read || {})[user?.uid] !== false}/>
                })}
                {rooms.length === 0 && !loading && <h3 className="text-gray-500">You have no chat rooms yet!</h3>}
                {loading&& <div className="grid place-items-center w-full h-14">
                    <div className="space-x-6">
                        <Spinner /> Loading Chats
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Sidebar;
