import React from 'react';
import { useState, useEffect } from 'react';
import './Mentors.css'
import MentorCard from '../../../components/Mentor/MentorCard/MentorCard';
import { db } from '../../../config/firebase';
import {Helmet} from "react-helmet";
import StatsCard from '../../../components/Dashboard/StatsCard';
import UserSmallProfileCard from '../../../components/User/UserSmallProfileCard';
import { useAuth } from '../../../hooks/useAuth';

const Mentors = () => {

    const { user, userDetails } = useAuth();
    const [mentors, setMentors] = useState([]);

    useEffect(() => {
        //Get all the mentors and set in mentors
        return db.collection('mentors').orderBy('_addedDate','desc').onSnapshot(snap => {
            const allMentors = snap.docs.map( doc => {
                return { id: doc.id, ...doc.data()}
            })
            setMentors(allMentors.filter(({connectedMentees, id}) => !connectedMentees.includes(user?.uid) && id !== user?.uid))
        })
    },[user?.uid])

    return (
        <div className="mentors h-app">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Mentors | Speer Education</title>
            </Helmet>
            <div className="pt-10 p-3 2xl:p-10">   
                <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 grid-flow-row justify-start hover:place-items-center gap-4 -mt-12 flex-1">
                    {mentors.map((props) => {
                        return (<MentorCard {...props} key={props.id} />)
                        })}
                </div>
                {mentors.length === 0 && <div className="grid place-items-center h-full">
                        <h1 className="text-gray-500 lg:px-10">You've Connected with All Our Mentors!</h1>
                </div>}
            </div>
            <div className="hidden lg:flex flex-col lg:w-96">
                <div className="fixed lg:w-96">
                    <UserSmallProfileCard uid={user?.uid} userDetails={userDetails}/>
                    <StatsCard/>
                </div>
            </div>
        </div>
    );
}

export default Mentors;
