import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { db, storage, functions } from '../../../config/firebase';
import { useParams } from 'react-router-dom';
import history from '../../../hooks/history';
import {Helmet} from "react-helmet";

function ProfilePage() {
    const { profileId } = useParams();
    const [profileUser, setProfileUser] = useState();
    const [profPic, setProfPic] = useState();
    const [isMentor, setIsMentor] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        return db.doc(`users/${profileId}`).onSnapshot(async snap => {
            console.log(snap.data())
            setProfileUser(snap.data());
            setProfPic(await storage.ref(`/profilepics/${profileId}.png`)?.getDownloadURL());

            if (snap.data().isMtr){
                setIsMentor(true)
            }

            setLoading(false);
        })

    }, [profileId])

    const connectWithPerson = async () => {
        // Send person Id to backend for room creation, or to just use the room that alr existed.

        //We can use this existing function, but maybe change the backend because rn the backend is destructuring it as mentorId, 
        //so make the backend destructure as profileId, and change the mentor said to put it in as profileId as well.
        let { data: targetRoomId } = await functions.httpsCallable('createRoom')({ profileId })
            .catch((error) => {
                console.error(error)
            })
        history.push(`/app/messages/${targetRoomId}`)
    }

    return (
        <div className="profilePage">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Your Profile | Speer Education</title>
            </Helmet>
            {/* Redirects the user to the mentor page if user is a mentor */}
            {isMentor? <Redirect to={`/app/mentors/${profileId}`}></Redirect> : null}
            {!loading ? <> <img src={profPic} alt="profile"></img>
            Name: {profileUser?.name}
            <br/>
            Grade: {profileUser?.grade.label}
            <br/>
            Plans to Major In: {profileUser?.major.label}
            <br/>
            Bio: {profileUser?.bio}
            <button onClick={connectWithPerson}>Connect With Person</button></> : null }
        </div>
    )
}

export default ProfilePage
