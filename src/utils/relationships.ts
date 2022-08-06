import { firebase, db } from "../config/firebase"
import {UserID} from '../types/User';
import {RoomID} from '../types/Messaging';
import { deleteDoc, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

/**
 * 
 * @param {string} followerUid The UID of the current user or the user initiating the following function
 * @param {string} followingUid The UID of the recieving user of the following function who is being followed
 * @param {string} roomId The UID of the private room the user is in
 */
 const followUser = (followerUid: UserID, followingUid: UserID, roomId: RoomID) => {
    return setDoc(doc(db, 'relationships', `${followerUid}_${followingUid}`), {
        followerId: followerUid,
        followedId: followingUid,
        roomId: roomId,
        createdAt: serverTimestamp()
    },{merge: true})
}

/**
 * Get the private room of the users
 * @param {string} followerUid The UID of the current user or the user initiating the following function
 * @param {string} followingUid The UID of the recieving user of the following function who is being followed
 */
const getRoomId = async (followerUid: UserID, followingUid: UserID) => {
    const snap = await getDoc(doc(db, 'relationships', `${followerUid}_${followingUid}`))
    if(!snap.exists) return;
    return snap.data()?.roomId
}

/**
 * 
 * @param {string} followerUid The UID of the current user or the user initiating the following function
 * @param {string} followingUid The UID of the user that is being unfollowed
 */
const unfollowUser = (followerUid: UserID, followingUid: UserID) => {
    return deleteDoc(doc(db, 'relationships', `${followerUid}_${followingUid}`))
}

export {followUser, getRoomId, unfollowUser} 