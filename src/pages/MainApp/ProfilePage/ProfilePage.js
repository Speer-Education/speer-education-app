import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db, storage } from '../../../config/firebase';
import { useParams } from 'react-router-dom';


function ProfilePage() {
    const { profileId } = useParams();
    const [profileUser, setProfileUser] = useState();
    const [profPic, setProfPic] = useState();
    const [isMentor, setIsMentor] = useState(false);

    useEffect(() => {
        return db.doc(`users/${profileId}`).onSnapshot(async snap => {
            console.log(snap.data())
            setProfileUser(snap.data());
            setProfPic(await storage.ref(`/profilepics/${profileId}.png`)?.getDownloadURL());

            if (snap.data().isMtr){
                setIsMentor(true)
            }
        })

    }, [profileId])

    console.log(profileUser)
    console.log(profPic)

    return (
        <div className="profilePage">
            Name: {profileUser?.name}
            <br/>
            Grade: {profileUser?.grade.label}
            <br/>
            Plans to Major In: {profileUser?.major.label}
            <br/>
            Bio: {profileUser?.bio}
            {isMentor? <div> This user is also a mentor, click <Link to={`/app/mentors/${profileId}`}>HERE</Link> to see their mentor profile</div> : null}
        </div>
    )
}

export default ProfilePage
