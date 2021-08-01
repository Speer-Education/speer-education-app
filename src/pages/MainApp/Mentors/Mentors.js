import React from 'react';
import { useState, useEffect } from 'react';
import './Mentors.css'
import MentorCard from '../../../components/Mentor/MentorCard/MentorCard';
import { db } from '../../../config/firebase';
import {Helmet} from "react-helmet";
import StatsCard from '../../../components/Dashboard/StatsCard';
import UserSmallProfileCard from '../../../components/Mentor/MentorCard/UserSmallProfileCard';
import { useAuth } from '../../../hooks/useAuth';

const Mentors = () => {

    const { user } = useAuth();
    const [mentors, setMentors] = useState([]);

    useEffect(() => {
        //Get all the mentors and set in mentors
        return db.collection('mentors').onSnapshot(snap => {
            setMentors(snap.docs.map( doc => {
                return { id: doc.id, ...doc.data()}
            }))
        })
    },[])

    return (
        <div className="mentors">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Mentors | Speer Education</title>
            </Helmet>
            <div className="flex-1 p-10">
                <div className="flex flex-row flex-wrap gap-4 -mt-12">
                    {mentors.map(({id, name, school, major, bio, connectedMentees}) => {
                        
                        if (connectedMentees.includes(user?.uid)){
                            return <></>
                        }
                        return (<MentorCard
                            id={id}
                            key={id}
                            name={name}
                            school={school}
                            major={major}
                            bio={bio}
                            />)
                        })}
                </div>

            </div>
            <div className="flex flex-col w-96">
                <UserSmallProfileCard />
                <StatsCard/>
            </div>
        </div>
    );
}

export default Mentors;
