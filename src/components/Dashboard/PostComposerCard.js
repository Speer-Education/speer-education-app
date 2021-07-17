import { useState } from 'react';
import { MDEditor } from '../Blog/Editor/mdeditor';
import { Button } from '@material-ui/core';
import './PostComposerCard.css'
import { db, firebase } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';

/**
 * Handles the Editor View for posts
 * @component
 * @returns Component
 */
const PostComposerCard = () => {
    const [postContent, setPostContent] = useState("");
    const [saving, setSaving] = useState(false);
    const { user } = useAuth();

    //Save the post the user created
    const createNewPost = async () => {
        if(!user) return;
        setSaving(true) //set saving to true to show loading
        await db.collection('posts').add({
            author: user.uid,
            body: postContent,
            _createdOn: firebase.firestore.FieldValue.serverTimestamp()
        })
        setSaving(false)
        setPostContent("") //reset editor content
    }

    return (
        <div className="post-composer">
            <h2>Tell us what's on your mind :)</h2>
            {!saving && <MDEditor onChange={val => setPostContent(val())}/>}
            <Button disabled={saving || (postContent.length == 0)} variant="outlined" onClick={createNewPost}>Post</Button>
        </div>
    );
}

export default PostComposerCard;
