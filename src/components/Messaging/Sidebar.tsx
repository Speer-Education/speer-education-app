import { useState, useEffect } from 'react';
import './Sidebar.css';
import { AddCircle, GroupAddRounded, SearchOutlined } from '@mui/icons-material';
import SidebarChat from './SidebarChat';
import { db, docConverter } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import ProfilePicture from '../User/ProfilePicture';
import Spinner from '../Loader/Spinner';
import { Button, Collapse, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { TransitionGroup } from "react-transition-group";
import { useLocation, useNavigate } from 'react-router-dom';
import { MessageRoomDocument } from '../../types/Messaging';
import { collection, doc, getDoc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useDialog } from '../../hooks/useDialog';
import CreateGroupChatForm from '../Forms/CreateGroupChatForm';
import PersonAdd from '@mui/icons-material/PersonAdd';
import { useSpeerOrg } from '../../hooks/useSpeerOrg';
import { OrganizationMemberDocument } from '../../types/Organization';
import { useSnackbar } from 'notistack';

function Sidebar({screenSize}) {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, userDetails } = useAuth();
    const [openDialog, closeDialog] = useDialog();
    const { orgRef } = useSpeerOrg();

    const [rooms, setRooms] = useState<FixTypeLater[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true)
    const { enqueueSnackbar } = useSnackbar();

    type FixTypeLater = {
        id: string;
        data: MessageRoomDocument;
        name: string;
        pic: string;
        isMentor?: boolean;
    }

    useEffect(() => {
        //If user is blank
        if (!user) return

        //Fetch rooms where the user is in them
        const unsubscribe = onSnapshot(query(collection(db, 'rooms').withConverter(docConverter),where('users', 'array-contains', user?.uid), orderBy('lastMessage.date','desc')), snap => {

            Promise.all(snap.docs.map(async doc => {

                const docData = doc.data() as MessageRoomDocument;
                //Means it is a group chat
                if (docData.type == 'group') {
                    return {
                        id: doc.id,
                        data: docData,
                        name: docData.name, //Straight away can put name there if there is a name for the group (will be the case for when multiple people)
                        pic: docData.picture || "" //TODO: No picture property, will need to add this for group rooms.
                    } as FixTypeLater
                } else {

                    if (docData.users.length < 2) return {
                        id: doc.id,
                        data: docData,
                        name: "Deleted User",
                        isMentor: false,
                        pic: ""
                    } as FixTypeLater

                    const { isMentor, roomPic } = await findRoomPicAndIsMentor(docData);

                    return {
                        id: doc.id,
                        data: docData,
                        name: docData.roomName[user?.uid],
                        isMentor: isMentor,
                        pic: roomPic,
                    } as FixTypeLater
                }
            })).then(res => {
                if(res.length > 0 && location.pathname === '/messages' && screenSize >= 1) {
                    navigate(`/messages/${res[0].id}`);
                }
                setLoading(false)
                setRooms(res as FixTypeLater[])
            })
            .catch(err => {
                if(err instanceof Error) enqueueSnackbar(err.message, {variant: 'error'});
                else enqueueSnackbar('Something went wrong', {variant: 'error'});
            })
        })

        return () => {
            unsubscribe();
        }
    }, [user?.uid, screenSize])


    //resolve a room name for this
    const findRoomPicAndIsMentor = async (data) => {
        let recipientId = data.users.filter((id) => id !== user?.uid)[0] as string || undefined;

        if (!recipientId) return { 
            isMentor: false, 
            roomPic: "" 
        }

        const userData = (await getDoc(doc(orgRef, 'members', recipientId))).data() as OrganizationMemberDocument

        return {
            roomPic: `https://storage.googleapis.com/speer-education-dev.appspot.com/users/${recipientId}/thumb-profilePicture.png`,
            isMentor: !!userData?.isMentor,
        }
        // return "ERROR: NO ROOM NAME FOUND"
    }

    const showCreateGroup = async () => {
        openDialog({
            children: <CreateGroupChatForm onClose={closeDialog}/>
        })
    }

    const showNewPeople = () => {
        openDialog({
            children: <>
                <DialogTitle>New Chat</DialogTitle>
                <DialogContent>
                    <div className='flex flex-col space-y-2'>
                        <p>What would you like to do?</p>
                        <Button variant="outlined" onClick={() => {
                            navigate('/people')
                            closeDialog()
                        }} startIcon={<PersonAdd/>}>Find New People</Button>
                        <Button variant="outlined" onClick={() => {
                            showCreateGroup()
                        }} startIcon={<GroupAddRounded/>}>Create a group</Button>
                    </div>
                </DialogContent>
            </>
        })
    }

    return (
        <div className="flex flex-col flex-1 rounded-md md:bg-white m-2 md:shadow-lg" style={{maxHeight: `${screenSize >= 1 ? "calc(100vh - 20rem)" : "100%"}`}}>
            <div className="sidebar__searchContainer">
                <div className="sidebar__search">
                    <SearchOutlined />
                    <input type="text" placeholder="Search by name" value={search} onChange={(e) => setSearch(e.target.value)}/>
                    <IconButton onClick={showNewPeople}>
                        <AddCircle />
                    </IconButton>
                </div>
            </div>
            <div className="flex flex-col overflow-y-auto flex-1 relative px-1 mt-2 md:mt-0">
                <TransitionGroup className="space-y-1 md:space-y-0">
                    {rooms.filter(room => room.name!.toLowerCase().includes(search.toLowerCase())).map(room => {
                        return <Collapse key={room!.id}>
                        {/* @ts-ignore */}
                            <SidebarChat id={room!.id} roomName={room.name!} isMentor={room!.isMentor} roomPic={room!.pic} read={(room.data!.lastMessage.read || {})[user!.uid] !== false}/>
                        </Collapse>
                    })}
                </TransitionGroup>
                {rooms.length === 0 && !loading && 
                <div className="h-full grid place-items-center">
                    <div className="space-y-3 grid place-items-center">
                        <h3 className="text-gray-500">No Contacts yet</h3>
                        <Button variant="contained" color="primary" onClick={() => navigate('/people')}>Find a mentor</Button>
                    </div>
                </div>}
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
