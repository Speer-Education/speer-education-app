import { useState, useEffect } from 'react';
import './Mentors.css'
import MentorCard from '../../../components/Mentor/MentorCard/MentorCard';
import { db, docConverter } from '../../../config/firebase';
import {Helmet} from "react-helmet";
import StatsCard from '../../../components/Dashboard/StatsCard';
import UserSmallProfileCard from '../../../components/User/UserSmallProfileCard';
import { useAuth } from '../../../hooks/useAuth';
import { TransitionGroup } from "react-transition-group";
// import SlideTransition from '../../../components/SlideTransition/SlideTransition';
import { Grow } from '@mui/material';
import { PublicUserDoc } from '../../../types/User';
import Zoom from '@mui/material/Zoom';
import { collection, doc, getDoc, query, where } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useSpeerOrg } from '../../../hooks/useSpeerOrg';
import { OrganizationMemberDocument, OrgMergedUser } from '../../../types/Organization';

const Mentors = () => {
    const { user, userDetails } = useAuth();
    const { orgRef } = useSpeerOrg();
    const [mentors, setMentors] = useState<OrgMergedUser[]>([]);
    const [mentorMembers = [], loadMembers, errorMembers] = useCollectionData<OrganizationMemberDocument>(query(collection(orgRef, 'members').withConverter(docConverter), where('isMentor', '==', true)))
    const mentorsLoaded = mentorMembers.length == mentors.length;

    useEffect(() => {
        if(!user) return;
        if(loadMembers) return;
        //get all mentors profiles

        console.log("mentor members:", mentorMembers)

        Promise.all(mentorMembers.map(async (member) => {
            const mentor = await getDoc(doc(db, 'usersPublic', member.id).withConverter(docConverter))

            return {
                ...member,
                ...mentor.data() as PublicUserDoc
            }
        }))
        .then(setMentors)
    },[user?.uid, mentorMembers, loadMembers])

    return (<Zoom in={true} >
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
                                {/* @ts-ignore */}
                                <MentorCard {...props} isMtr={true} /> 
                                {/*Since this is the mentor page, all users are mentors (we know they 
                                are mentors becuase we queried for IsMtr from the Organization Members collection) */}
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
                    {user && userDetails && <UserSmallProfileCard uid={user.uid} userDetails={userDetails}/>}
                    <StatsCard/>
                </div>
            </div>
        </div>
    </Zoom>);
}

export default Mentors;
