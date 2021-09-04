import { useEffect, useState } from 'react';
import InView from 'react-intersection-observer';
import { db } from '../../config/firebase';
import { getSnapshot } from '../../hooks/firestore';
import { useAuth } from '../../hooks/useAuth';
import PostCard from '../Dashboard/PostCard';

let postsArray = []
let listeners = []    // list of listeners
let start = null      // start position of listener
let end = null        // end position of listener

const DOCUMENTS_PER_PAGE = 3;

/**
 * Loads the current Post Stream for the dashboard
 * @component
 * @returns PostCards
 */
const ProfilePostStream = ({uid, isUser, name}) => {
    const { user } = useAuth();
    const [streamPosts, setStreamPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadedAllPosts, setLoadedAllPosts] = useState(false);

    useEffect(() => {
        if (!user) return;

        //Clear all variables before reloading page.
        postsArray = [];
        listeners = [];
        start = null;
        end = null;
        getPosts();

        return () => detachListeners();
    }, [user, uid, getPosts]);

    function handleUpdatedPosts(snapshot) {
        // append new messages to message array
        snapshot.forEach((message) => {
            // filter out any duplicates (from modify/delete events)         
            postsArray = postsArray.filter(x => x.id !== message.id)
            postsArray.push({ id: message.id, ...message.data() })
        })

        // remove post from local array if deleted
        snapshot.docChanges().forEach(change => {
            if (change.type === 'removed') {
                const message = change.doc
                //Remove post from our array if it is here
                postsArray = postsArray.filter(x => x.id !== message.id)
            }
        });

        //Sort array because it is unsorted
        postsArray.sort(({ _createdOn: x }, { _createdOn: y }) => {
            return y.toDate() - x.toDate()
        })

        setStreamPosts(postsArray)
        setLoading(false)
    }

    

    async function getPosts() {
        // single query to get startAt snapshot
        const ref = db.collection('posts').where('author','==',uid)
        let snapshots = await getSnapshot(ref.orderBy('_createdOn', 'desc')
            .limit(DOCUMENTS_PER_PAGE))
        // save startAt snapshot
        end = snapshots.docs[snapshots.docs.length - 1]
        // create listener using startAt snapshot (starting boundary)   
        const query = end?ref.orderBy('_createdOn', 'desc').endAt(end):ref.orderBy('_createdOn', 'desc')
        let listener = query.onSnapshot(handleUpdatedPosts)
        // add listener to list
        listeners.push(listener)
    }

    async function getMoreMessages() {
        console.log('getting more messages')

        setLoading(true)
        if (!end) {
            console.log('no more posts');
            setLoadedAllPosts(true);
            setLoading(false)
            return;
        }
        // single query to get new startAt snapshot
        const ref = db.collection('posts').where('author','==',uid)
        let snapshots = await getSnapshot(ref.orderBy('_createdOn', 'desc')
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
        let listener = ref.orderBy('_createdOn', 'desc')
            .endAt(end).startAfter(start)
            .onSnapshot(handleUpdatedPosts)
        listeners.push(listener)
    }

    // call to detach all listeners
    function detachListeners() {
        listeners.forEach(listener => listener())
    }

    return (
        <>
            {streamPosts.length > 0 ? <p className="font-semibold text-lg">{isUser?"Your":name +"'s"} Posts</p> : <p className="font-semibold text-red-500 text-lg">
                You haven't made any posts yet!
            </p>}
            <div className="space-y-2">
                {streamPosts.map(post => <PostCard key={post.id} post={post}/>)}
                <InView as="div" onChange={(inView, entry) => { if (inView && !loading) getMoreMessages() }} />
            </div>
        </>
    );
}

export default ProfilePostStream;
