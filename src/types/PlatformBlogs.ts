import { firebase } from '../config/firebase';
import {InternalDoc} from './DocConverter';
export type PlatformBlog = {
    authorUid: string,
    body: string,
    description: string,
    postedOn: firebase.firestore.Timestamp,
    title: string,
    views: number,
}

export type PlatformBlogDocument = PlatformBlog & InternalDoc