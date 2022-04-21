import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../config/firebase';
import ProfilePicture from '../User/ProfilePicture';
import { useAuth } from '../../hooks/useAuth';

export default function ContactsSidebar({ profileId, userDetails, isUser }) {

    const [followers, setFollowers] = useState([]);
    const { user } = useAuth();
    const [followersLoaded, setFollowersLoaded] = useState(false);

    //Get list of all contacts from firestore
    //TODO: Limit to how many contacts we can display.
    useEffect(() => {
        if(!user || !profileId) return;
        setFollowersLoaded(false)
        let ref = db.collection('relationships').where('followedId','==', profileId);
        return ref.onSnapshot(async snapshot => {
            let list = await Promise.all(snapshot.docs.map(async doc => {
                const { followedId, followerId } = doc.data();
                //Get user data from firestore
                const userRef = db.collection('users').doc(followerId);
                const userData = await userRef.get();

                return {id: userData.id, ...userData.data()}
            }));
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
        <div className="flex flex-col flex-1 p-3 m-2 shadow-lg rounded-md bg-white overflow-y-auto">
            <p>{isUser?"Your":`${userDetails.name}'s` || ""} Contacts</p>
            {followers.map(({ id, name, school, major, bio }) => { 
                return (<div className="flex flex-row py-2 transition-colors hover:bg-gray-100" key={id}>
                <Link className="flex flex-row flex-1" to={`/profile/${id}`}>
                    <ProfilePicture className="w-10 h-10 rounded-full" uid={id}/>
                    <div className="ml-2">
                        <h3 className="font-medium">{name}</h3>
                        <p className="text-gray-500 text-sm">{major}</p>
                    </div>
                </Link>
            </div>)})}
        </div>
    )
}
