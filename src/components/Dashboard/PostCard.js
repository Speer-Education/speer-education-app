import { useState, useEffect } from 'react';
import { MDEditor } from '../Blog/Editor/mdeditor';
import { db, storage, firebase } from '../../config/firebase';
import ProfilePicture from '../User/ProfilePicture';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import MessageIcon from '@material-ui/icons/Message';
import TimeAgo from 'react-timeago';
import './PostCard.css';
import { useAuth } from '../../hooks/useAuth';

/**
 * Creates the post card for this post
 * @component
 * @param {*} param0 
 * @returns 
 */
const PostCard = ({ post }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [authorProfile, setAuthorProfile] = useState({});
    const [userLiked, setUserLiked] = useState(false);
    const { author, body, likeCount, commentCount, id, _createdOn } = post;

    //Attach listener on the author
    //TODO: should have author details in post
    useEffect(async () => {
        setLoading(true); //BLock view of anything if author is loading
        if (!post) return;
        return db.doc(`users/${author}`).onSnapshot(snap => {
            setAuthorProfile(snap.data())
            setLoading(false)
        })
    }, [post]);

    useEffect(async () => {
        if (!user?.uid) return;
        return db.doc(`posts/${id}/likes/${user.uid}`).onSnapshot(snap => {
            const { liked } = snap.data() || {};
            setUserLiked(liked || false)
        })
    }, [user?.uid]);

    const handleUserLikePost = async () => {
        if (!user?.uid) return;
        await db.doc(`posts/${id}/likes/${user.uid}`).set({
            liked: true,
            likeUser: user.uid,
            _createdOn: firebase.firestore.ServerValue.serverTimestamp()
        })
    }

    const handleDeletePost = () => {
        db.doc(`posts/${post.id}`).delete()
    }

    const PostAction = ({ IconComponent, label, ...props }) => {
        return <button className="inline-flex items-center px-4 py-1 border border-transparent bg-white hover:bg-gray-100 hover:shadow-sm text-base leading-6 font-medium rounded-md text-gray-500 transition ease-in-out duration-150" {...props}>
            <IconComponent className="w-8 h-8 mr-1" />
            {label}
        </button>
    }

    return loading ?
        <div class="py-4 px-6 m-2 bg-white rounded-lg shadow-lg w-screen max-w-4xl">
            <div class="animate-pulse flex space-x-4">
                <div class="rounded-full bg-gray-300 h-12 w-12"></div>
                <div class="flex-1 space-y-4 py-1">
                    <div class="h-4 bg-gray-300 rounded w-3/12"></div>
                    <div class="space-y-2">
                        <div class="h-4 bg-gray-300 rounded"></div>
                        <div class="h-4 bg-gray-300 rounded w-5/6"></div>
                    </div>
                </div>
            </div>
        </div> :
        <div className="py-4 px-6 m-2 bg-white rounded-lg shadow-lg">
            <div className="post-author_container w-full">
                <div className="flex flex-row flex-1 items-center">
                    <ProfilePicture uid={author} className="shadow-md bg-blue-400 overflow-hidden h-12 w-12 rounded-full" />
                    <div className="flex-1 space-y py-1 ml-2">
                        <div className="text-xl">{authorProfile.name}</div>
                        <div className="author-details_school">{authorProfile.major.label}@{authorProfile.school}</div>
                        {_createdOn && <div className="post-timestamp_text">Posted <TimeAgo date={_createdOn.toDate().getTime()} /></div>}
                    </div>
                </div>
                {(user?.uid == author) && <div>
                    <IconButton aria-label="delete" className="float-right" onClick={handleDeletePost}>
                        <DeleteIcon className="text-red-600" />
                    </IconButton>
                </div>}
            </div>
            <MDEditor defaultValue={body} readOnly={true} />
            <div className="flex flex-row">
                <PostAction IconComponent={ThumbUpAltIcon} onClick={handleUserLikePost} label={"Like " + (likeCount || "")} />
                <PostAction IconComponent={MessageIcon} label="Comment" />
            </div>
        </div>

}

export default PostCard;
