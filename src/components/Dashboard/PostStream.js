import { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import PostCard from './PostCard';

/**
 * Loads the current Post Stream for the dashboard
 * @component
 * @returns PostCards
 */
const PostStream = () => {
    const [streamPosts, setStreamPosts] = useState([]);

    useEffect(() => {
        db.collection('posts').orderBy('_createdOn','desc').onSnapshot(snap => {
            let posts = snap.docs.map( docSnap => {
                return {
                    id: docSnap.id,
                    ...docSnap.data()
                }
            })
            setStreamPosts(posts)
        })
    },[]);

    return (
        <div className="p-2 space-y-2">
            {streamPosts.map(post => <PostCard key={post.id} post={post}/>)}
        </div>
    );
}

export default PostStream;
