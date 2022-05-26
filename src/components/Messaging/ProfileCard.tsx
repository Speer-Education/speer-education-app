//@ts-nocheck
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { db } from "../../config/firebase"; 
import UserSmallProfileCard from "../User/UserSmallProfileCard";

const ProfileCard = ({ uid, roomExists }) => {
    const { user } = useAuth();
    const [details, setDetails] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //If no user, or room doesn't exist, then return
        if(!user || !roomExists) return;
        setLoading(true)
        return db.doc(`usersPublic/${uid}`).onSnapshot(snap => {
            setDetails({
                id: snap.id,
                ...snap.data()
            })
            setLoading(false)
        })
    }, [user, uid, roomExists]);

    if(loading || !roomExists) return <div className="p-3 m-2 shadow-lg rounded-md bg-white bg-opacity-90 space-y-6">
        <h3 className="text-gray-500">{roomExists? "Loading" : "N/A"}</h3>
    </div> 
    return <UserSmallProfileCard uid={uid} userDetails={details} />
}   

export default ProfileCard