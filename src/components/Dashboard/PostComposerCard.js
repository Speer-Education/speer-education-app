import { useEffect, useRef, useState } from 'react';
import { MDEditor } from '../Blog/Editor/mdeditor';
import { Button, TextField } from '@mui/material';
import './PostComposerCard.css'
import { db, firebase } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import ProfilePicture from '../User/ProfilePicture';
import { Image, YouTube } from '@mui/icons-material';
import { Dialog } from '@headlessui/react';
import DialogBase from '../Dialog/DialogBase';
import { logEvent } from '../../utils/analytics';
import SlideTransition from '../SlideTransition/SlideTransition';


const AddImageButton = ({fileCallback}) => (<>
    <input id="uwu" type="file" name="file" accept="image/*" onChange={({ target }) => fileCallback(target.files[0])} hidden />
    <label htmlFor="uwu" className="w-min flex flex-row items-center h-6 px-2 py-4 cursor-pointer mt-4 rounded-full text-green-500">
      <Image />
    </label >
  </>)
  
const AddYoutubeButton = ({urlCallback}) => {
    const [open, setOpen] = useState(false);

    return <>
        <AddYoutubeDialog open={open} onClose={() => setOpen(false)} onUrl={url => {
            setOpen(false); 
            urlCallback(url)
        }}/>
        <label htmlFor="no" className="w-min flex flex-row items-center h-6 px-2 py-4 cursor-pointer mt-4 rounded-full text-red-500" onClick={_ => setOpen(true)} >
            <YouTube />
        </label >
    </>
}
  
const AddYoutubeDialog =({ open, onClose, onUrl }) => {
    const [link, setLink] = useState("");
    return <DialogBase open={open} onClose={onClose}>
        <div className="inline-block w-full max-w-md p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg max-h-screen overflow-y-auto">
            <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
            >
                Add Youtube Link
            </Dialog.Title>
            <div className="mt-2 h-full">
                <TextField label="Youtube Link" fullWidth={true} value={link} onChange={e => setLink(e.target.value)}/>
            </div>

            <div className="mt-4 float-right space-x-2">
                <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={_ => {
                            onUrl(link)
                            setLink("")
                        }}
                >
                    Done
                </button>
                <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={onClose}
                    >
                    Close
                </button>
            </div>
        </div>
    </DialogBase>
}

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
            _createdOn: firebase.firestore.Timestamp.now(),
        })
        setSaving(false)
        logEvent('post_created')
        setPostContent("") //reset editor content
    }
    

    return (
        <SlideTransition in timeout={50}>
            <div className="post-composer">
                <div className="flex-1 flex flex-row">
                    {user?.uid && <ProfilePicture uid={user?.uid} className="w-12 h-12 rounded-full"/>}
                    {/* <div className="pl-5 flex-1"> */}
                    {!saving && <MDEditor ref={editor} docId={docId} onChange={val => setPostContent(val)}/>}
                    {/* </div> */}
                </div>
                <div className="flex flex-row w-full justify-between">
                    {/* {!editor.current?.readonly &&<div className="flex flex-row ">
                        <AddImageButton fileCallback={editor.current?.handleExternalImageUpload}/>
                        <AddYoutubeButton urlCallback={editor.current?.handleAddYoutubeVideo}/>
                    </div>} */}
                    
                    <Button 
                        className="float-right"
                        disabled={saving || (postContent.length === 0)} 
                        variant="contained" 
                        color="primary" 
                        onClick={createNewPost}>Post</Button>
                </div>
            </div>
        </SlideTransition>
    );
}

export default PostComposerCard;
