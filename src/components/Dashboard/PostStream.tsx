import React, { useEffect, useState } from 'react';
import { db, docConverter } from '../../config/firebase';
import { getSnapshot } from '../../hooks/firestore';
import { useAuth } from '../../hooks/useAuth';
import PostCard from './PostCard';
import PostLoader from './PostLoader';
import {collection} from 'firebase/firestore';
import usePaginateCollection from '../../hooks/usePaginateCollection';
import { PostDocument } from '../../types/Posts';
import InView from 'react-intersection-observer';

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
    const [streamPosts, loadMore, loading, finished] = usePaginateCollection<PostDocument>(collection(db, 'posts').withConverter(docConverter), {
        orderKey: '_createdOn',
        direction: 'desc',
        pageLimit: DOCUMENTS_PER_PAGE
    })


    return (
        <div className="space-y-2 pb-3">
            {streamPosts.length === 0 && <p className="font-semibold text-gray-600 text-lg text-center w-full">
                Uhoh. I can't find any posts yet. <span className="text-gray-400 text-xs">or i might be a bug </span>
            </p>}
            {streamPosts.map(post => <PostCard key={post.id} post={post}/>)}
            {loading && <PostLoader/>}
            <InView as="div" onChange={(inView, entry) => { if (inView && !loading) loadMore() }}>
                <p></p>
            </InView>
        </div>
    );
}

export default PostStream;
