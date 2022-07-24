import InView from 'react-intersection-observer';
import { postConverter } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import PostCard from '../Dashboard/PostCard';
import PostLoader from '../Dashboard/PostLoader';
import {collection, where} from 'firebase/firestore';
import usePaginateCollection from '../../hooks/usePaginateCollection';
import {PostDocument} from '../../types/Posts';
import { useSpeerOrg } from '../../hooks/useSpeerOrg';

const DOCUMENTS_PER_PAGE = 3;

/**
 * Loads the current Post Stream for the dashboard
 * @component
 * @returns PostCards
 */
const ProfilePostStream = ({uid, isUser, name}) => {
    const { orgRef } = useSpeerOrg();
    const { user } = useAuth();
    const [streamPosts, loadMore, loading, finished] = usePaginateCollection<PostDocument>(collection(orgRef, 'posts').withConverter(postConverter), {
        orderKey: '_createdOn',
        queryConstraints: [
            where('author','==',uid),
            where('deleted', '==', false)
        ],
        direction: 'desc',
        pageLimit: DOCUMENTS_PER_PAGE
    })

    return (
        <>
            {(streamPosts.length > 0) ? <p className="font-semibold text-lg">{isUser?"Your":name +"'s"} Posts</p> : (finished && <p className="font-semibold text-gray-600 text-lg text-center w-full">
                {isUser?"You haven't":`${name} hasn't`}  made any posts yet!
            </p>)}
            <div className="space-y-2">
                {streamPosts.map(post => <PostCard key={post.id} post={post}/>)}
                {loading && <PostLoader/>}
                <InView as="div" onChange={(inView, entry) => { if (inView && !loading) loadMore() }} />
            </div>
        </>
    );
}

export default ProfilePostStream;
