import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import ProfilePicture from '../User/ProfilePicture';
import { Link, useNavigate } from 'react-router-dom';
import ReactTimeago from 'react-timeago';
import { db } from '../../config/firebase';
import { Button } from '@mui/material';
import {ActiveRoom} from '../../types/User';


const ActiveChatRow = ({ photoUid, username, message, date, isUnread, roomId}) => (
    <Link to={`/messages/${roomId}`} key={roomId}>
        <div className="flex flex-row transition-colors hover:bg-gray-100 cursor-pointer rounded-xl px-3 py-1 ">
            <ProfilePicture uid={photoUid} thumb className="w-10 h-10 rounded-full" />
            <div className="flex-1 ml-2">
                <h3 className="font-semibold text-lg">{username}</h3>
                <div className="w-full flex flex-row text-gray-500 text-sm justify-between">
                    <p className="overflow-hidden overflow-ellipsis whitespace-nowrap flex-1 max-w-[20ch] pr-2">{message}</p>
                    {date && <ReactTimeago className="text-gray-400 " date={date.toMillis()} />}
                </div>
            </div>
        </div>
    </Link>
)

export default function OpenChats() {

    const { user, userDetails } = useAuth();
    
    const navigate = useNavigate();
    const [chatrooms, setChatrooms] = useState<ActiveRoom[]>();

    //Sorts the activeChats in the user document
    useEffect(() => {

        //If user id hasn't loaded yet, just return
        if (userDetails?.activeRooms) {
            const { activeRooms } = userDetails
            //Transform activeChats object into an array to better iterate through
            const rooms = Object.values(activeRooms).map((val, index) => {
                return {
                    id: Object.keys(activeRooms)[index],
                    ...val
                }
            })
            //Order Active chats by chronological order
            setChatrooms(rooms.sort(({ date: x }, { date: y }) => y.toMillis() - x.toMillis()))
        }
    }, [userDetails?.activeRooms])

    return (
        <div className="hidden lg:flex flex-col rounded-md bg-white m-2 w-300 min-w-500 shadow-md flex-1" style={{ 'maxHeight': '300px' }}>
            {!chatrooms ? <div className="h-full p-3 grid place-items-center">
                {/* TOOD: Add No Recent Chats Icon */}
                <div className="space-y-2 grid place-items-center">
                    <h2 className="text-gray-500">No Recent Chats</h2>
                    <Button variant="contained" color="primary" onClick={() => navigate('/mentors')}>Find a mentor</Button>
                </div>
            </div> : <>
                <p className="pt-3 pl-3">Recent Chats</p>
                <div className="overflow-hidden">
                    {chatrooms.map(({ senderUsername, senderId, recipientIds, message, roomId, date, roomName, read }) => {
                    
                    //For non group chats
                    if (recipientIds?.length === 1) {
                        return <ActiveChatRow 
                            key={roomId} 
                            photoUid={(senderId === user?.uid) ? recipientIds[0] : senderId} 
                            username={(senderId === user?.uid) ? (roomName[user?.uid] || "Unread Message"):senderUsername} 
                            message={`${senderId === user?.uid ? "You: ":"" }${message}`} 
                            date={date} 
                            isUnread={read?.[user!.uid]}
                            roomId={roomId} />
                    }
                    
                    //Means it is a group chat
                    if (recipientIds?.length > 1){
                        return <ActiveChatRow 
                            key={roomId} 
                            photoUid={roomId} 
                            username={roomName[user!.uid]} 
                            message={`${senderId === user?.uid ? "You: ":`${senderUsername}: ` }${message}`} 
                            date={date} 
                            isUnread={read?.[user!.uid]}
                            roomId={roomId} />
                    }
                })}
                </div>
            </>}
            <div className="mt-auto p-3"><Link to="/messages" className="text-blue-700 underline text-xs">See all Chats</Link></div>
        </div>
    )
}
