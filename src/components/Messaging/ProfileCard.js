import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { db } from "../../config/firebase"; 
import UserSmallProfileCard from "../User/UserSmallProfileCard";

const ProfileCard = ({ uid }) => {
    const { user } = useAuth();
    const [details, setDetails] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!user) return;
        setLoading(true)
        return db.doc(`users/${uid}`).onSnapshot(snap => {
            setDetails({
                id: snap.id,
                ...snap.data()
            })
            setLoading(false)
        })
    }, [user, uid]);

    if(loading) return <div className="p-3 m-2 shadow-lg rounded-md bg-white bg-opacity-90 space-y-6">
        <h3 className="text-gray-500">Loading</h3>
    </div> 
    return <UserSmallProfileCard uid={uid} userDetails={details}/>
}   

export default ProfileCard