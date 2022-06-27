import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { SearchOutlined } from '@mui/icons-material';
import SidebarChat from './SidebarChat';
import { db, storage } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import ProfilePicture from '../User/ProfilePicture';
import Spinner from '../Loader/Spinner';
import { Button, Collapse } from '@mui/material';
import { TransitionGroup } from "react-transition-group";
import { useLocation, useNavigate } from 'react-router-dom';
import { MessageRoomDocument } from '../../types/Messaging';
import CreateGroupChatModal from '../Modal/CreateGroupChatModal';

function Sidebar({screenSize}) {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, userDetails } = useAuth();

    const [rooms, setRooms] = useState<MessageRoomDocument[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true)
    const [createGroupChatModalOpen, setCreateGroupChatModalOpen] = useState(false);

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
                    } as Partial<MessageRoomDocument>
                } else {
                    const { isMentor, roomPic } = await findRoomPicAndIsMentor(docData);

                    return {
                        id: doc.id,
                        data: docData,
                        name: docData.roomName[user?.uid],
                        isMentor: isMentor,
                        pic: roomPic,
                    } as Partial<MessageRoomDocument>
                }
            })).then(res => {
                if(res.length > 0 && location.pathname === '/messages' && screenSize >= 1) {
                    navigate(`/messages/${res[0].id}`);
                }
                setLoading(false)
                setRooms(res as MessageRoomDocument[])
            })
            
        })

        return () => {
            unsubscribe();
        }
    }, [user?.uid])


    //resolve a room name for this
    const findRoomPicAndIsMentor = async (data) => {
        let recipientId = data.users.filter((id) => id !== user?.uid)[0]

        const userData = (await db.doc(`usersPublic/${recipientId}`).get()).data()

        return {
            roomPic: `https://storage.googleapis.com/speer-education-dev.appspot.com/users/${recipientId}/thumb-profilePicture.png`,
            isMentor: userData?.isMtr,
        }
        // return "ERROR: NO ROOM NAME FOUND"
    }

    return (
        <div className="flex flex-col flex-1 rounded-md bg-white m-2 shadow-lg" style={{maxHeight: `${screenSize >= 1 ? "calc(100vh - 20rem)" : "100%"}`}}>
            <div className="flex justify-between items-center px-4 py-3">
                <ProfilePicture uid={user!.uid} className="h-8 w-8 rounded-full"/>
                <h1 className="sidebar__headerUsername">{userDetails?.name}</h1>
            </div>
            <div className="sidebar__searchContainer">
                <div className="sidebar__search">
                    <SearchOutlined />
                    <input type="text" placeholder="Search by name" value={search} onChange={(e) => setSearch(e.target.value)}/>
                </div>
            </div>
            <div className="flex flex-col overflow-y-auto flex-1">
                <TransitionGroup>
                    {rooms.filter(room => room.name!.toLowerCase().includes(search.toLowerCase())).map(room => {
                        return <Collapse>
                        {/* @ts-ignore */}
                            <SidebarChat key={room?.id} id={room!.id} roomName={room.name!} isMentor={room!.isMentor} roomPic={room!.pic} read={(room.data!.lastMessage.read || {})[user!.uid] !== false}/>
                        </Collapse>
                    })}
                </TransitionGroup>
                {rooms.length === 0 && !loading && 
                <div className="h-full grid place-items-center">
                    <div className="space-y-3 grid place-items-center">
                        <h3 className="text-gray-500">No Contacts yet</h3>
                        <Button variant="contained" color="primary" onClick={() => navigate('/mentors')}>Find a mentor</Button>
                    </div>
                </div>}
                {loading&& <div className="grid place-items-center w-full h-14">
                    <div className="space-x-6">
                        <Spinner /> Loading Chats
                    </div>
                </div>}
                <Button variant="contained" onClick={()=> setCreateGroupChatModalOpen(true)}>Create Group Chat</Button>
                <CreateGroupChatModal open={createGroupChatModalOpen} setOpen={setCreateGroupChatModalOpen}/>
            </div>
        </div>
    )
}

export default Sidebar;
