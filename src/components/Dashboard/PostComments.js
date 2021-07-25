import { Button, TextField } from "@material-ui/core";
import { useState, useEffect } from "react"
import TimeAgo from "react-timeago";
import { db, firebase } from "../../config/firebase"
import { useAuth } from "../../hooks/useAuth";
import ProfilePicture from "../User/ProfilePicture";

export function PostComments({ post }) {
    const [comments, setComments] = useState([]);
    const [userComment, setUserComment] = useState("");
    const { userDetails, user } = useAuth();
    const { name, major, school } = userDetails || {};
    const { uid } = user || {};
    useEffect(() => {
        if(!post?.id) return;
        return db.collection(`posts/${post.id}/comments`).orderBy('commentedOn').onSnapshot(snap => {
            let commentsArray = snap.docs.map(docSnap => {
                return {
                    id: docSnap.id,
                    ...docSnap.data()
                }
            })
            setComments(commentsArray)
        })
    }, [post?.id])

    const handleSubmitCommment = async () => {
        if(userComment.length == 0) return;
        await db.collection(`posts/${post.id}/comments`).add({
            comment: userComment,
            author: { name, major, school, uid },
            parentPost: post.id,
            commentedOn: firebase.firestore.FieldValue.serverTimestamp()
        })
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
            <div className="w-full flex flex-row space-x-2">
                <div className="flex flex-row space-x-2 flex-1">
                    <ProfilePicture uid={author?.uid} className="w-7 h-7 rounded-full"/>
                    <h4 className="text-lg font-medium">{author?.name}</h4>
                    <h4 className="text-lg font-normal">{comment}</h4>
                </div>
                <div className="grid place-items-center ">
                    <TimeAgo className="text-gray-700" date={commentedOn.toMillis()}/>
                </div>
            </div>
        ))}
    </div>)
}