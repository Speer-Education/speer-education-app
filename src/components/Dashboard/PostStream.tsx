import { useEffect, useState } from 'react';
import InView from 'react-intersection-observer';
import { db } from '../../config/firebase';
import { getSnapshot } from '../../hooks/firestore';
import { useAuth } from '../../hooks/useAuth';
import PostCard from './PostCard';
import PostLoader from './PostLoader';

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
const PostStream = () => {
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
    }, [user]);

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
        // query reference for the messages we want
        let ref = db.collection('posts')

        // single query to get startAt snapshot
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
        // query reference for the messages we want
        let ref = db.collection('posts')

        setLoading(true)
        if (!end) {
            setLoadedAllPosts(true);
            setLoading(false)
            return;
        }
        // single query to get new startAt snapshot
        let snapshots = await getSnapshot(ref.orderBy('_createdOn', 'desc')
            .startAfter(end)
            .limit(DOCUMENTS_PER_PAGE))
        // previous starting boundary becomes new ending boundary
        start = end
        end = snapshots.docs[snapshots.docs.length - 1]
        // create another listener using new boundaries     
        if (!end) {
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
        <div className="space-y-2 pb-3">
            {streamPosts.length === 0 && <p className="font-semibold text-gray-600 text-lg text-center w-full">
                Uhoh. I can't find any posts yet. <span className="text-gray-400 text-xs">or i might be a bug </span>
            </p>}
            {streamPosts.map(post => <PostCard key={post.id} post={post}/>)}
            {loading && <PostLoader/>}
            <InView as="div" onChange={(inView, entry) => { if (inView && !loading) getMoreMessages() }} />
        </div>
    );
}

export default PostStream;
