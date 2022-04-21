import {firebase} from '../config/firebase';
import { Delta } from 'quill';
import {InternalDoc} from './DocConverter';
export type UserPostData = {
    author: string,
    content: {
        delta: Delta,
        html: string
    },
    views: number,
    commentCount: number,
    likeCount: number,
    organization: string | null,
    _updatedOn: firebase.firestore.Timestamp,
    _createdOn: firebase.firestore.Timestamp,
}

export type PostComments = {
    author : {
        uid: string,
        major: string,
        school: string,
        name: string,
    },
    comment: string,
    commentedOn: firebase.firestore.Timestamp,
    parentPost: string,
}

export type PostDocument = UserPostData & InternalDoc
export type PostCommentDocument = PostComments & InternalDoc