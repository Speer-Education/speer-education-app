import { Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db, functions, firebase } from '../../config/firebase';
import ProfilePicture from '../User/ProfilePicture';
import PersonAddTwoToneIcon from '@material-ui/icons/PersonAddTwoTone';
import { IconButton } from '@material-ui/core';
import './MentorShowcase.css';
import { useAuth } from '../../hooks/useAuth';
import { followUser } from '../../utils/relationships';
import history from '../../hooks/history';
import { getMessageUserRoom } from '../../utils/chats';

export default function MentorShowcase() {

    const [mentors, setMentors] = useState([]);
    const [creatingRoom, setCreatingRoom] = useState(false);
    const { user } = useAuth();
    
    //Loads the mentors in mentor collection
    useEffect(async () => {
        return db.collection('mentors').orderBy('_updatedOn','desc').onSnapshot(snap => {
            const allMentors = snap.docs.map( doc => {
                return { id: doc.id, ...doc.data()}
            })
            setMentors(allMentors.filter(({connectedMentees, id}) => !connectedMentees.includes(user?.uid) && id != user?.uid))
        })
    }, [])


    const connectWithMentor = async (mentorId) => {
        setCreatingRoom(true);

        const targetRoomId = await getMessageUserRoom(mentorId, user.uid)
        history.push(`/app/messages/${targetRoomId}`)
    }

    if(mentors.length == 0) return (
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
                {mentors.map(({ id, name, school, connectedMentees, major, bio }) => { 
                    return (<div className="flex flex-row py-2 hover:bg-gray-100" key={id}>
                    <Link className="flex flex-row flex-1" to={`/app/profile/${id}`}>
                        <ProfilePicture className="w-10 h-10 rounded-full" thumb uid={id}/>
                        <div className="ml-2">
                            <h3 className="font-medium">{name}</h3>
                            <p className="text-gray-500">{major}</p>
                        </div>
                    </Link>
                    {creatingRoom? "Loading..." : 
                    <IconButton onClick={() => connectWithMentor(id)} color="primary">
                        <PersonAddTwoToneIcon/>
                    </IconButton>}
                </div>)})}
            </div>
            <div className="mt-auto"><Link to="/app/mentors" className="text-blue-700 underline text-xs">See all Mentors</Link></div>
        </div>
    )
}
