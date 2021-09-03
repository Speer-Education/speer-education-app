import React, { useState, useEffect } from 'react';
import { db } from '../../../config/firebase';
import { useParams } from 'react-router-dom';
import history from '../../../hooks/history';
import {Helmet} from "react-helmet";
import './ProfilePage.css'
import { useAuth } from '../../../hooks/useAuth';
import StatsCard from '../../../components/Dashboard/StatsCard';
import ContactsSidebar from '../../../components/Profile/ContactsSidebar';
import { Button, IconButton } from '@material-ui/core';
import UserFullProfile from '../../../components/Profile/UserFullProfile';
import EducationCard from '../../../components/Profile/EducationCard';
import SocialsCard from '../../../components/Profile/SocialsCard';
import ProfilePostStream from '../../../components/Profile/ProfilePostStream';
import { EditOutlined } from '@material-ui/icons';
import EditBiographyDialog from '../../../components/Profile/EditBiographyDialog';

function ProfilePage({ isUser=false }) {
    const { profileId } = useParams();
    const { user, userDetails: currentUserDetails, signOut } = useAuth();
    const [userDetails, setUserDetails] = useState({});
    const [isMentor, setIsMentor] = useState(false);
    const [loading, setLoading] = useState(true);
    const [openEditBio, setOpenEditBio] = useState(false);
    
    const { name, bio, socials } = userDetails || {};

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
            setUserDetails(snap.data());
            if (snap.data().isMtr){
                setIsMentor(true)
            }
            setLoading(false);
        })
    }, [isUser, profileId]);

    return (
        <div className="profilePage h-app">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{isUser?"Your":name || ""} Profile | Speer Education</title>
            </Helmet>
            <div className="w-screen h-full flex flex-row">
                <div className="hidden xl:flex flex-col h-full h-app w-sidebar">
                    <div className="fixed flex flex-col cc_cursor h-app">
                        <ContactsSidebar profileId={profileId || user?.uid} userDetails={userDetails} isUser={isUser}/>
                        <StatsCard />
                    </div>
                </div>
                <div className="flex-1 flex flex-row w-full">
                    <div className="flex flex-row justify-center flex-1 w-full p-3 md:p-0">
                        <div className="flex flex-col h-full p-3 space-y-4 flex-1" style={{ maxWidth: "1024px" }}>
                            <p className="font-semibold text-lg">{isUser?"Your":name} Profile</p>
                            <UserFullProfile profileId={profileId || user?.uid} isUser={isUser} isMentor={isMentor} userDetails={userDetails}/>
                            <div className="relative rounded-xl shadow-lg w-full overflow-hidden bg-white py-5 px-8 space-y-2">
                                <p className="font-semibold text-lg">About Me</p>
                                <div className="absolute top-0 right-0 m-1 text-white rounded-full bg-gray-100 transform scale-75">
                                    <IconButton onClick={e => setOpenEditBio(true)}>
                                        <EditOutlined />
                                    </IconButton>
                                </div>
                                <p className="text-gray-600">{bio}</p>
                            </div>
                            <EditBiographyDialog open={openEditBio} onClose={() => setOpenEditBio(false)}/>
                            <ProfilePostStream uid={profileId || user?.uid} />
                        </div>
                    </div>
                    <div className=" hidden md:flex flex-col h-app w-sidebar pl-3">
                        <div className="fixed flex flex-col cc_cursor h-app">
                            <EducationCard userDetails={userDetails} isUser={isUser} isMentor={isMentor} />
                            <SocialsCard socials={socials} isUser={isUser}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    )
}

export default ProfilePage
