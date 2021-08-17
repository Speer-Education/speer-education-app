import { firebase, db } from "../config/firebase"

/**
 * 
 * @param {string} followerUid The UID of the current user or the user initiating the following function
 * @param {string} followingUid The UID of the recieving user of the following function who is being followed
 * @param {string} roomId The UID of the private room the user is in
 */
 const followUser = (followerUid, followingUid, roomId) => {
    return db.doc(`relationships/${followerUid}_${followingUid}`).set({
        followerId: followerUid,
        followedId: followingUid,
        roomId: roomId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    },{merge: true})
}

/**
 * Get the private room of the users
 * @param {string} followerUid The UID of the current user or the user initiating the following function
 * @param {string} followingUid The UID of the recieving user of the following function who is being followed
 */
const getRoomId = async (followerUid, followingUid) => {
    const snap = await db.doc(`relationships/${followerUid}_${followingUid}`).get()
    if(!snap.exists) return;
    return snap.data()?.roomId
}

/**
 * 
 * @param {string} followerUid The UID of the current user or the user initiating the following function
 * @param {string} followingUid The UID of the user that is being unfollowed
 */
const unfollowUser = (followerUid, followingUid) => {
    return db.doc(`relationships/${followerUid}_${followingUid}`).delete()
}

export {followUser, getRoomId, unfollowUser} 