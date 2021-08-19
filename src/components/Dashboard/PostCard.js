import { useState, useEffect, useRef, useLayoutEffect } from 'react';
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
import { EditOutlined, Favorite } from '@material-ui/icons';
import { PostComments } from './PostComments';
import history from '../../hooks/history';

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
    const [showComments, setShowComments] = useState(false);
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
    }, [post?.id]);

    useEffect(async () => {
        if (!user?.uid) return;
        return db.doc(`posts/${id}/likes/${user.uid}`).onSnapshot(snap => {
            const { liked } = snap.data() || {};
            setUserLiked(liked || false)
        })
    }, [user?.uid]);

    const handleUserLikePost = async () => {
        if (!user?.uid) return;
        if(!userLiked) await db.doc(`posts/${id}/likes/${user.uid}`).set({
            liked: true,
            likeUser: user.uid,
            _createdOn: firebase.firestore.FieldValue.serverTimestamp()
        })
        if(userLiked) await db.doc(`posts/${id}/likes/${user.uid}`).delete()
    }

    const handleDeletePost = () => {
        db.doc(`posts/${post.id}`).delete()
    }

    const PostAction = ({ IconComponent, label, active, activeColours,icon_colour, colours, ...props }) => {
        return <button className={`inline-flex items-center px-4 py-1 border border-transparent ${active?activeColours:colours} hover:shadow-sm text-base leading-6 font-medium rounded-md transition ease-in-out duration-150 cursor-pointer`} {...props}>
            <IconComponent className={`w-8 h-8 mr-1 ${icon_colour}`} />
            <span className="text-gray-500">{label}</span>
        </button>
    }

    return loading ?
        <div className="py-4 px-6 bg-white rounded-lg shadow-lg flex-1">
            <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-gray-300 h-12 w-12"></div>
                <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-gray-300 rounded w-3/12"></div>
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-300 rounded"></div>
                        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                    </div>
                </div>
            </div>
        </div> :
        <div className="py-4 px-6 bg-white rounded-xl shadow-lg overflow-hidden space-y-2">
            <div className="post-author_container w-full">
                <div className="flex flex-row flex-1 items-center cursor-pointer" onClick={e => history.push(`/app/profile/${author}`)}>
                    <ProfilePicture uid={author} className="shadow-md bg-blue-400 overflow-hidden h-12 w-12 rounded-full" />
                    <div className="flex-1 space-y-2 py-1 ml-2">
                        <div className="text-xl font-medium">{authorProfile.name}</div>
                        {_createdOn && <div className="post-timestamp_text"><TimeAgo date={_createdOn.toDate().getTime()} /></div>}
                    </div>
                </div>
                {(user?.uid == author) && <div>
                    <IconButton aria-label="delete" className="float-right" onClick={handleDeletePost}>
                        <DeleteIcon className="text-red-600" />
                    </IconButton>
                    <IconButton aria-label="delete" className="float-right">
                        <EditOutlined className="text-blue-600" />
                    </IconButton>
                </div>}
            </div>
            <div>
                <MDEditor defaultValue={body} readOnly={true} />
            </div>
            <div className="flex flex-row">
                <PostAction 
                    activeColours="bg-red-100 hover:bg-red-200 text-red-500"
                    colours="bg-white hover:bg-red-100 text-gray-500"
                    icon_colour="text-red-500"
                    IconComponent={Favorite} 
                    onClick={handleUserLikePost} 
                    label={"Like" + (likeCount? ("\t" + likeCount):"")} 
                    active={userLiked}/>
                <PostAction 
                    activeColours="bg-green-100 hover:bg-green-200 text-green-500"
                    colours="bg-white hover:bg-green-100 text-gray-500"
                    icon_colour="text-green-500"
                    IconComponent={MessageIcon} 
                    onClick={() => setShowComments(!showComments)}
                    label={"Comment" + (commentCount? ("\t" + commentCount):"")} 
                    active={showComments}/>
            </div>
            {showComments && <PostComments post={post} />}
        </div>

}

export default PostCard;
