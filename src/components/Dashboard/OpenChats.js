import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import ProfilePicture from '../User/ProfilePicture';
import { Link } from 'react-router-dom';
import ReactTimeago from 'react-timeago';
import { db } from '../../config/firebase';

export default function OpenChats() {

    const { user, userDetails } = useAuth();

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
            setChatrooms(rooms.sort(({ date: x }, { date: y }) => y.toMillis() - x.toMillis()))
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
                    {chatrooms.map(({ senderUsername, senderId, recipientIds, message, roomId, date, roomName }) => {
                    
                    console.log("recipient Ids:", recipientIds);
                    //For non group chats
                    if (recipientIds?.length === 1) {
                        
                        //means you are the sender and only 2 people in chat room, we can use the recipient's id for the profile picture
                        if (senderId === user?.uid){

                            return <Link to={`/app/messages/${roomId}`} key={roomId}>
                                <div className="flex flex-row hover:bg-gray-100 cursor-pointer rounded-xl px-3 py-1 ">
                                    <ProfilePicture uid={recipientIds[0]} thumb className="w-10 h-10 rounded-full" />
                                    <div className="flex-1 ml-2 max-w-full">
                                        <h3 className="font-medium">{roomName[user?.uid] || "Feature in progress..."}</h3>
                                        <div className="w-full flex flex-row text-gray-500 text-sm">
                                            <p className="overflow-hidden overflow-ellipsis whitespace-nowrap flex-1">{senderId === user?.uid?"You: ":""}{message}</p>
                                            {date && <ReactTimeago className="text-gray-400" date={date.toMillis()} />}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        //Means other person is sender
                        } else {

                            return <Link to={`/app/messages/${roomId}`} key={roomId}>
                                <div className="flex flex-row hover:bg-gray-100 cursor-pointer rounded-xl px-3 py-1 ">
                                    <ProfilePicture uid={senderId} thumb className="w-10 h-10 rounded-full" />
                                    <div className="flex-1 ml-2 max-w-full">
                                        <h3 className="font-medium">{senderUsername}</h3>
                                        <div className="w-full flex flex-row text-gray-500 text-sm">
                                            <p className="overflow-hidden overflow-ellipsis whitespace-nowrap flex-1">{senderId === user?.uid?"You: ":""}{message}</p>
                                            {date && <ReactTimeago className="text-gray-400" date={date.toMillis()} />}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        }
                    }
                    
                    //Means it is a group chat
                    if (recipientIds?.length > 1){
                        return <Link to={`/app/messages/${roomId}`} key={roomId}>
                            <div className="flex flex-row hover:bg-gray-100 cursor-pointer rounded-xl px-3 py-1 ">
                                <ProfilePicture uid={roomId} isRoom thumb className="w-10 h-10 rounded-full" />
                                <div className="flex-1 ml-2 max-w-full">
                                    {/* TODO: This should switch to roomName */}
                                    <h3 className="font-medium">{roomName[user?.uid]}</h3>
                                    <div className="w-full flex flex-row text-gray-500 text-sm">
                                        {/* TODO: This should switch to the sender's username instead of just "You" */}
                                        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap flex-1">{senderId === user?.uid?"You: ":`${senderUsername}:`}{message}</p>
                                        {date && <ReactTimeago className="text-gray-400" date={date.toMillis()} />}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    } else {
                        return <></>
                    }
                })}
                </div>
            </>}
            <div className="mt-auto p-3"><Link to="/app/messages" className="text-blue-700 underline text-xs">See all Chats</Link></div>
        </div>
    )
}
