import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import './MentorShowcase.css';

export default function StatsCard() {

    const { userDetails } = useAuth();
    
    return (
        <div className="mentorShowcase">
            <div className="flex flex-row justify-between">
                <p>Your Stats</p>
                <HelpOutlineIcon style={{ fontSize: 18 }}/>
            </div>
            <div className="flex flex-row w-full divide-x divide-gray-400">
                <div className="flex-1 py-4 px-1">
                    <p className="font-semibold text-2xl">12</p>
                    <p>Connection to Mentory</p>
                </div>
                <div className="flex-1 py-4 px-1 border-l-2">
                    <p className="font-semibold text-2xl">23</p>
                    <p>Open Chats</p>
                </div>
            </div>
        </div>
    )
}
