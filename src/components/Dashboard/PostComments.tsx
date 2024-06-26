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
import { Fade } from '@mui/material';
import { logEvent } from "../../utils/analytics";
import { TransitionGroup } from 'react-transition-group';
import { set } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {UserPostData, PostDocument, PostCommentDocument} from '../../types/Posts';
import { addDoc, collection, deleteDoc, doc, Timestamp } from "firebase/firestore";
import usePaginateCollection from "../../hooks/usePaginateCollection";
import { getMajor, getSchool } from "../../utils/user";
import { useSpeerOrg } from "../../hooks/useSpeerOrg";
import { useDialog } from "../../hooks/useDialog";

const DOCUMENTS_PER_PAGE = 5;

export const PostComments = forwardRef<HTMLDivElement, { post: PostDocument }>(({ post }, ref) => {
    const { orgRef } = useSpeerOrg();
    const [comments, loadMore, loading, finished] = usePaginateCollection(collection(post.ref, 'comments').withConverter(docConverter), {
        orderKey: 'commentedOn',
        direction: 'desc',
        pageLimit: DOCUMENTS_PER_PAGE
    })
    const [userComment, setUserComment] = useState<string>("");
    const { userDetails, user } = useAuth();
    const navigate = useNavigate();

    const { name } = userDetails || {};

    const [openDialog, closeDialog] = useDialog();

    
    //TODO: Should add press enter to submit comment as per #58

    const handleSubmitCommment = async () => {
        if(userComment.length === 0 || !userDetails || !user) return;
        await addDoc(collection(post.ref, 'comments'), {
            comment: userComment,
            author: { name, major: getMajor(userDetails), school: getSchool(userDetails), uid: user.uid },
            parentPost: post.id,
            commentedOn: Timestamp.now()
        })
        logEvent('posted_comment', {
            parentPost: post.id,
            commentLength: userComment.length
        })
        setUserComment("");
    }

    const handleKeyPress = async (e) => {
        if (e.key === 'Enter' && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) {
            e.preventDefault();
            await handleSubmitCommment();
        }
    }

    const handleDeleteComment = (id) => {
        deleteDoc(doc(post.ref, 'comments', id));
    }

    const openConfirmationDialog = (id) => {
        openDialog({
            children: <div className="p-5 rounded-sm">
                <h2 className="text-center mb-5 font-medium	">Are you sure you want to delete this comment?</h2>
                <div className="flex justify-around">
                    <Button 
                        variant="contained" 
                        color="error"
                        sx={{
                            fontWeight: "bold",
                            fontSize: "0.75rem"
                        }} 
                        startIcon={<DeleteIcon />}
                        onClick={() => {handleDeleteComment(id); closeDialog()}}
                    > Delete </Button>
                    <Button 
                        variant="contained" 
                        onClick={closeDialog}
                        sx={{
                            fontWeight: "bold",
                            fontSize: "0.75rem",
                        }} 
                    >Cancel</Button>
                </div>
            </div>
        })
    }

    return (
        <div className="border-t border-0 border-solid border-gray-200 space-y-3" ref={ref}>
            <form className="flex flex-row " onKeyPress={handleKeyPress}>
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
            </form>
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
                        {(author?.uid == user?.uid) && <IconButton
                            onClick={()=> openConfirmationDialog(id)}
                            size="large">
                            <DeleteIcon className="text-red-500"/>
                        </IconButton>}
                    </div>
                </Collapse>
            ))}
            </TransitionGroup>
            {loading && <Fade
                in={loading}>
                <div className="w-full flex flex-row space-x-2 flex-1 items-top animate-pulse">
                    <div className="rounded-full bg-gray-300 w-10 h-10 mt-1"></div>
                    <div className="flex flex-col flex-1 space-y-2">
                        <div className="flex flex-row space-x-2 items-baseline">
                            <div className="h-4 bg-gray-300 rounded w-3/12"></div>
                        </div>
                        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                    </div>
                </div>
            </Fade>}
            {!finished && comments.length != 0 && <a className="underline text-blue-700 block" onClick={loadMore}>Load More</a>}
        </div>
    );
})
