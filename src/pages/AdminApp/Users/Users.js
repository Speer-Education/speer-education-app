import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ReactTimeago from 'react-timeago';
import ProfilePicture from '../../../components/User/ProfilePicture';
import { db, rtdb } from '../../../config/firebase';
import { useAuth } from '../../../hooks/useAuth';

const UserCard = ({ uid, userDetails }) => {
    const { user } = useAuth();
    const [userState, setUserState] = useState({});
    const { name, email, country, major, hsGradYear, isMtr } = userDetails;
    const { state, last_changed, version } = userState || {};
    useEffect(() => {
        if(!user) return;
        //Get user status
        rtdb.ref(`status/${uid}`).on('value', snapshot => {
            setUserState(snapshot.val());
        });
    }, [userDetails, uid]);

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
                    db.collection('user_claims')
                        .doc(uid)
                        .update({ isMtr: true})
                }}>Make Mentor</Button>}
            </div>
        </div>
    )
};


const Users = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [latestVersion, setLatestVersion] = useState(0);
    useEffect(() => {
        if (!user) return;

        db.collection('users')
            .orderBy('name')
            .onSnapshot(snapshot => {
                setUsers(snapshot.docs.map(doc => (
                    { id: doc.id, ...doc.data() }
                )));
            });
    }, [user]);

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
                {users.map(userDetails => (
                    <UserCard key={user.id} uid={userDetails.id} userDetails={userDetails} />
                ))}
            </div>
            
        </div>
    );
}

export default Users;
