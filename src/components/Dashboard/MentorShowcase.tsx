import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {db, docConverter, publicUserCollection} from '../../config/firebase';
import ProfilePicture from '../User/ProfilePicture';
import PersonAddTwoToneIcon from '@mui/icons-material/PersonAddTwoTone';
import { IconButton } from '@mui/material';
import './MentorShowcase.css';
import { useAuth } from '../../hooks/useAuth';
import MentorCardModal from '../Modal/MentorCardModal';
import {UserDetails, MentorDetailsDocument} from '../../types/User';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query, where } from 'firebase/firestore';
import {getMajor} from '../../utils/user';
import { useSpeerOrg } from '../../hooks/useSpeerOrg';
export default function MentorShowcase() {
    const { orgId } = useSpeerOrg();
    const [mentors = [], loading, error] = useCollectionData<MentorDetailsDocument>(query(publicUserCollection, where('permissions.isMtr','==',true), ...(orgId != 'global')?[where('organization', '==', orgId)]:[], orderBy('_firstLogin','desc')));
    const [creatingRoom, setCreatingRoom] = useState(false);
    const [mentorSelected, setMentorSelected] = useState<MentorDetailsDocument>();
    const [mentorModalOpen, setMentorModalOpen] = useState(false);
    const { user } = useAuth();

    if(error) console.error(error)
    
    //Loads the mentors in mentor collection
    const userMentors = useMemo<MentorDetailsDocument[]>(() => {
        if(!user) return [];
        else return mentors.slice().filter(({stats: { connectedMentees=[] }, id}) => !connectedMentees.includes(user.uid) && id != user.uid)
    }, [mentors, user]);

    if(userMentors.length === 0) return (
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
                {userMentors.map(({ id, ...props }) => { 
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
