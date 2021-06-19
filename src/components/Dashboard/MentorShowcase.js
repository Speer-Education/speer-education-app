import { Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../config/firebase';
import MentorCard from '../Mentor/MentorCard/MentorCard';
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

    return (
        <div className="mentorShowcase">
            <h2>Explore Our Mentors:</h2>
            {/* Randomly generates 2 mentors in random order*/}
            {shuffleArray(mentors.slice(0)).slice(0,2).map(({ id, name, school, major, bio }) => <MentorCard
                id={id}
                key={id}
                name={name}
                school={school}
                major={major}
                bio={bio}
            />)}
            <Link to="/app/mentors">
                <Button variant="contained">View More Mentors</Button>
            </Link>
        </div>
    )
}
