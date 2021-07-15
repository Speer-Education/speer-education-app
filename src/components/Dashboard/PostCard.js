import { useState, useEffect } from 'react';
import { MDEditor } from '../Blog/Editor/mdeditor';
import { db, storage } from '../../config/firebase';
import ProfilePicture from '../User/ProfilePicture';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TimeAgo from 'react-timeago';
import './PostCard.css';
import { useAuth } from '../../hooks/useAuth';

const PostCard = ({ post }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [authorProfile, setAuthorProfile] = useState({});
    const { author, body, _createdOn } = post;

    useEffect(async () => {
        setLoading(true);
        if(!post) return;
        return db.doc(`users/${author}`).onSnapshot(snap => {
            setAuthorProfile(snap.data())
            setLoading(false)   
        })
    }, [post]);

    const handleDeletePost = () => {
        db.doc(`posts/${post.id}`).delete()
    }

    return loading? 
    <div className="py-4 px-6 m-4 animate-pulse">
        <div className="post-author_image bg-blue-400"></div>
    </div>:
    <div className="py-4 px-6 m-4">
        <div className="post-author_container w-full">
            <div className="flex flex-row flex-1">
                <div className="post-author_image">
                    <ProfilePicture uid={author}/>
                </div>
                <div className="author-details_container">
                    <span className="author-details_name">{authorProfile.name}</span>
                    <span className="author-details_school">{authorProfile.major.label}@{authorProfile.school}</span>
                    {_createdOn && <span className="post-timestamp_text">Posted <TimeAgo date={_createdOn.toDate().getTime()} /></span>}
                </div>
            </div>
            {(user?.uid == author ) && <div>
                <IconButton aria-label="delete" className="float-right" onClick={handleDeletePost}>
                    <DeleteIcon className="text-red-600"/>
                </IconButton>
            </div>}
        </div>
        <MDEditor defaultValue={body} readOnly={true} />
    </div>
    
}

export default PostCard;
