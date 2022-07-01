import React, { useEffect, useState } from 'react';
import { db, docConverter, postConverter } from '../../config/firebase';
import { getSnapshot } from '../../hooks/firestore';
import { useAuth } from '../../hooks/useAuth';
import PostCard from './PostCard';
import PostLoader from './PostLoader';
import {collection, where} from 'firebase/firestore';
import usePaginateCollection from '../../hooks/usePaginateCollection';
import { PostDocument } from '../../types/Posts';
import InView from 'react-intersection-observer';
import { useSpeerOrg } from '../../hooks/useSpeerOrg';

const DOCUMENTS_PER_PAGE = 3;

/**
 * Loads the current Post Stream for the dashboard
 * @component
 * @returns PostCards
 */
const PostStream = ({ organization }: {organization?: string}) => {
    const { user } = useAuth();
    const { orgRef } = useSpeerOrg();
    const [streamPosts, loadMore, loading, finished] = usePaginateCollection<PostDocument>(collection(orgRef, 'posts').withConverter(postConverter), {
        orderKey: '_createdOn',
        direction: 'desc',
        pageLimit: DOCUMENTS_PER_PAGE,
        queryConstraints: [where('deleted', '==', false)]
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
