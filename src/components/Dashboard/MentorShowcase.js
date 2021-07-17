import { Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../config/firebase';
import ProfilePicture from '../User/ProfilePicture';
import './MentorShowcase.css';

export default function MentorShowcase() {

    const [mentors, setMentors] = useState([]);

    useEffect(() => {
        return db.collection('mentors').onSnapshot(snap => {
            setMentors(snap.docs.map(doc => {
                return { id: doc.id, ...doc.data() }
            }))
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
    console.log(mentors)
    return (
        <div className="mentorShowcase">
            <p>New Mentors To Find</p>
            {/* Randomly generates 2 mentors in random order*/}
            {shuffleArray(mentors.slice(0)).slice(0,2).map(({ id, name, school, major, bio }) => <div className="flex flex-row p-2">
                <ProfilePicture className="w-10 h-10 rounded-full" uid={id}/>
                <div className="flex-1 ml-2">
                    <h3>{name}</h3>
                    <p>{major.value}</p>
                </div>
            </div>)}
        </div>
    )
}
