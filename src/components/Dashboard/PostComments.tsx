import { Button, Collapse, TextField } from "@mui/material";
import React, { useState, useEffect, Fragment, forwardRef, ForwardRefExoticComponent } from "react"
import TimeAgo from "react-timeago";
import { db, docConverter, firebase } from "../../config/firebase"
import { useAuth } from "../../hooks/useAuth";
import ProfilePicture from "../User/ProfilePicture";
import { getSnapshot } from '../../hooks/firestore';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Send } from "@mui/icons-material";
import { Transition } from "@headlessui/react";
import { logEvent } from "../../utils/analytics";
import { TransitionGroup } from 'react-transition-group';
import { set } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {UserPostData, PostDocument, PostCommentDocument} from '../../types/Posts';
import { collection } from "firebase/firestore";
import usePaginateCollection from "../../hooks/usePaginateCollection";

let commentsArray = []
let listeners = []    // list of listeners
let start = null      // start position of listener
let end = null        // end position of listener

const DOCUMENTS_PER_PAGE = 5;

export const PostComments = forwardRef<HTMLDivElement, { post: PostDocument }>(({ post }, ref) => {
    const [comments, loadMore, loading, finished] = usePaginateCollection(collection(db, 'posts', post.id, 'comments').withConverter(docConverter), {
        orderKey: 'commentedOn',
        direction: 'desc',
        pageLimit: DOCUMENTS_PER_PAGE
    })
    const [userComment, setUserComment] = useState<string>("");
    const { userDetails, user } = useAuth();
    const { name, major, school } = userDetails || {};
    const { uid } = user || {};
    const navigate = useNavigate();

    // useEffect(() => {
    //     if(!post?.id) return;

    //     //Clear all variables before reloading page.
    //     commentsArray = [];
    //     listeners = [];
    //     start = null;
    //     end = null;
    //     setComments([]);
    //     getComments();

    //     return () => detachListeners();
    // }, [post?.id])
 
    // function handleUpdatedComments(snapshot) {
    //     // append new messages to message array
    //     snapshot.forEach((message) => {
    //         // filter out any duplicates (from modify/delete events)         
    //         commentsArray = commentsArray.filter(x => x.id !== message.id)
    //         commentsArray.push({ id: message.id, ...message.data() })
    //     })

    //     // remove post from local array if deleted
    //     snapshot.docChanges().forEach(change => {
    //         if (change.type === 'removed') {
    //             const message = change.doc
    //             //Remove post from our array if it is here
    //             commentsArray = commentsArray.filter(x => x.id !== message.id)
    //         }
    //     });

    //     //Sort array because it is unsorted
    //     commentsArray.sort(({ commentedOn: x }, { commentedOn: y }) => {
    //         return y.toDate() - x.toDate()
    //     })

    //     setComments(commentsArray)
    //     setLoading(false)
    // }

    // async function getComments() {
    //     // query reference for the messages we want
    //     let ref = db.collection(`posts/${post.id}/comments`)

    //     // single query to get startAt snapshot
    //     let snapshots = await getSnapshot(ref.orderBy('commentedOn', 'desc')
    //         .limit(DOCUMENTS_PER_PAGE))
    //     // save startAt snapshot
    //     end = snapshots.docs[snapshots.docs.length - 1]
    //     // create listener using startAt snapshot (starting boundary)    
    //     let listener = (end?
    //         ref.orderBy('commentedOn', 'desc').endAt(end):
    //         ref.orderBy('commentedOn', 'desc'))
    //         .onSnapshot(handleUpdatedComments)
    //     // add listener to list
    //     listeners.push(listener)
    // }

    // async function getMoreComments() {
    //     // query reference for the messages we want
    //     let ref = db.collection(`posts/${post.id}/comments`)

    //     setLoading(true)
    //     if (!end) {
    //         setLoadedAllPosts(true);
    //         setLoading(false)
    //         return;
    //     }
    //     // single query to get new startAt snapshot
    //     let snapshots = await getSnapshot(ref.orderBy('commentedOn', 'desc')
    //         .startAfter(end)
    //         .limit(DOCUMENTS_PER_PAGE))
    //     // previous starting boundary becomes new ending boundary
    //     start = end
    //     end = snapshots.docs[snapshots.docs.length - 1]
    //     // create another listener using new boundaries     
    //     if (!end) {
    //         setLoadedAllPosts(true);
    //         setLoading(false)
    //         return;
    //     }
    //     let listener = ref.orderBy('commentedOn', 'desc')
    //         .endAt(end).startAfter(start)
    //         .onSnapshot(handleUpdatedComments)
    //     listeners.push(listener)
    // }

    // // call to detach all listeners
    // function detachListeners() {
    //     listeners.forEach(listener => listener())
    // }

    const handleSubmitCommment = async () => {
        if(userComment.length === 0) return;
        await db.collection(`posts/${post.id}/comments`).add({
            comment: userComment,
            author: { name, major, school, uid },
            parentPost: post.id,
            commentedOn: firebase.firestore.Timestamp.now()
        })
        logEvent('posted_comment', {
            parentPost: post.id,
            commentLength: userComment.length
        })
        setUserComment("");
    }

    return (
        <div className="border-t border-0 border-solid border-gray-200 space-y-3" ref={ref}>
            <div className="flex flex-row ">
                <TextField 
                    label="Comment" 
                    value={userComment} 
                    onChange={e => setUserComment(e.target.value)} 
                    variant="outlined" 
                    size="small" 
                    multiline
                    fullWidth
                    margin="normal"/>
                <div className="flex-1 grid place-items-center">
                    <IconButton onClick={handleSubmitCommment} size="large">
                        <Send className="text-speer-blue"/>
                    </IconButton>
                </div>
            </div>
            <TransitionGroup>
            {comments.map(({ comment, author, id, commentedOn}) => (
                <Collapse key={id}>
                    <div className="w-full flex flex-row space-x-2 flex-1 items-top">
                        <ProfilePicture uid={author?.uid} thumb className="w-10 h-10 rounded-full mt-1 cursor-pointer" onClick={() => navigate(`/profile/${author?.uid}`)}/>
                        <div className="flex flex-col flex-1">
                            <div className="flex flex-row space-x-2 items-baseline">
                                <h4 className="font-semibold cursor-pointer" onClick={() => navigate(`/profile/${author?.uid}`)}>{author?.name}</h4>
                                {commentedOn && <TimeAgo className="text-gray-400 text-sm" date={commentedOn.toMillis()}/>}
                            </div>
                            <h4 className="text-gray-600 text-normal font-normal">{comment}</h4>
                        </div>
                        {(author?.uid == uid) && <IconButton
                            onClick={() => db.collection(`posts/${post.id}/comments`).doc(id).delete()}
                            size="large">
                            <DeleteIcon className="text-red-500"/>
                        </IconButton>}
                    </div>
                </Collapse>
            ))}
            </TransitionGroup>
            <Transition
                as={Fragment}
                show={loading}
                enter="transform transition duration-[400ms]"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transform duration-200 transition ease-in-out"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div className="w-full flex flex-row space-x-2 flex-1 items-top animate-pulse">
                    <div className="rounded-full bg-gray-300 w-10 h-10 mt-1"></div>
                    <div className="flex flex-col flex-1 space-y-2">
                        <div className="flex flex-row space-x-2 items-baseline">
                            <div className="h-4 bg-gray-300 rounded w-3/12"></div>
                        </div>
                        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                    </div>
                </div>
            </Transition>
            {!finished && comments.length != 0 && <a className="underline text-blue-700 block" onClick={loadMore}>Load More</a>}
        </div>
    );
})
