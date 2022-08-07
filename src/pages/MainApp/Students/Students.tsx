import { useState, useEffect } from 'react';
import './Students.css'
import MentorCard from '../../../components/Mentor/MentorCard/MentorCard';
import { docConverter, publicUserCollection } from '../../../config/firebase';
import { Helmet } from "react-helmet";
import StatsCard from '../../../components/Dashboard/StatsCard';
import UserSmallProfileCard from '../../../components/User/UserSmallProfileCard';
import { useAuth } from '../../../hooks/useAuth';
import { TransitionGroup } from "react-transition-group";
// import SlideTransition from '../../../components/SlideTransition/SlideTransition';
import { Grow } from '@mui/material';
import { PublicUserDoc } from '../../../types/User';
import Zoom from '@mui/material/Zoom';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useSpeerOrg } from '../../../hooks/useSpeerOrg';
import { OrganizationMemberDocument, OrgMergedUser } from '../../../types/Organization';
import { collection, query, where } from 'firebase/firestore';

const Students = () => {
    const { user, userDetails } = useAuth();
    const { orgId, orgRef } = useSpeerOrg();
    const [students, setStudents] = useState<PublicUserDoc[]>([]);
    const [mentorMembers = [], loadMentorMembers, errorMentorMembers] = useCollectionData<OrganizationMemberDocument>(query(collection(orgRef, 'members').withConverter(docConverter), where('isMentor', '==', true)))
    const [allMembers = [], loadAllMembers, errorAllMembers] = useCollectionData<PublicUserDoc>(query(publicUserCollection, where('organization', '==', orgId), where('finishSetup', '==', true)))
    // Still need to seperate students from Mentors
    // To do this, we  will need to get all mentors from the member collection,
    // Then filter out the mentors from there
    const studentsLoaded = (allMembers.length - mentorMembers.length) === students.length;

    useEffect(() => {
        if(!user) return;
        if(loadAllMembers && loadMentorMembers) return; //Ensure all members and all mentors are loaded before performing.

        //Get all mentor IDs
        const mentorIds = mentorMembers.map(mentor => mentor.id)
        //Filter out the members that have mentor Ids as we only want the students
        const filteredStudents = allMembers.filter(m => !mentorIds.includes(m.id))

        Promise.all(filteredStudents.map(async (student) => {
            return {
                ...student as PublicUserDoc,
            }
        }))
        .then(setStudents)
    },[user?.uid, allMembers, loadAllMembers])

    return (<Zoom in={true} >
        <div className="mentors h-app">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Students | Speer Education</title>
            </Helmet>
            <div className="pt-10 p-3 2xl:p-10">   
                <TransitionGroup>
                    <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 grid-flow-row justify-start  gap-4 -mt-12 flex-1">
                        {students.map((props) => 
                            <Grow in timeout={50} key={props.id}>
                                {/* @ts-ignore */}
                                <MentorCard {...props} isMtr={false}/>
                                {/*Since this is the students page, all users are students (we know they 
                                are students becuase we filtered out the mentors */}
                            </Grow>
                        )}
                    </div>
                </TransitionGroup>
                {!studentsLoaded ? <div className="grid place-items-center h-full min-w-[50vw]">
                        <h1 className="text-gray-500 lg:px-10">Loading Students...</h1>
                </div>: null}
                {students.length === 0 && studentsLoaded && <div className="grid place-items-center h-full">
                        <h1 className="text-gray-500 lg:px-10">You've Connected with All Our Students!</h1>
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

export default Students;
