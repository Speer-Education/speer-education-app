import { Button } from '@mui/material';
import { collection, doc, orderBy, query, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ReactTimeago from 'react-timeago';
import ProfilePicture from '../../../components/User/ProfilePicture';
import { db, docConverter, rtdb } from '../../../config/firebase';
import { useAuth } from '../../../hooks/useAuth';
import { UserDetails, UserDetailsDocument } from '../../../types/User';
import { useObjectVal } from 'react-firebase-hooks/database';
import { ref } from 'firebase/database';

const UserCard = ({ uid, userDetails }) => {
    const { user } = useAuth();
    const [userState, loading, error] = useObjectVal(ref(rtdb, 'status/'+ uid));
    const { name, email, country, major, hsGradYear, isMtr } = userDetails;
    const { state, last_changed, version } = userState || {};

    return (
        <div className="p-4 bg-white rounded-xl shadow-md flex flex-row space-x-2">
            <ProfilePicture uid={uid} forceRefresh className="w-16 h-16 rounded-full shadow-md border-6 border-solid border-white"/>
            <div className="flex-1">
                <h2 className="text-lg">{name}</h2>
                <p className="text-gray-500">User {state} since <ReactTimeago date={last_changed} /></p>
                <p className="text-gray-500">Site Version: {version}</p>
            </div>
            <div className="flex-1">
                <p className="text-gray-500"><span className="text-gray-700 font-semibold">User is </span>{isMtr?'Mentor': 'User'}</p>
            </div>
            <div>
                {!isMtr && <Button variant="outlined" onClick={() => {
                    updateDoc(doc(db, 'user_claims', uid), {isMtr: true})
                }}>Make Mentor</Button>}
                {isMtr && <Button variant="outlined" style={{borderColor: "red"}} onClick={() => {
                    updateDoc(doc(db, 'user_claims', uid), {isMtr: false})
                }}>REMOVE Mentor</Button>}
            </div>
        </div>
    )
};


const Users = () => {
    const { user } = useAuth();
    const [latestVersion, setLatestVersion] = useState(0);
    const [users = [], loading, error] = useCollectionData<UserDetailsDocument>(query(collection(db, 'users').withConverter(docConverter), orderBy('name')))
    
    useEffect(() => {
        fetch('https://imjustchew.npkn.net/check-outdated-speer')
            .then(response => response.json())
            .then(({versions}) => {
                setLatestVersion(versions[0]);
            })
            .catch(console.error);
    },[])

    return (
        <div className="p-4">
            <div className="px-6 py-12">
                <h1>Users</h1>
            </div>
            <div className="flex flex-row">
                <div>
                    <h3>Latest Site Version</h3>
                    <p className="text-gray-500 text-xl">{latestVersion}</p>
                </div>
            </div>
            <div className="flex flex-col space-y-3">
                {users.map(userDetails => (<>
                    {userDetails && <UserCard key={userDetails.id} uid={userDetails.id} userDetails={userDetails} />}
                </>))}
            </div>
            
        </div>
    );
}

export default Users;
