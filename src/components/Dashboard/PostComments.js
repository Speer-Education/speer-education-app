import { Button, TextField } from "@material-ui/core";
import { useState, useEffect } from "react"
import TimeAgo from "react-timeago";
import { db, firebase } from "../../config/firebase"
import history from "../../hooks/history";
import { useAuth } from "../../hooks/useAuth";
import ProfilePicture from "../User/ProfilePicture";
import { getSnapshot } from '../../hooks/firestore';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

let commentsArray = []
let listeners = []    // list of listeners
let start = null      // start position of listener
let end = null        // end position of listener

const DOCUMENTS_PER_PAGE = 5;

export function PostComments({ post }) {
    const [comments, setComments] = useState([]);
    const [userComment, setUserComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [loadedAllPosts, setLoadedAllPosts] = useState(false);
    const { userDetails, user } = useAuth();
    const { name, major, school } = userDetails || {};
    const { uid } = user || {};

    useEffect(() => {
        if(!post?.id) return;

        //Clear all variables before reloading page.
        commentsArray = [];
        listeners = [];
        start = null;
        end = null;
        getComments();

        return () => detachListeners();
    }, [post?.id])
 
    function handleUpdatedComments(snapshot) {
        // append new messages to message array
        snapshot.forEach((message) => {
            // filter out any duplicates (from modify/delete events)         
            commentsArray = commentsArray.filter(x => x.id !== message.id)
            commentsArray.push({ id: message.id, ...message.data() })
        })

        // remove post from local array if deleted
        snapshot.docChanges().forEach(change => {
            if (change.type === 'removed') {
                const message = change.doc
                //Remove post from our array if it is here
                commentsArray = commentsArray.filter(x => x.id !== message.id)
            }
        });

        //Sort array because it is unsorted
        commentsArray.sort(({ commentedOn: x }, { commentedOn: y }) => {
            return y.toDate() - x.toDate()
        })

        setComments(commentsArray)
        setLoading(false)
    }

    async function getComments() {
        // query reference for the messages we want
        let ref = db.collection(`posts/${post.id}/comments`)

        // single query to get startAt snapshot
        let snapshots = await getSnapshot(ref.orderBy('commentedOn', 'desc')
            .limit(DOCUMENTS_PER_PAGE))
        // save startAt snapshot
        end = snapshots.docs[snapshots.docs.length - 1]
        // create listener using startAt snapshot (starting boundary)    
        let listener = ref.orderBy('commentedOn', 'desc')
            .endAt(end)
            .onSnapshot(handleUpdatedComments)
        // add listener to list
        listeners.push(listener)
    }

    async function getMoreComments() {
        console.log('getting more comments')

        // query reference for the messages we want
        let ref = db.collection(`posts/${post.id}/comments`)

        setLoading(true)
        if (!end) {
            console.log('no more posts');
            setLoadedAllPosts(true);
            setLoading(false)
            return;
        }
        // single query to get new startAt snapshot
        let snapshots = await getSnapshot(ref.orderBy('commentedOn', 'desc')
            .startAfter(end)
            .limit(DOCUMENTS_PER_PAGE))
        // previous starting boundary becomes new ending boundary
        start = end
        end = snapshots.docs[snapshots.docs.length - 1]
        // create another listener using new boundaries     
        if (!end) {
            console.log('no more posts');
            setLoadedAllPosts(true);
            setLoading(false)
            return;
        }
        let listener = ref.orderBy('commentedOn', 'desc')
            .endAt(end).startAfter(start)
            .onSnapshot(handleUpdatedComments)
        listeners.push(listener)
    }

    // call to detach all listeners
    function detachListeners() {
        listeners.forEach(listener => listener())
    }

    const handleSubmitCommment = async () => {
        if(userComment.length === 0) return;
        await db.collection(`posts/${post.id}/comments`).add({
            comment: userComment,
            author: { name, major, school, uid },
            parentPost: post.id,
            commentedOn: firebase.firestore.Timestamp.now()
        })
        setUserComment("");
    }

    return (<div className="py-4 px-6 m-2 bg-white rounded-lg shadow-lg space-y-3">
        <TextField 
            label="Comment" 
            value={userComment} 
            onChange={e => setUserComment(e.target.value)} 
            variant="outlined" 
            size="small" 
            multiline
            fullWidth
            margin="normal"/>
        <Button variant="contained" onClick={handleSubmitCommment} color="primary">Comment</Button>
        {comments.map(({ comment, author, id, commentedOn}) => (
            <div className="w-full flex flex-row space-x-2 flex-1 items-top">
                <ProfilePicture uid={author?.uid} thumb className="w-10 h-10 rounded-full mt-1 cursor-pointer" onClick={() => history.push(`/app/profile/${author?.uid}`)}/>
                <div className="flex flex-col flex-1">
                    <div className="flex flex-row space-x-2 items-baseline">
                        <h4 className="font-semibold cursor-pointer" onClick={() => history.push(`/app/profile/${author?.uid}`)}>{author?.name}</h4>
                        {commentedOn && <TimeAgo className="text-gray-400 text-sm" date={commentedOn.toMillis()}/>}
                    </div>
                    <h4 className="text-gray-600 text-normal font-normal">{comment}</h4>
                </div>
                {(author?.uid == uid) && <IconButton>
                    <DeleteIcon className="text-red-500" onClick={() => db.collection(`posts/${post.id}/comments`).doc(id).delete()}/>
                </IconButton>}
            </div>
        ))}
        <a className="underline text-blue-700 block" onClick={getMoreComments}>Load More</a>
    </div>)
}