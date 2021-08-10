import { firebase, db } from "../config/firebase"

/**
 * 
 * @param {string} followerUid The UID of the current user or the user initiating the following function
 * @param {string} followingUid The UID of the recieving user of the following function who is being followed
 */
export function followUser(followerUid, followingUid) {
    return db.doc(`relationships/${followerUid}_${followingUid}`).set({
        followerId: followerUid,
        followedId: followingUid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
}

/**
 * 
 * @param {string} followerUid The UID of the current user or the user initiating the following function
 * @param {string} followingUid The UID of the user that is being unfollowed
 */
export function unfollowUser(followerUid, followingUid) {
    return db.doc(`relationships/${followerUid}_${followingUid}`).delete()
}