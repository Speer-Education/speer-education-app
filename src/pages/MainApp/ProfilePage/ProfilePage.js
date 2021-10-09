import React, { useState, useEffect, lazy } from 'react';
import { db } from '../../../config/firebase';
import { useParams } from 'react-router-dom';
import history from '../../../hooks/history';
import {Helmet} from "react-helmet";
import './ProfilePage.css'
import { useAuth } from '../../../hooks/useAuth';
import StatsCard from '../../../components/Dashboard/StatsCard';
import ContactsSidebar from '../../../components/Profile/ContactsSidebar';
import { IconButton } from '@mui/material';
import UserFullProfile from '../../../components/Profile/UserFullProfile';
import EducationCard from '../../../components/Profile/EducationCard';
import SocialsCard from '../../../components/Profile/SocialsCard';
import ProfilePostStream from '../../../components/Profile/ProfilePostStream';
import { EditOutlined } from '@mui/icons-material';
import PostComposerCard from '../../../components/Dashboard/PostComposerCard';
import NotFoundPage from '../../Fallback/NotFoundPage';
import SlideTransition from '../../../components/SlideTransition/SlideTransition';

const LazyEditBiographyDialog = lazy(() => import('../../../components/Profile/EditBiographyDialog'));

function ProfilePage({ isUser=false }) {
    const { profileId } = useParams();
    const { user, userDetails: currentUserDetails } = useAuth();
    const [userDetails, setUserDetails] = useState({});
    const [isMentor, setIsMentor] = useState(false);
    const [loading, setLoading] = useState(true);
    const [openEditBio, setOpenEditBio] = useState(false);
    const [profileFound, setProfileFound] = useState(true);
    
    const { name, bio, socials, isMtr } = userDetails || {};

    //If profileId is userId, then redirect to profile page
    useEffect(() => {
        if (profileId === user?.uid) {
            history.push('/profile');
        }
    }, [profileId, user])

    //If Profile Page is current user, set user details with current user details
    useEffect(() => {
        if (isUser) {
            setUserDetails(currentUserDetails);
        }
    }, [isUser, currentUserDetails]);
    
    useEffect(() => {
        if(isUser) {
            //Set profile found as true again, in case we are coming from a prof. not found page
            setProfileFound(true);
            return;
        };
        return db.doc(`users/${profileId}`).onSnapshot(async snap => {
            setUserDetails(snap.data());

            //THis means that profile does not exist
            if (!snap.data()){
                setProfileFound(false);
                return
            }

            if (snap.data()?.isMtr){
                setIsMentor(true)
            }
            setLoading(false);
        })
    }, [isUser, profileId]);

    return (
        !profileFound ? <NotFoundPage/> : <div className="profilePage h-app">
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
                    <SlideTransition in timeout={50}>
                    <div className="flex flex-row justify-center flex-1 w-full p-3 md:p-0">
                        <div className="flex flex-col h-full p-3 space-y-4 flex-1" style={{ maxWidth: "1024px" }}>
                                <p className="font-semibold text-lg">{isUser?"Your":name +"'s"} Profile</p>
                                <UserFullProfile profileId={profileId || user?.uid} isUser={isUser} isMentor={isMtr} userDetails={userDetails}/>
                                <div className="relative rounded-xl shadow-lg w-full overflow-hidden bg-white py-5 px-8 space-y-2">
                                    <p className="font-semibold text-lg">About Me</p>
                                    <div className="absolute top-0 right-0 m-1 text-white rounded-full bg-gray-100 transform scale-75">
                                        {isUser? <IconButton onClick={e => setOpenEditBio(true)} size="large">
                                            <EditOutlined />
                                        </IconButton> : null}
                                    </div>
                                    <p className="text-gray-600">{bio}</p>
                                </div>
                                <LazyEditBiographyDialog open={openEditBio} onClose={() => setOpenEditBio(false)}/>
                                {isUser ? <>
                                    <p className="font-semibold text-lg">Create a Post</p>
                                    <PostComposerCard />
                                </>: null}
                                <ProfilePostStream uid={profileId || user?.uid} isUser={isUser} name={name}/>
                        </div>
                    </div>
                    </SlideTransition>
                    <div className=" hidden md:flex flex-col h-app w-sidebar pl-3 mr-6">
                        <div className="fixed flex flex-col cc_cursor h-app">
                            <EducationCard userDetails={userDetails} isUser={isUser} isMentor={isMtr} />
                            <SocialsCard socials={socials} isUser={isUser}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage
