import React, { useMemo } from 'react';
import { useAuth } from '../../hooks/useAuth';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import './MentorShowcase.css';
import { Link } from 'react-router-dom';

export default function StatsCard() {

    const { userDetails } = useAuth();
    const rooms = useMemo(() => {
        return Object.keys(userDetails?.activeRooms || {}).length;
    },[userDetails?.activeRooms])
    return (
        <div className="flex flex-col p-3 shadow-lg rounded-md bg-white pr-[5px]">
            <div className="flex flex-row justify-between pb-1">
                <p>Your Stats</p>
                <HelpOutlineIcon style={{ fontSize: 18 }}/>
            </div>
            <div className="flex flex-row w-full divide-x divide-y-0 divide-gray-400 divide-solid py-4 border-t border-0 border-gray-400 border-solid">
                <div className="flex-1 px-3">
                    <p className="font-medium text-4xl">{userDetails?.stats?.mentoryCount || 0}</p>
                    <p>Connection to Mentory</p>
                </div>
                <div className="flex-1 px-3">
                    <p className="font-medium text-4xl">{rooms}</p>
                    <p>Open Chats</p>
                </div>
            </div>
            <div className="mt-auto"><Link to="/profile" className="text-blue-700 underline text-xs">Go To Your Profile</Link></div>
        </div>
    )
}
