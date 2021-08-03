import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, storage, functions } from '../../../config/firebase';
import { useAuth } from '../../../hooks/useAuth';
import Button from '@material-ui/core/Button'
import './MentorProfile.css';
import Loader from '../../../components/Loader/Loader';
import history from '../../../hooks/history';
import { Helmet } from "react-helmet";

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
            {loading ? <Loader /> : <>
                {/* *Insert Photo (Have to search storage for it) */}
                <img src={profPic} alt="mentor profile" />
                <h1>{mentor?.name}</h1>
                <h2>{mentor?.school}</h2>
                <h2>{mentor?.major}</h2>
                <p>{mentor?.bio}</p>
                <button type="button" className={`inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white ${creatingRoom? "bg-red-600 hover:bg-red-500 focus:border-red-700 active:bg-red-700": "bg-blue-600 hover:bg-blue-500 focus:border-blue-700 active:bg-blue-700"} transition ease-in-out duration-150`}
                    disabled={creatingRoom} 
                    onClick={connectWithMentor}>
                    {creatingRoom ? 
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg> : null}
                    {creatingRoom? "Processing" : "Connect With Mentor"}
                </button>
            </>}
        </div>
    );
}

export default MentorProfile;
