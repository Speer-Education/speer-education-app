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
import { Button } from '@material-ui/core';
import UserHighlight from '../../../components/User/UserHighlight';
import BannerPicture from '../../../components/User/BannerPicture';
import { LinkedIn } from '@material-ui/icons';
import { followUser } from '../../../utils/relationships';
import UserFullProfile from '../../../components/Profile/UserFullProfile';
import EducationCard from '../../../components/Profile/EducationCard';

function ProfilePage({ isUser=false }) {
    const { profileId } = useParams();
    const { user, userDetails: currentUserDetails, signOut } = useAuth();
    const [userDetails, setUserDetails] = useState({});
    const [isMentor, setIsMentor] = useState(false);
    const [loading, setLoading] = useState(true);
    const { name, major, school, country,highlight1,highlight2, bio, socials } = userDetails || {};

    //If profileId is userId, then redirect to profile page
    useEffect(() => {
        if (profileId === user?.uid) {
            history.push('/app/profile');
        }
    }, [profileId, user])

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
    }, [isUser, profileId]);

    return (
        <div className="profilePage">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{isUser?"Your":name || ""} Profile | Speer Education</title>
            </Helmet>
            <div className="w-screen h-full flex flex-row">
                <div className="hidden xl:flex flex-col h-full" style={{ height: 'calc(100vh - 6rem)', width: `350px` }}>
                    <ContactsSidebar profileId={profileId || user?.uid}/>
                    <StatsCard />
                </div>
                <div className="flex-1 flex flex-row w-full">
                    <div className="flex flex-row justify-center flex-1">
                        <div className="flex flex-col h-full p-3 space-y-4 w-max flex-1" style={{ maxWidth: "768px" }}>
                            <p className="font-semibold text-lg">{isUser?"Your":name} Profile</p>
                            <UserFullProfile profileId={profileId || user?.uid} isUser={isUser} isMentor={isMentor} userDetails={userDetails}/>
                            <div className="rounded-xl shadow-lg w-full overflow-hidden bg-white py-3 px-8">
                                <p className="font-semibold text-lg">About Me</p>
                                <p>{bio}</p>
                            </div>
                            {/* Temporary */}
                            {isUser && <div className="rounded-xl shadow-lg w-full overflow-hidden bg-white py-3 px-8">
                                <p className="font-semibold text-lg">Settings</p>
                                {/* Logout Button */}
                                <Button variant="outlined" onClick={() => signOut()}>Logout</Button>
                            </div>}
                        </div>
                    </div>
                    <div className="flex flex-col h-full" style={{ height: 'calc(100vh - 6rem)', width: `350px` }}>
                        {socials && <div className="flex flex-col p-3 m-2 shadow-lg rounded-md bg-white">
                            <p className="font-semibold text-lg">Socials</p>
                            <div className="flex flex-row items-center space-x-2 text-gray-600">
                                <LinkedIn/>
                                <a className="text-sm" href={socials.linkedin}>{socials.linkedin}</a>
                            </div>
                        </div>}
                        <EducationCard userDetails={userDetails} isUser={isUser} isMentor={isMentor} />
                    </div>
                </div>
            </div>
        </div>  
    )
}

export default ProfilePage
