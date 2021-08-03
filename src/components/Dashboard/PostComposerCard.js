import { useEffect, useState } from 'react';
import { MDEditor } from '../Blog/Editor/mdeditor';
import { Button } from '@material-ui/core';
import './PostComposerCard.css'
import { db, firebase } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import ProfilePicture from '../User/ProfilePicture';

/**
 * Handles the Editor View for posts
 * @component
 * @returns Component
 */
const PostComposerCard = () => {
    const [postContent, setPostContent] = useState("");
    const [saving, setSaving] = useState(false);
    const { user } = useAuth();
    const [docId, setDocId] = useState(db.collection('posts').doc().id);

    useEffect(() => {
        if(saving) return;
        setDocId(db.collection('posts').doc().id)
    }, [saving]);

    //Save the post the user created
    const createNewPost = async () => {
        if(!user) return;
        if(!docId) return;
        setSaving(true) //set saving to true to show loading
        await db.doc('posts/' + docId).set({
            author: user.uid,
            body: postContent,
            _createdOn: firebase.firestore.FieldValue.serverTimestamp()
        })
        setSaving(false)
        setPostContent("") //reset editor content
    }

    return (
        <div className="post-composer">
            <div className="flex-1 flex flex-row">
                <ProfilePicture uid={user?.uid} className="w-12 h-12 rounded-full"/>
                <div className="pl-5 flex-1">
                {!saving && <MDEditor docId={docId} onChange={val => setPostContent(val())}/>}
                </div>
            </div>
            <div>
                <Button 
                    className="float-right"
                    disabled={saving || (postContent.length == 0)} 
                    variant="contained" 
                    color="primary" 
                    onClick={createNewPost}>Post</Button>
            </div>
        </div>
    );
}

export default PostComposerCard;
