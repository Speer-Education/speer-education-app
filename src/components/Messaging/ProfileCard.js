import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { db } from "../../config/firebase"; 
import ProfilePicture from "../User/ProfilePicture";

const ProfileCard = ({ uid }) => {
    const { userDetails, user } = useAuth();
    const [details, setDetails] = useState({});
    const { name , major, school } = details || {};

    useEffect(() => {
        if(!user) return;
        return db.doc(`users/${uid}`).onSnapshot(snap => {
            setDetails({
                id: snap.id,
                ...snap.data()
            })
        })
    }, [user, uid]);

    return <div className="p-3 m-2 shadow-lg rounded-md bg-white space-y-3">
        <div className="flex flex-row space-x-2 items-center">
            <ProfilePicture uid={uid} alt="user" className="w-28 h-28 rounded-full border-white border-8 border-solid shadow-lg"/>
            <div className="space-y-1">
                <h3 className="font-medium">{name}</h3>
                <p className="text-md text-gray-600">{details?.isMtr?"Mentor":"Mentee"} @ {school}</p>
            </div>
        </div>
        <div>
            <h3 className="text-gray-500 mb-2">{name}'s Education</h3>
            <div className="p-3 rounded-lg shadow-lg space-y-2">
                <h3>{major}</h3>
                <p>{school}</p>
            </div>
        </div>
    </div>
}   

export default ProfileCard