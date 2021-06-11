import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, storage } from '../../../config/firebase';
import Button from '@material-ui/core/Button'
import './MentorProfile.css';

const MentorProfile = () => {
    const { mentorId } = useParams();
    const [mentor, setMentor] = useState();
    const [profPic, setProfPic] = useState();

    useEffect(() => {
        return db.doc(`users/${mentorId}`).onSnapshot(async snap => {
            setMentor(snap.data());
            setProfPic(await storage.ref(`/profilepics/${mentorId}.png`)?.getDownloadURL());
        })
    }, [mentorId]);


    const connectWithMentor = () => {
        /* So first check if a chat room with only both users exists, if it does, instantly redirect to that room. (redirect to /main-app/messages/${roomId}) 
        If not, create a room with the mentorId and the current user Id, then add that room to the user's document int he database, and then redirect to 
        that room (redirect to /main-app/messages/${roomId}) */
        console.log("redirects user to /main-app/messages/*generated roomId*")
    }

    return (
        <div className="mentorProfile">
            {/* *Insert Photo (Have to search storage for it) */}
            <img src={profPic} alt="mentor profile"/>
            <h1>{mentor?.name}</h1>
            <h2>{mentor?.university}</h2>
            <h2>{mentor?.major}</h2>
            <p>{mentor?.description}</p>
            <Button varient="default" onClick={connectWithMentor}>Connect With Mentor!</Button>            
        </div>
    );
}

export default MentorProfile;
