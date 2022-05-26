import React, { useState, useEffect, useRef } from 'react';
import { MDEditor } from '../Blog/Editor/mdeditor';
import { db, firebase, postConverter } from '../../config/firebase';
import ProfilePicture from '../User/ProfilePicture';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import MessageIcon from '@mui/icons-material/Message';
import TimeAgo from 'react-timeago';
import './PostCard.css';
import { useAuth } from '../../hooks/useAuth';
import { EditOutlined, Favorite, Cancel } from '@mui/icons-material';
import { PostComments } from './PostComments';
import useRefDimensions from '../../hooks/useRefDimensions';
import { Button, Collapse } from '@mui/material';
import PostLoader from './PostLoader';
import { logEvent } from '../../utils/analytics';
import SlideTransition from '../SlideTransition/SlideTransition';
import { TransitionGroup } from 'react-transition-group';
import { useNavigate } from 'react-router-dom';
import { UserDetails } from '../../types/User';
import { PostDocument } from '../../types/Posts';
import { Delta } from 'quill';
import { doc, Timestamp, updateDoc } from 'firebase/firestore';
import {QuillDeltaToHtmlConverter} from 'quill-delta-to-html';
/**
 * Creates the post card for this post
 * @component
 * @param {*} param0 
 * @returns 
 */
const PostCard = ({ post }: { post: PostDocument }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [authorProfile, setAuthorProfile] = useState<UserDetails>();
    const [userLiked, setUserLiked] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [postCollapsed, setPostCollapsed] = useState(false);
    const [oversizedPost, setOversizedPost] = useState(false);
    const { author, content, likeCount, commentCount, id, _createdOn } = post;
    const { delta, html = "" } = content || {};
    const [saving, setSaving] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editedPostContent, setEditedPostContent] = useState<Delta>(delta);
    const navigate = useNavigate();
    const divRef = useRef<HTMLDivElement>(null);
    const dimensions = useRefDimensions(divRef);

    // useEffect(() => {
    //     if(dimensions.height > 500 && !oversizedPost){
    //         setPostCollapsed(true);
    //         setOversizedPost(true);
    //     }
    //     console.log(dimensions.height)
    // },[dimensions])

    //Checks for length of body of post and colapses long posts
    useEffect(() => {
        //TODO: This function is definetly broken now
        const imageRegex = /!\[[^\]]*\]\((?<filename>.*?)(?=\"|\))(?<optionalpart>\".*\")?\)/g;
        const images = html.match(imageRegex);
        const numImages = images?.length || 0;

        const newLineRegex = /[\r\n]/g;
        const newLine = html.match(newLineRegex || 0);
        const numNewLine = newLine?.length || 0;

        if((html.length > 1000 || numImages > 2 || numNewLine >= 10) && !oversizedPost){
            setPostCollapsed(true);
            setOversizedPost(true);
        }
    },[html])

    //Attach listener on the author
    //TODO: should have author details in post
    useEffect(() => {
        setLoading(true); //BLock view of anything if author is loading
        if (!post) return;
        return db.doc(`usersPublic/${author}`).onSnapshot(snap => {
            setAuthorProfile(snap.data() as UserDetails)
            setLoading(false)
        })
    }, [post?.id]);

    useEffect(() => {
        if (!user?.uid) return;
        return db.doc(`stage_posts/${id}/likes/${user.uid}`).onSnapshot(snap => {
            const { liked } = snap.data() || {};
            setUserLiked(liked || false)
        })
    }, [user?.uid]);

    const handleUserLikePost = async () => {
        if (!user?.uid) return;
        if(!userLiked) await db.doc(`stage_posts/${id}/likes/${user.uid}`).set({
            liked: true,
            likeUser: user.uid,
            _createdOn: firebase.firestore.FieldValue.serverTimestamp()
        })
        if(userLiked) await db.doc(`stage_posts/${id}/likes/${user.uid}`).delete()
        logEvent(userLiked? 'unlike_post' : 'like_post', {
            postId: id,
            postAuthor: author
        })
    }

    const handleDeletePost = () => {
        db.doc(`stage_posts/${post.id}`).delete()
    }

    //Save the post the user created
    const createNewPost = async () => {
        if(!user) return;
        if(!post.id) return;
        if (Object.is(delta, editedPostContent)) return;
        setSaving(true) //set saving to true to show loading
        console.log({
            content: {
                delta: editedPostContent,
                html: new QuillDeltaToHtmlConverter(editedPostContent.ops || []).convert()
            },
        })
        //@ts-ignore
        await updateDoc(doc(db, 'stage_posts', post.id).withConverter(postConverter), {
            content: {
                delta: editedPostContent,
                html: new QuillDeltaToHtmlConverter(editedPostContent.ops || []).convert()
            },
            _updatedOn: Timestamp.now(),
        } as Partial<PostDocument>)
        setSaving(false)
        setIsEdit(false);
    }

    const PostAction = ({ IconComponent, label, active, activeColours,icon_colour, colours, ...props }) => {
        return <button className={`inline-flex items-center px-4 py-1 border border-transparent ${active?activeColours:colours} hover:shadow-sm text-base leading-6 font-medium rounded-md transition ease-in-out duration-150 cursor-pointer`} {...props}>
            <IconComponent className={`text-xl mr-1 ${icon_colour}`} />
            <span className="text-gray-500">{label}</span>
        </button>
    }
    

    return loading ?
        <SlideTransition in timeout={150}>
            <PostLoader/>
        </SlideTransition> :
        <SlideTransition in timeout={150}>
            <div className={`py-4 px-6 bg-white rounded-xl shadow-lg overflow-hidden space-y-2 transition ${isEdit ? "border-solid border-2 border-blue-500" : null}`}>
                <div className="post-author_container w-full">
                    <div className="flex flex-row flex-1 items-center cursor-pointer" onClick={e => navigate(`/profile/${author}`)}>
                        <ProfilePicture uid={author} className="shadow-md bg-blue-400 overflow-hidden h-12 w-12 rounded-full" />
                        <div className="flex-1 space-y-2 py-1 ml-2">
                            <div className="text-xl font-medium">{authorProfile?.name}</div>
                            {_createdOn && <div className="post-timestamp_text"><TimeAgo date={_createdOn.toDate().getTime()} /></div>}
                        </div>
                    </div>
                    {(user?.uid === author) && <div>
                        <IconButton
                            aria-label="delete"
                            className="float-right"
                            onClick={handleDeletePost}
                            size="large">
                            <DeleteIcon className="text-red-600" />
                        </IconButton>
                        {!isEdit? <IconButton
                            aria-label="delete"
                            className="float-right"
                            onClick={() => setIsEdit(true)}
                            size="large">
                            <EditOutlined className="text-blue-600"/>
                        </IconButton> : <IconButton
                            aria-label="delete"
                            className="float-right"
                            onClick={() => setIsEdit(false)}
                            size="large">
                            <Cancel className="text-blue-600"/>
                        </IconButton>}
                    </div>}
                </div>
                {!isEdit?<div ref={divRef} className="overflow-hidden prose" style={{'maxHeight':postCollapsed?'500px':''}} dangerouslySetInnerHTML={{__html: post.content.html}}></div>:
                <MDEditor defaultValue={post.content.delta} docId={post.id} onChange={(val, delta, sources, editor) => setEditedPostContent(editor.getContents())}/>}
                {postCollapsed && <span className="-mt-2 text-sm cursor-pointer text-blue-600" onClick={() => setPostCollapsed(false)}>See More</span>}
                <div className="flex flex-row">
                    <div className=" border-0 border-t border-solid border-gray-400 py-2">
                        <PostAction 
                            activeColours="bg-red-100 hover:bg-red-200 text-red-500"
                            colours="bg-white hover:bg-red-100 text-gray-500"
                            icon_colour="text-red-500"
                            IconComponent={Favorite} 
                            onClick={handleUserLikePost} 
                            label={"Like" + (likeCount? ("\t" + likeCount):"")} 
                        active={userLiked}/>
                    </div>
                    <div className=" border-0 border-t border-solid border-gray-400 py-2">
                        <PostAction 
                            activeColours="bg-green-100 hover:bg-green-200 text-green-500"
                            colours="bg-white hover:bg-green-100 text-gray-500"
                            icon_colour="text-green-500"
                            IconComponent={MessageIcon} 
                            onClick={() => setShowComments(!showComments)}
                            label={"Comment" + (commentCount? ("\t" + commentCount):"")} 
                            active={showComments}/>
                    </div>
                        {isEdit ? <Button 
                            className="float-right"
                            // disabled={saving || (editedPostContent.length === 0) || body === editedPostContent} //TODO: fix this 
                            variant="contained" 
                            color="primary" 
                            onClick={createNewPost}>Save</Button> : null}
                </div>
                <TransitionGroup>
                    {showComments && <Collapse in={showComments}>
                        <PostComments post={post} />
                    </Collapse>}
                </TransitionGroup>
            </div>
        </SlideTransition>
}

export default PostCard;
