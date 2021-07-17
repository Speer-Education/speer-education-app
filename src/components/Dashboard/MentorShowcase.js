import { Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../config/firebase';
import ProfilePicture from '../User/ProfilePicture';
import PersonAddTwoToneIcon from '@material-ui/icons/PersonAddTwoTone';
import { IconButton } from '@material-ui/core';
import './MentorShowcase.css';
import { useAuth } from '../../hooks/useAuth';
import { followUser } from '../../utils/relationships';

export default function MentorShowcase() {

    const [mentors, setMentors] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        return db.collection('mentors').onSnapshot(snap => {
            //TODO: Proper method of fetching random mentor documents, this way is highly inefficient and is going to cost us a lot of reads
            setMentors(
                shuffleArray(
                    snap.docs.map(doc => {
                        return { id: doc.id, ...doc.data() }
                    }
                )
            ).slice(0,9))
        })
    }, [])

    /* Randomize array in-place using Durstenfeld shuffle algorithm (to use to randomize the mentors we add) */
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    const handleAddMentor = async (mentorId) => {
        if(!user?.uid) return; //Check if user has loaded
        await followUser(user.uid, mentorId)
        console.log('followed user')
    }

    return (
        <div className="mentorShowcase">
            <p>New Mentors To Find</p>
            {/* Randomly generates 2 mentors in random order*/}
            {mentors.map(({ id, name, school, major, bio }) => <div className="flex flex-row p-2">
                <ProfilePicture className="w-10 h-10 rounded-full" uid={id}/>
                <div className="flex-1 ml-2">
                    <h3>{name}</h3>
                    <p>{major.label}</p>
                </div>
                <IconButton onClick={() => handleAddMentor(id)}>
                    <PersonAddTwoToneIcon/>
                </IconButton>
                
                
            </div>)}
        </div>
    )
}
