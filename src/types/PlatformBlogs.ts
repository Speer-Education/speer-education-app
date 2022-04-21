import { Timestamp } from 'firebase/firestore';
import {InternalDoc} from './DocConverter';
export type PlatformBlog = {
    authorUid: string,
    body: string,
    description: string,
    postedOn: Timestamp,
    title: string,
    views: number,
}

export type PlatformBlogDocument = PlatformBlog & InternalDoc