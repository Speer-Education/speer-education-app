import React, { useState, useEffect } from 'react';
import { db, storage, functions } from '../../../config/firebase';
import { useParams } from 'react-router-dom';
import history from '../../../hooks/history';
import {Helmet} from "react-helmet";
import './ProfilePage.css'
import { useAuth } from '../../../hooks/useAuth';
import StatsCard from '../../../components/Dashboard/StatsCard';
import ContactsSidebar from '../../../components/Profile/ContactsSidebar';
import ProfilePicture from '../../../components/User/ProfilePicture';

function ProfilePage({ isUser=false }) {
    const { profileId } = useParams();
    const { user, userDetails: currentUserDetails } = useAuth();
    const [userDetails, setUserDetails] = useState({});
    const [isMentor, setIsMentor] = useState(false);
    const [loading, setLoading] = useState(true);
    const { name, major, school, country,highlight1,highlight2 } = userDetails || {};

    //If Profile Page is current user, set user details with current user details
    useEffect(() => {
        if (isUser) {
            setUserDetails(currentUserDetails);
        }
    }, [isUser, currentUserDetails]);
    
    useEffect(() => {
        if(isUser) return;
        return db.doc(`users/${profileId}`).onSnapshot(async snap => {
            console.log(snap.data())
            setUserDetails(snap.data());
            if (snap.data().isMtr){
                setIsMentor(true)
            }
            setLoading(false);
        })
    }, [isUser, profileId])

    const connectWithPerson = async () => {
        // Send person Id to backend for room creation, or to just use the room that alr existed.

        //We can use this existing function, but maybe change the backend because rn the backend is destructuring it as mentorId, 
        //so make the backend destructure as profileId, and change the mentor said to put it in as profileId as well.
        let { data: targetRoomId } = await functions.httpsCallable('createRoom')({ profileId })
            .catch((error) => {
                console.error(error)
            })
        history.push(`/app/messages/${targetRoomId}`)
    }

    return (
        <div className="profilePage">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{isUser?"Your":name} Profile | Speer Education</title>
            </Helmet>
            <div className="w-screen h-full flex flex-row">
                <div className="flex flex-col h-full" style={{ height: 'calc(100vh - 6rem)', width: `350px` }}>
                    <ContactsSidebar profileId={profileId || user?.uid}/>
                    <StatsCard />
                </div>
                <div className="flex-1 flex flex-row">
                    <div className="flex flex-col h-full p-3 w-9/12">
                        <p className="font-semibold text-lg">{isUser?"Your":name} Profile</p>
                        <div className="rounded-xl shadow-lg w-full overflow-hidden bg-white">
                            <img className="w-full h-32 rounded-xl shadow-md object-cover" src="../team_speer/chew.png"/>
                            <div className="flex flex-row p-3">
                                <ProfilePicture className="w-32 h-32 rounded-full border-white border-8 border-solid shadow-lg transform -translate-y-16 mx-3" uid={profileId || user?.uid}/>
                                <div className="flex flex-col space-y-1">
                                    <h1 className="text-2xl text-gray-800">{name}</h1>
                                    <p className="text-gray-600 text-sm">{isMentor?"Mentor":major} at {school}</p>
                                    <p className="text-gray-600 text-sm">{country}</p>
                                    <div className="flex flex-row items-center my-5">
                                        <div className="w-1/6 p-3 text-center text-2xl bg-white rounded-xl flex justify-center items-center shadow-md mr-2">{highlight1?.emoji}</div>
                                        <span className="w-1/3 text-sm text-gray-500">{highlight1?.description}</span>
                                        <span className="w-1/6 p-3 text-center text-2xl bg-white rounded-xl flex justify-center items-center shadow-md mx-2">{highlight2?.emoji}</span>
                                        <span className="w-1/3 text-sm text-gray-500">{highlight2?.description}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
