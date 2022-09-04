import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db, docConverter } from '../../config/firebase';
import ProfilePicture from '../User/ProfilePicture';
import { useAuth } from '../../hooks/useAuth';
import {PublicUser, PublicUserDoc, UserID, } from '../../types/User';
import { getMajor } from '../../utils/user';
import { collection, doc, getDoc, getDocFromCache, onSnapshot, query, where } from 'firebase/firestore';

export default function ContactsSidebar({ profileId, userDetails, isUser }: { profileId: UserID, userDetails: PublicUser, isUser?: boolean }) {

    const [followers, setFollowers] = useState<PublicUserDoc[]>([]);
    const { user } = useAuth();
    const [followersLoaded, setFollowersLoaded] = useState(false);

    //Get list of all contacts from firestore
    //TODO: Limit to how many contacts we can display.
    useEffect(() => {
        if(!user || !profileId) return;
        setFollowersLoaded(false)
        let ref = query(collection(db, 'relationships'), where('followedId','==', profileId));
        return onSnapshot(ref, async snapshot => {
            let list = await Promise.all(snapshot.docs.map(async docSnap => {
                const { followerId } = docSnap.data();
                //Get user data from firestore
                const userRef = doc(db, 'usersPublic', followerId).withConverter(docConverter);
                const userData = await getDocFromCache(userRef).catch(() => {
                    return getDoc(userRef)
                });

                return userData.data() as Partial<PublicUserDoc>
            })) as PublicUserDoc[];
            setFollowers(list);
            setFollowersLoaded(true)
        })
    }, [profileId, user?.uid])

    if(!followersLoaded || followers.length === 0) {
        return (
            <div className="flex-1 m-2 shadow-lg rounded-md bg-white h-full p-3 grid place-items-center">
                {/* TOOD: Add No Recent Chats Icon */}
                <h2 className="text-gray-500">{followersLoaded? "No Contacts": "Loading Contacts..."}</h2>
            </div>
        ) 
    }

    return (
        <div className="flex flex-col flex-1 py-3 shadow-lg rounded-md bg-white overflow-y-auto">
            <p className='px-3'>{isUser?"Your":`${userDetails.name}'s` || ""} Contacts</p>
            {followers.map((user) => {
                const { id, name } = user; 
                return (<div className="flex flex-row py-2 transition-colors hover:bg-gray-100 px-3" key={id}>
                <Link className="flex flex-row flex-1" to={`/profile/${id}`}>
                    <ProfilePicture className="w-10 h-10 rounded-full" uid={id}/>
                    <div className="ml-2">
                        <h3 className="font-medium">{name}</h3>
                        <p className="text-gray-500 text-sm">{getMajor(user)}</p>
                    </div>
                </Link>
            </div>)})}
        </div>
    )
}
