import { IconButton } from '@material-ui/core';
import { MessageTwoTone } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import NotificationCard from './NotificationCard';
import ProfilePicture from '../User/ProfilePicture';
import { Link } from 'react-router-dom';

export default function OpenChats() {

    const { userDetails } = useAuth();

    const [chatrooms, setChatrooms] = useState();

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
            setChatrooms(rooms.sort(({ date: x }, { date: y }) => x.toMillis() - y.toMillis()))
        }
    }, [userDetails?.activeRooms])

    return (
        <div className="flex flex-col rounded-md bg-white m-2 w-300 min-w-500 shadow-md flex-1 " style={{ 'height': '300px' }}>
            {!chatrooms ? <div className="h-full p-3 grid place-items-center">
                {/* TOOD: Add No Recent Chats Icon */}
                <h2 className="text-gray-500">No Recent Chats</h2>
            </div> : <>
                <p className="p-3">Recent Chats</p>
                <div className="overflow-hidden">
                    {chatrooms.map(({ senderUsername, senderId, message, roomId }) => (<Link to={`/app/messages/${roomId}`}>
                        <div className="flex flex-row hover:bg-gray-100 cursor-pointer rounded-xl px-3 py-1 ">
                            <ProfilePicture uid={senderId} className="w-10 h-10 rounded-full" />
                            <div className="flex-1 ml-2 max-w-full">
                                <h3 className="font-medium">{senderUsername}</h3>
                                <p className="overflow-hidden overflow-ellipsis whitespace-nowrap w-10/12 text-gray-500">{message}</p>
                            </div>
                        </div>
                    </Link>
                    ))}
                </div>
            </>}
            <div className="mt-auto p-3"><Link to="/app/messages" className="text-blue-700 underline text-xs">See all Chats</Link></div>
        </div>
    )
}
