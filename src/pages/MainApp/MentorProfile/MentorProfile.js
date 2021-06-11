import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, storage, functions } from '../../../config/firebase';
import { useAuth } from '../../../hooks/useAuth';
import Button from '@material-ui/core/Button'
import './MentorProfile.css';
import Loader from '../../../components/Loader/Loader';
import history from '../../../hooks/history';

const MentorProfile = () => {
    const { mentorId } = useParams();
    const [mentor, setMentor] = useState();
    const [profPic, setProfPic] = useState();
    const [creatingRoom, setCreatingRoom] = useState(false);

    const { user } = useAuth();

    useEffect(() => {

        console.log(`mentors/${mentorId}`)
        return db.doc(`mentors/${mentorId}`).onSnapshot(async snap => {
            console.log(snap.data())
            setMentor(snap.data());
            setProfPic(await storage.ref(`/profilepics/${mentorId}.png`)?.getDownloadURL());
        })
    }, [mentorId]);


    const connectWithMentor = async () => {
        /* Send Mentor ID to backend for checking and room creation */

        setCreatingRoom(true);
        let { data: targetRoomId } = await functions.httpsCallable('createRoom')({ mentorId })
            .catch((error) => {
                console.error(error)
            })
        history.push(`/main-app/messages/${targetRoomId}`)
    }

    return (
        <div className="mentorProfile">
            {/* *Insert Photo (Have to search storage for it) */}
            <img src={profPic} alt="mentor profile" />
            <h1>{mentor?.name}</h1>
            <h2>{mentor?.university}</h2>
            <h2>{mentor?.major}</h2>
            <p>{mentor?.description}</p>
            <Button varient="default" disabled={creatingRoom} onClick={connectWithMentor}>{creatingRoom ? <Loader /> : "Connect With Mentor!"}</Button>
        </div>
    );
}

export default MentorProfile;
