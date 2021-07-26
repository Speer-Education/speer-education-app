import './MentorCard.css'
import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom';
import { storage } from '../../../config/firebase';
import Loader from '../../Loader/Loader';
import ProfilePicture from '../../User/ProfilePicture';
import SendIcon from '@material-ui/icons/Send';

const MentorCard = ({ id, name, school, major, bio }) => {

    return (
        <div className="bg-white rounded-lg shadow-lg flex flex-col items-center p-3 w-60">
            <ProfilePicture uid={id} alt="mentor" className="absolute transform -translate-y-16 rounded-full border-white border-8 border-solid shadow-lg"/>
            <div className="mt-14 space-y-2 h-full flex flex-col">
                <div className="space-y-1 text-center">
                    <h3 className="font-medium">{name}</h3>
                    <p className="text-md text-gray-600">Mentor @ {school}</p>
                </div>
                <div className="space-y-1 text-center flex-1">
                    <p className="text-md text-gray-600">{major.label}</p>
                    <p className="text-sm text-gray-600">{bio.substring(0, 125)}</p>

                </div>
                <div className="flex flex-row">
                    <input className="shadow-lg rounded-xl px-2 py-3 border-0 flex-1" placeholder="Break the ice. Say Hi 👋"/>
                    <button className="shadow-lg rounded-xl p-2 bg-yellow-500 border-0 ml-2">
                        <SendIcon className="w-8 h-8 text-white"/>
                    </button>
                    
                </div>
                
            </div>
        </div>
    );
}

export default MentorCard;
