import { useState, useEffect, useRef } from 'react';
import { MDEditor } from '../Blog/Editor/mdeditor';
import { db, firebase } from '../../config/firebase';
import ProfilePicture from '../User/ProfilePicture';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import MessageIcon from '@material-ui/icons/Message';
import TimeAgo from 'react-timeago';
import './PostCard.css';
import { useAuth } from '../../hooks/useAuth';
import { EditOutlined, Favorite, Cancel } from '@material-ui/icons';
import { PostComments } from './PostComments';
import history from '../../hooks/history';
import useRefDimensions from '../../hooks/useRefDimensions';
import { Button } from '@material-ui/core';
import PostLoader from './PostLoader';

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
    const [postCollapsed, setPostCollapsed] = useState(false);
    const [oversizedPost, setOversizedPost] = useState(false);
    const { author, body, likeCount, commentCount, id, _createdOn } = post;
    const [saving, setSaving] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editedPostContent, setEditedPostContent] = useState(body);

    const divRef = useRef()
    const dimensions = useRefDimensions(divRef)

    // useEffect(() => {
    //     if(dimensions.height > 500 && !oversizedPost){
    //         setPostCollapsed(true);
    //         setOversizedPost(true);
    //     }
    //     console.log(dimensions.height)
    // },[dimensions])

    //Checks for length of body of post and colapses long posts
    useEffect(() => {
        const imageRegex = /!\[[^\]]*\]\((?<filename>.*?)(?=\"|\))(?<optionalpart>\".*\")?\)/g;
        const images = body.match(imageRegex);
        const numImages = images?.length;

        const newLineRegex = /[\r\n]/g;
        const newLine = body.match(newLineRegex);
        const numNewLine = newLine?.length;

        if((body.length > 1000 || numImages > 2 || numNewLine >= 10) && !oversizedPost){
            setPostCollapsed(true);
            setOversizedPost(true);
        }
    },[body])

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

    //Save the post the user created
    const createNewPost = async () => {
        if(!user) return;
        if(!post.id) return;
        if (body === editedPostContent) return;
        setSaving(true) //set saving to true to show loading
        await db.doc('posts/' + post.id).update({
            body: editedPostContent,
            _updatedOn: firebase.firestore.Timestamp.now(),
        })
        setSaving(false)
        setIsEdit(false);
    }

    const PostAction = ({ IconComponent, label, active, activeColours,icon_colour, colours, ...props }) => {
        return <button className={`inline-flex items-center px-4 py-1 border border-transparent ${active?activeColours:colours} hover:shadow-sm text-base leading-6 font-medium rounded-md transition ease-in-out duration-150 cursor-pointer`} {...props}>
            <IconComponent className={`w-8 h-8 mr-1 ${icon_colour}`} />
            <span className="text-gray-500">{label}</span>
        </button>
    }
    

    return loading ?
        <PostLoader/> :
        <div className={`py-4 px-6 bg-white rounded-xl shadow-lg overflow-hidden space-y-2 ${isEdit ? "border-solid border-2 border-blue-500" : null}`}>
            <div className="post-author_container w-full">
                <div className="flex flex-row flex-1 items-center cursor-pointer" onClick={e => history.push(`/app/profile/${author}`)}>
                    <ProfilePicture uid={author} className="shadow-md bg-blue-400 overflow-hidden h-12 w-12 rounded-full" />
                    <div className="flex-1 space-y-2 py-1 ml-2">
                        <div className="text-xl font-medium">{authorProfile.name}</div>
                        {_createdOn && <div className="post-timestamp_text"><TimeAgo date={_createdOn.toDate().getTime()} /></div>}
                    </div>
                </div>
                {(user?.uid === author) && <div>
                    <IconButton aria-label="delete" className="float-right" onClick={handleDeletePost}>
                        <DeleteIcon className="text-red-600" />
                    </IconButton>
                    {!isEdit? <IconButton aria-label="delete" className="float-right" onClick={() => setIsEdit(true)}>
                        <EditOutlined className="text-blue-600"/>
                    </IconButton> : <IconButton aria-label="delete" className="float-right" onClick={() => setIsEdit(false)}>
                        <Cancel className="text-blue-600"/>
                    </IconButton>}
                </div>}
            </div>
            <div ref={divRef} className="overflow-hidden" style={{'maxHeight':postCollapsed?'500px':''}}>
                <MDEditor defaultValue={body} readOnly={!isEdit} onChange={val => setEditedPostContent(val())}/>
            </div>
            {postCollapsed && <span className="-mt-2 text-sm cursor-pointer text-blue-600" onClick={() => setPostCollapsed(false)}>See More</span>}
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
                    {isEdit ? <Button 
                        className="float-right"
                        disabled={saving || (editedPostContent.length === 0) || body === editedPostContent} 
                        variant="contained" 
                        color="primary" 
                        onClick={createNewPost}>Save</Button> : null}
            </div>
            {showComments && <PostComments post={post} />}
        </div>

}

export default PostCard;
