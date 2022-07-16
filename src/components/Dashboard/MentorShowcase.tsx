import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {db, docConverter, publicUserCollection} from '../../config/firebase';
import ProfilePicture from '../User/ProfilePicture';
import PersonAddTwoToneIcon from '@mui/icons-material/PersonAddTwoTone';
import { IconButton } from '@mui/material';
import './MentorShowcase.css';
import { useAuth } from '../../hooks/useAuth';
import MentorCardModal from '../Modal/MentorCardModal';
import {UserDetails, MentorDetailsDocument, PublicUserDoc} from '../../types/User';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {collection, orderBy, query, where, doc, getDoc} from 'firebase/firestore';
import {getMajor} from '../../utils/user';
import { useSpeerOrg } from '../../hooks/useSpeerOrg';
import {OrganizationMemberDocument, OrgMergedUser} from '../../types/Organization';
export default function MentorShowcase() {
    const { orgRef } = useSpeerOrg();
    const [creatingRoom, setCreatingRoom] = useState(false);
    const [mentorSelected, setMentorSelected] = useState<MentorDetailsDocument>();
    const [mentorModalOpen, setMentorModalOpen] = useState(false);
    const { user } = useAuth();

    const [mentors, setMentors] = useState<OrgMergedUser[]>([]);
    const [mentorMembers = [], loadMembers, errorMembers] = useCollectionData<OrganizationMemberDocument>(query(collection(orgRef, 'members').withConverter(docConverter), where('isMentor', '==', true)))
    const mentorsLoaded = mentorMembers.length == mentors.length;
    if(errorMembers) console.error(errorMembers)

    useEffect(() => {
        if(!user) return;
        if(loadMembers) return;
        //get all mentors profiles
        Promise.all(mentorMembers.map(async (member) => {
            const mentor = await getDoc(doc(db, 'usersPublic', member.id).withConverter(docConverter));
            return {
                ...member,
                ...mentor.data() as PublicUserDoc,
            }
        }))
        .then(setMentors)
    },[user?.uid, mentorMembers, loadMembers])

    
    if(mentors.length === 0) return (
        <div className="flex-1 mentorShowcase h-full p-3 grid place-items-center">
            {/* TOOD: Add No Recent Chats Icon */}
            <h2 className="text-gray-500">No New Mentors</h2>
        </div>
    )

    return (
        <div className="flex flex-col flex-1 mentorShowcase"  style={{'height': '400px'}}>
            <p>New Mentors To Find</p>
            {/* Randomly generates 3 mentors in random order*/}
            <div className="overflow-hidden">
                {mentors.map(({ id, ...props }) => { 
                    return (
                        <div className="flex flex-row py-1 transition-colors hover:bg-gray-100 items-center rounded-xl" key={id}>
                        <Link className="flex flex-row flex-1" to={`/profile/${id}`}>
                            <ProfilePicture className="w-10 h-10 rounded-full" thumb uid={id}/>
                            <div className="ml-2">
                                <h3 className="font-semibold text-lg">{props.name}</h3>
                                <p className="text-gray-500 text-sm">{getMajor(props)}</p>
                            </div>
                        </Link>
                        {creatingRoom? "Loading..." : 
                        <IconButton
                            onClick={() => {
                                setMentorModalOpen(true);
                                setMentorSelected({ id, ...props });
                            }}
                            color="primary"
                            size="large">
                            <PersonAddTwoToneIcon/>
                        </IconButton>}
                    </div>
                    );})}
            </div>
            <div className="mt-auto"><Link to="/mentors" className="text-blue-700 underline text-xs">See all Mentors</Link></div>
            <MentorCardModal open={mentorModalOpen} setOpen={setMentorModalOpen} mentorSelected={mentorSelected}/>
        </div>
    );
}
