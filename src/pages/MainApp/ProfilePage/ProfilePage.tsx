import { useState, useEffect, lazy } from 'react';
import { db, docConverter } from '../../../config/firebase';
import { useNavigate, useParams } from 'react-router-dom';
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
import { UserDetails } from '../../../types/User';
import Zoom from '@mui/material/Zoom';
import { collection, doc, increment, onSnapshot, updateDoc } from 'firebase/firestore';
import ProfileViewsCard from '../../../components/Profile/ProfileViewsCard';
import ResumeCard from '../../../components/Profile/ResumeCard';
import OccupationCard from '../../../components/Profile/OccupationCard';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useSpeerOrg } from '../../../hooks/useSpeerOrg';
import { OrganizationMemberDocument } from '../../../types/Organization';

const LazyEditBiographyDialog = lazy(() => import('../../../components/Profile/EditBiographyDialog'));

function ProfilePage({ isUser=false }: { isUser?: boolean }) {
    const navigate = useNavigate();
    const { profileId } = useParams();
    const { user, userDetails: currentUserDetails } = useAuth();
    const [userDetails, setUserDetails] = useState<UserDetails>();
    const [loading, setLoading] = useState(true);
    const { orgRef } = useSpeerOrg();
    const [userOrgDoc, loadUserOrgDoc, errorUserOrgDoc] = useDocumentData<OrganizationMemberDocument>((orgRef && user?.uid)?doc(orgRef, 'members', profileId || user.uid).withConverter(docConverter) : null);
    const [openEditBio, setOpenEditBio] = useState(false);
    const [profileFound, setProfileFound] = useState(true);
    
    // console.log('userOrgDoc', userOrgDoc);
    
    const { name, biography, socials, stats } = userDetails || {};
    // const { isMtr = false } = permissions || {}
    const isMtr = !!userOrgDoc?.isMentor;
    const { views = 0 } = stats || {};

    //If profileId is userId, then redirect to profile page
    useEffect(() => {
        if (profileId === user?.uid) {
            navigate('/profile');
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
            setLoading(false);
            return;
        };
        //update public user view count
        const profileRef = doc(collection(db, 'usersPublic'), profileId);
        updateDoc(profileRef, {
            'stats.views': increment(1)
        });
        return onSnapshot(profileRef, async snap => {
            setUserDetails(snap.data() as UserDetails);

            //THis means that profile does not exist
            if (!snap.data()){
                setProfileFound(false);
                return
            }
            setLoading(false);
        })
    }, [isUser, profileId]);

    return (
        !profileFound ? <NotFoundPage/> : <div className="profilePage h-app">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{isUser?"Your":name || ""} Profile | Catalyst Education</title>
            </Helmet>
            <Zoom in>
                <div className="w-screen h-full grid xl:grid-cols-[350px_auto_350px] md:grid-cols-[auto_350px] grid-cols-1 ">
                    <div className="hidden xl:flex flex-col h-full h-app w-sidebar">
                        <div className="fixed flex flex-col cc_cursor h-app w-sidebar p-3 space-y-2">
                            {((profileId || user?.uid) && userDetails) && <ContactsSidebar profileId={profileId || user!.uid} userDetails={userDetails} isUser={isUser}/>}
                            <StatsCard />
                        </div>
                    </div>
                    <SlideTransition in timeout={50}>
                        <div className="flex flex-row justify-center flex-1 w-full md:p-0">
                            <div className="flex flex-col h-full p-3 space-y-4 flex-1" style={{ maxWidth: "1024px" }}>
                                    <p className="font-semibold text-lg">
                                        {isUser?"Your":name +"'s"} Profile
                                    </p>
                                    {userDetails && 
                                    <UserFullProfile 
                                        profileId={profileId || user?.uid || "" } 
                                        isUser={isUser} 
                                        isMentor={isMtr} 
                                        userDetails={userDetails}
                                    />}
                                    <div className="relative rounded-xl shadow-lg w-full overflow-hidden bg-white py-5 px-8 space-y-2">
                                        <p className="font-semibold text-lg">About Me</p>
                                        <div className="absolute top-0 right-0 m-1 text-white rounded-full bg-gray-100 transform scale-75">
                                            {isUser? <IconButton onClick={e => setOpenEditBio(true)} size="large">
                                                <EditOutlined />
                                            </IconButton> : null}
                                        </div>
                                        <p className="text-gray-600">{biography}</p>
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
                    <div className="flex flex-col h-app md:w-sidebar ">
                        <div className="md:fixed flex flex-col cc_cursor p-3 space-y-2">
                            {userDetails && <EducationCard userDetails={userDetails} isUser={isUser} isMentor={isMtr!} />}
                            {userDetails && <OccupationCard userDetails={userDetails} isUser={isUser} isMentor={isMtr!} />}
                            {socials && <SocialsCard socials={socials} isUser={isUser}/>}
                            {isUser && <ProfileViewsCard views={views} />}
                            {userDetails && <ResumeCard userDetails={userDetails} isUser={isUser}/>}
                        </div>
                    </div>
                </div>
            </Zoom>
        </div> 
    );
}

export default ProfilePage
