import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, storage, functions } from '../../../config/firebase';
import { useAuth } from '../../../hooks/useAuth';
import Button from '@material-ui/core/Button'
import './MentorProfile.css';
import Loader from '../../../components/Loader/Loader';
import history from '../../../hooks/history';
import {Helmet} from "react-helmet";

const MentorProfile = () => {
    const { mentorId } = useParams();
    const [mentor, setMentor] = useState();
    const [profPic, setProfPic] = useState();
    const [creatingRoom, setCreatingRoom] = useState(false);
    const [loading, setLoading] = useState(true);

    const { user } = useAuth();

    //Getting the data on the mentor
    useEffect(() => {
        setLoading(true)
        console.log(`mentors/${mentorId}`)
        return db.doc(`mentors/${mentorId}`).onSnapshot(async snap => {
            console.log(snap.data())
            setMentor(snap.data());
            setProfPic(await storage.ref(`/profilepics/${mentorId}.png`)?.getDownloadURL());
            setLoading(false)
        })
    }, [mentorId]);


    const connectWithMentor = async () => {
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
        <div className="mentorProfile">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Mentor Profile | Speer Education</title>
            </Helmet>
            {loading ? <Loader />: <>
                {/* *Insert Photo (Have to search storage for it) */}
                <img src={profPic} alt="mentor profile" />
                <h1>{mentor?.name}</h1>
                <h2>{mentor?.school}</h2>
                <h2>{mentor?.major.label}</h2>
                <p>{mentor?.bio}</p>
                <Button varient="default" disabled={creatingRoom} onClick={connectWithMentor}>{creatingRoom ? <Loader /> : "Connect With Mentor!"}</Button>
            </>}
        </div>
    );
}

export default MentorProfile;
