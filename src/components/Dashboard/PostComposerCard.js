import { useEffect, useRef, useState } from 'react';
import { MDEditor } from '../Blog/Editor/mdeditor';
import { Button } from '@material-ui/core';
import './PostComposerCard.css'
import { db, firebase } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import ProfilePicture from '../User/ProfilePicture';
import { Image, YouTube } from '@material-ui/icons';


const AddImageButton = ({fileCallback}) => (<>
    <input id="uwu" type="file" name="file" accept="image/*" onChange={({ target }) => fileCallback(target.files[0])} hidden />
    <label htmlFor="uwu" className="w-min flex flex-row items-center h-6 px-2 py-4 cursor-pointer mt-4 rounded-full text-green-500">
      <Image />
    </label >
  </>)
  
const AddYoutubeButton = ({urlCallback}) => (<>
    <label htmlFor="no" className="w-min flex flex-row items-center h-6 px-2 py-4 cursor-pointer mt-4 rounded-full text-red-500">
      <YouTube />
    </label >
  </>)
  

/**
 * Handles the Editor View for posts
 * @component
 * @returns Component
 */
const PostComposerCard = () => {
    const [postContent, setPostContent] = useState("");
    const [saving, setSaving] = useState(false);
    const { user } = useAuth();
    const editor = useRef()
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
                {!saving && <MDEditor ref={editor} docId={docId} onChange={val => setPostContent(val())}/>}
                </div>
            </div>
            <div className="flex flex-row w-full justify-between">
                {!editor.current?.readonly &&<div className="flex flex-row ">
                    <AddImageButton fileCallback={editor.current?.handleExternalImageUpload}/>
                    <AddYoutubeButton urlCallback={console.log}/>
                </div>}
                
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
