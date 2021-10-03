import React from 'react';
import { useState, useEffect } from 'react';
import './Mentors.css'
import MentorCard from '../../../components/Mentor/MentorCard/MentorCard';
import { db } from '../../../config/firebase';
import {Helmet} from "react-helmet";
import StatsCard from '../../../components/Dashboard/StatsCard';
import UserSmallProfileCard from '../../../components/User/UserSmallProfileCard';
import { useAuth } from '../../../hooks/useAuth';
import { logEvent } from '../../../utils/analytics';
import { TransitionGroup } from "react-transition-group";
import SlideTransition from '../../../components/SlideTransition/SlideTransition';
import { Grow } from '@mui/material';

const Mentors = () => {

    const { user, userDetails } = useAuth();
    const [mentors, setMentors] = useState([]);
    const [mentorsLoaded, setMentorsLoaded] = useState(false);


    useEffect(() => {
        //Get all the mentors and set in mentors
        return db.collection('mentors').orderBy('_addedDate','desc').onSnapshot(snap => {
            const allMentors = snap.docs.map( doc => {
                return { id: doc.id, ...doc.data()}
            })

            const currentMentors = allMentors.filter(({connectedMentees, id}) => !(connectedMentees || []).includes(user?.uid) && id !== user?.uid)

            setMentors(currentMentors)
            logEvent('Loaded Mentors',{
                mentorsLoaded: currentMentors.length,
                mentorsList: currentMentors.map(({name}) => name)
            })
            setMentorsLoaded(true)
        })
    },[user?.uid])

    return (<SlideTransition in timeout={50}>
        <div className="mentors h-app">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Mentors | Speer Education</title>
            </Helmet>
            <div className="pt-10 p-3 2xl:p-10">   
                <TransitionGroup>
                    <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 grid-flow-row justify-start  gap-4 -mt-12 flex-1">
                        {mentors.map((props) => 
                            <Grow in timeout={50} key={props.id}>
                                <MentorCard {...props} />
                            </Grow>
                        )}
                    </div>
                </TransitionGroup>
                {!mentorsLoaded ? <div className="grid place-items-center h-full min-w-[50vw]">
                        <h1 className="text-gray-500 lg:px-10">Loading Mentors...</h1>
                </div>: null}
                {mentors.length === 0 && mentorsLoaded && <div className="grid place-items-center h-full">
                        <h1 className="text-gray-500 lg:px-10">You've Connected with All Our Mentors!</h1>
                </div>}
                <br></br>
            </div>
            <div className="hidden lg:flex flex-col lg:w-96">
                <div className="fixed lg:w-96">
                    <UserSmallProfileCard uid={user?.uid} userDetails={userDetails}/>
                    <StatsCard/>
                </div>
            </div>
        </div>
    </SlideTransition>);
}

export default Mentors;
