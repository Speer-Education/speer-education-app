import React, { FC, useEffect, useRef, useState } from 'react';
import { MDEditor } from '../Blog/Editor/mdeditor';
import { Button, TextField } from '@mui/material';
import './PostComposerCard.css'
import { db, firebase, postConverter } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import ProfilePicture from '../User/ProfilePicture';
import { Image, YouTube } from '@mui/icons-material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogBase from '../Dialog/DialogBase';
import { logEvent } from '../../utils/analytics';
import SlideTransition from '../SlideTransition/SlideTransition';
import { Delta } from 'quill';
import ReactQuill from 'react-quill';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { PostDocument } from '../../types/Posts';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'

/**
 * Handles the Editor View for posts
 * @component
 * @returns Component
 */
const PostComposerCard = ({ organization }:{organization?: string}) => {
    const [postContent, setPostContent] = useState<Delta>();
    const [saving, setSaving] = useState<boolean>(false);
    const { user } = useAuth();
    const editor = useRef<ReactQuill>(null)
    //@ts-ignore
    const collectionRef = !organization?collection(db, 'stage_posts'):collection(db, 'organization', organization, 'posts')
    const [docId, setDocId] = useState(doc(collectionRef).id);

    useEffect(() => {
        if(saving) return;
        setDocId(doc(collectionRef).id)
    }, [saving]);

    //Save the post the user created
    const createNewPost = async () => {
        if(!user || !docId || !postContent) return;
        setSaving(true) //set saving to true to show loading
        await setDoc(doc(collectionRef, docId).withConverter(postConverter), {
            content: {
                delta: postContent,
                html: new QuillDeltaToHtmlConverter(postContent.ops || []).convert()
            },
            author: user.uid,
            _createdOn: serverTimestamp(),
            _updatedOn: serverTimestamp()
        } as Partial<PostDocument>)
        setSaving(false)
        logEvent('post_created')
        setPostContent(editor.current?.editor?.setContents(new Delta())) //reset editor content
    }
    

    return (
        <SlideTransition in timeout={50}>
            <div className="post-composer">
                <div className="flex-1 flex flex-row">
                    {user?.uid && <ProfilePicture uid={user?.uid} className="w-12 h-12 rounded-full"/>}
                    {/* <div className="pl-5 flex-1"> */}
                    {!saving && <MDEditor ref={editor} docId={docId} onChange={(content, delta, source, editor) => setPostContent(editor.getContents())}/>}
                    {/* </div> */}
                </div>
                <div className="flex flex-row w-full justify-between">
                    {/* {!editor.current?.readonly &&<div className="flex flex-row ">
                        <AddImageButton fileCallback={editor.current?.handleExternalImageUpload}/>
                        <AddYoutubeButton urlCallback={editor.current?.handleAddYoutubeVideo}/>
                    </div>} */}
                    
                    <Button 
                        className="float-right"
                        disabled={saving} 
                        variant="contained" 
                        color="primary" 
                        onClick={createNewPost}>Post</Button>
                </div>
            </div>
        </SlideTransition>
    );
}

export default PostComposerCard;
