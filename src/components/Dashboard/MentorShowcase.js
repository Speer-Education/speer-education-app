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

export default function MentorShowcase() {

    const [mentors, setMentors] = useState([]);
    const [creatingRoom, setCreatingRoom] = useState(false);
    const { user } = useAuth();
    
    //Loads the mentors in mentor collection
    useEffect(() => {

        //This algorithm will generate at most 3 and at least 1 mentor to showcase. It generates a random id and takes the 3 above it, or the 3 below it if there
        //are none above it. So at the very least it will get 1, and at the very most it gets 3.
        const mentors = db.collection('mentors');

        const key = mentors.doc().id;//generate random id

        mentors.where(firebase.firestore.FieldPath.documentId(), '>=', key).limit(3).get()
            .then(snap => {
                //It has to find at least 1.
                if(snap.size > 0) {
                    setMentors(
                        snap.docs.map(doc => {
                            return { id: doc.id, ...doc.data() }
                        })
                    )
                //Use the other direction since didn't find any above.
                } else {
                    const mentor = mentors.where(firebase.firestore.FieldPath.documentId(), '<', key).limit(3).get()
                        .then(snap => {
                            setMentors(
                                snap.docs.map(doc => {
                                    return { id: doc.id, ...doc.data() }
                                })
                            )
                        })
                        .catch(err => {
                            console.log('Error getting documents', err);
                        });
                }
            })

    }, [])


    // const handleAddMentor = async (mentorId) => {
    //     if(!user?.uid) return; //Check if user has loaded
    //     await followUser(user.uid, mentorId)
    //     console.log('followed user')
    // }

    const connectWithMentor = async (mentorId) => {
        /* Send Mentor ID to backend for checking and room creation */

        setCreatingRoom(true);

        //send it in as profile id instead of mentor id (will need to change the backend so this still works)
        let { data: targetRoomId } = await functions.httpsCallable('createRoom')({ profileId: mentorId })
            .catch((error) => {
                console.error(error)
            })
        history.push(`/app/messages/${targetRoomId}`)
    }

    return (
        <div className="mentorShowcase">
            <p>New Mentors To Find</p>
            {/* Randomly generates 2 mentors in random order*/}
            {mentors.map(({ id, name, school, major, bio }) => <div className="flex flex-row py-2 ">
                <Link className="flex flex-row flex-1" to={`/app/profile/${id}`}>
                    <ProfilePicture className="w-10 h-10 rounded-full" uid={id}/>
                    <div className="ml-2">
                        <h3 className="font-medium">{name}</h3>
                        <p>{major.label}</p>
                    </div>
                </Link>
                {creatingRoom? "Loading..." : 
                <IconButton onClick={() => connectWithMentor(id)}>
                    <PersonAddTwoToneIcon/>
                </IconButton>}
            </div>)}
        </div>
    )
}
