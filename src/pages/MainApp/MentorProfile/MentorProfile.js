import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, storage, functions } from '../../../config/firebase';
import { useAuth } from '../../../hooks/useAuth';
import Button from '@material-ui/core/Button'
import './MentorProfile.css';

const MentorProfile = () => {
    const { mentorId } = useParams();
    const [mentor, setMentor] = useState();
    const [profPic, setProfPic] = useState();

    const { user } = useAuth();

    useEffect(() => {
        return db.doc(`users/${mentorId}`).onSnapshot(async snap => {
            setMentor(snap.data());
            setProfPic(await storage.ref(`/profilepics/${mentorId}.png`)?.getDownloadURL());
        })
    }, [mentorId]);


    const connectWithMentor = async () => {
        /* So first check if a chat room with only both users exists, if it does, instantly redirect to that room. (redirect to /main-app/messages/${roomId}) 
        If not, create a room with the mentorId and the current user Id, then add that room to the user's document AND the mentor's document in the database, and then redirect to 
        that room (redirect to /main-app/messages/${roomId}) */

        // mentor?.rooms.forEach((roomId) => {
        //     db.doc(`rooms/${roomId}`).get().then(snap => {

        //         //I need to check if the user is in the room with the mentor, AND if there are only 2 people in that room --> Redirect to main-app/messages/${roomId}
        //         //Create a room with mentor Id and current user Id, then add room id into mentor and current user's document, then Redirect to /main-app/messages/${roomId}

        //         const snapData = snap.data();
        //         const isConnected = areTheyConnected(snapData);
        //     })
        // })

        //So now we pass mentorId and userId to backend, it returns the created/already existed room id. And then front end redirects from there.

        await functions.httpsCallable('createRoom')({ mentorId, userId : user.id })
            .catch((error) => {
                console.error(error)
            })
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
