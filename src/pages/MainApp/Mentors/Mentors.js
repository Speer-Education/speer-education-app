import React from 'react';
import { useState, useEffect } from 'react';
import './Mentors.css'
import MentorCard from '../../../components/Mentor/MentorCard/MentorCard';
import { db } from '../../../config/firebase';

const Mentors = () => {
    const [mentors, setMentors] = useState([]);
    useEffect(() => {
        return db.collection('mentors').onSnapshot(snap => {
            setMentors(snap.docs.map( doc => {
                return { id: doc.id, ...doc.data()}
            }))
        })
    },[])

    return (
        <div className="mentors">
            <div className="mentors__grid">
                {mentors.map(({id, name, school, major, bio}) => <MentorCard
                    id={id}
                    key={id}
                    name={name}
                    school={school}
                    major={major}
                    bio={bio}
                    />)}
            </div>
        </div>
    );
}

export default Mentors;
