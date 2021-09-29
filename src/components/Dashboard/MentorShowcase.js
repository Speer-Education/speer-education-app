import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../config/firebase';
import ProfilePicture from '../User/ProfilePicture';
import PersonAddTwoToneIcon from '@mui/icons-material/PersonAddTwoTone';
import { IconButton } from '@mui/material';
import './MentorShowcase.css';
import { useAuth } from '../../hooks/useAuth';
import history from '../../hooks/history';
import MentorCardModal from '../Modal/MentorCardModal';

export default function MentorShowcase() {

    const [mentors, setMentors] = useState([]);
    const [creatingRoom, setCreatingRoom] = useState(false);
    const [mentorSelected, setMentorSelected] = useState();
    const [mentorModalOpen, setMentorModalOpen] = useState(false);
    const { user } = useAuth();
    
    //Loads the mentors in mentor collection
    useEffect(async () => {
        return db.collection('mentors').orderBy('_updatedOn','desc').onSnapshot(snap => {
            const allMentors = snap.docs.map( doc => {
                return { id: doc.id, ...doc.data()}
            })
            setMentors(allMentors.filter(({connectedMentees, id}) => !connectedMentees.includes(user?.uid) && id != user?.uid))
        })
    }, [user?.uid])

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
                                <p className="text-gray-500 text-sm">{props.major}</p>
                            </div>
                        </Link>
                        {creatingRoom? "Loading..." : 
                        <IconButton
                            onClick={() => {
                                setMentorModalOpen(true);
                                setMentorSelected({id: id, ...props});
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
