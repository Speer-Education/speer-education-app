import { useState, useEffect } from 'react';
import './People.css'
import MentorCard from '../../../components/Mentor/MentorCard/MentorCard';
import { db, docConverter, publicUserCollection } from '../../../config/firebase';
import {Helmet} from "react-helmet";
import StatsCard from '../../../components/Dashboard/StatsCard';
import UserSmallProfileCard from '../../../components/User/UserSmallProfileCard';
import { useAuth } from '../../../hooks/useAuth';
import { TransitionGroup } from "react-transition-group";
// import SlideTransition from '../../../components/SlideTransition/SlideTransition';
import { Grow, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { PublicUserDoc } from '../../../types/User';
import Zoom from '@mui/material/Zoom';
import { collection, doc, getDoc, query, where } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useSpeerOrg } from '../../../hooks/useSpeerOrg';
import { OrganizationMemberDocument, OrgMergedUser } from '../../../types/Organization';

const People = () => {
    const { user, userDetails } = useAuth();
    const { orgId, orgRef } = useSpeerOrg();
    const [ peopleType, setPeopleType ] = useState(0); //0 is All, 1 is Mentors, 2 is Students
    const [mentors, setMentors] = useState<PublicUserDoc[]>([]);
    const [students, setStudents] = useState<PublicUserDoc[]>([]);
    const [mentorMembers = [], loadMembers, errorMembers] = useCollectionData<OrganizationMemberDocument>(query(collection(orgRef, 'members').withConverter(docConverter), where('isMentor', '==', true)))
    const [allMembers = [], loadAllMembers, errorAllMembers] = useCollectionData<PublicUserDoc>(query(publicUserCollection, where('organization', '==', orgId), where('finishSetup', '==', true)))

    const mentorsLoaded = mentorMembers.length === mentors.length;
    const studentsLoaded = (allMembers.length - mentorMembers.length) === students.length;

    useEffect(() => {
        if(!user) return;
        if(loadMembers) return;
        //get all mentors profiles

        Promise.all(mentorMembers.map(async (member) => {
            const mentor = await getDoc(doc(db, 'usersPublic', member.id).withConverter(docConverter))

            return {
                ...member,
                ...mentor.data() as PublicUserDoc
            }
        }))
        .then(setMentors)

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


    },[user?.uid, mentorMembers, allMembers, loadMembers])


    const handleFilterChange = (e) => {
        //For some reason e.target.value is always a string even if it is a number, so we have to parseInt it.

        if (!isNaN(parseInt(e.target.value))) setPeopleType(parseInt(e.target.value))
    }

    return (<Zoom in={true} >
        <div className="people h-app">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Mentors | Speer Education</title>
            </Helmet>
            <div className="pt-10 p-3 2xl:p-10">   
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Filter</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={0}
                        name="radio-buttons-group"
                        onChange={handleFilterChange}
                    >
                        <FormControlLabel value={0} control={<Radio />} label="All" />
                        <FormControlLabel value={1} control={<Radio />} label="Mentors" />
                        <FormControlLabel value={2} control={<Radio />} label="Students" />
                    </RadioGroup>
                </FormControl>
                {!mentorsLoaded ? <div className="grid place-items-center h-full min-w-[50vw]">
                        <h1 className="text-gray-500 lg:px-10">Loading Mentors...</h1>
                </div>: null}
                {!studentsLoaded ? <div className="grid place-items-center h-full min-w-[50vw]">
                        <h1 className="text-gray-500 lg:px-10">Loading Students...</h1>
                </div>: null}
                <TransitionGroup>
                    <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 grid-flow-row justify-start  gap-4 mt-10 flex-1">
                        {peopleType !== 2 ? mentors.map((props) => 
                            <Grow in timeout={50} key={props.id}>
                                {/* @ts-ignore */}
                                <MentorCard {...props} isMtr={true} /> 
                                {/*Since this is the mentor page, all users are mentors (we know they 
                                are mentors becuase we queried for IsMtr from the Organization Members collection) */}
                            </Grow>
                        ): <></>}
                        {peopleType !== 1 ? students.map((props) => 
                            <Grow in timeout={50} key={props.id}>
                                {/* @ts-ignore */}
                                <MentorCard {...props} isMtr={false}/>
                                {/*Since this is the students page, all users are students (we know they 
                                are students becuase we filtered out the mentors */}
                            </Grow>
                        ) : <></>}
                    </div>
                </TransitionGroup>
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

export default People;
