//@ts-nocheck
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { db, docConverter } from "../../config/firebase"; 
import UserSmallProfileCard from "../User/UserSmallProfileCard";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { PublicUserDoc } from "../../types/User";

const ProfileCard = ({ uid, roomExists }) => {
    const { user } = useAuth();
    const [details, loading, error] = useDocumentData<PublicUserDoc>(user && roomExists && doc(db, 'usersPublic', uid).withConverter(docConverter));

    if(loading || !roomExists) return <div className="p-3 m-2 shadow-lg rounded-md bg-white bg-opacity-90 space-y-6">
        <h3 className="text-gray-500">{roomExists? "Loading" : "N/A"}</h3>
    </div> 
    return <UserSmallProfileCard uid={uid} userDetails={details} />
}   

export default ProfileCard