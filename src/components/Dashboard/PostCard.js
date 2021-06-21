import { useState, useEffect } from 'react';
import { MDEditor } from '../Blog/Editor/mdeditor';
import { db, storage } from '../../config/firebase';
import ProfilePicture from '../User/ProfilePicture';
import TimeAgo from 'react-timeago';
import './PostCard.css';

const PostCard = ({ post }) => {
    const [loading, setLoading] = useState(true);
    const [authorProfile, setAuthorProfile] = useState({});
    const { author, body, _createdOn } = post;

    useEffect(async () => {
        setLoading(true);
        if(!post) return;
        let authorProfile = (await db.doc(`users/${author}`).get()).data()
        setAuthorProfile(authorProfile)
        setLoading(false)   
    }, [post]);

    return loading? 
    <div className="post-card">
        <h1>Loading</h1>
    </div>:
    <div className="post-card">
        <div className="post-author_container">
            <div className="post-author_image">
                <ProfilePicture uid={author}/>
            </div>
            <div className="author-details_container">
                <span className="author-details_name">{authorProfile.name}</span>
                <span className="author-details_school">{authorProfile.major.label}@{authorProfile.school}</span>
                {_createdOn && <span className="post-timestamp_text">Posted <TimeAgo date={_createdOn.toDate().getTime()} /></span>}
            </div>
        </div>
        <MDEditor defaultValue={body} readOnly={true} />
    </div>
    
}

export default PostCard;
