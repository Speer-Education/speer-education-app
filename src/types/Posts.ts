import { Timestamp } from 'firebase/firestore';
import { Delta } from 'quill';
import {InternalDoc} from './DocConverter';
export type UserPostData = {
    author: string,
    content: {
        delta: Delta,
        html: string
    },
    deleted: boolean,
    views: number,
    commentCount: number,
    likeCount: number,
    _updatedOn: Timestamp,
    _createdOn: Timestamp,
}

export type PostComments = {
    author : {
        uid: string,
        major: string,
        school: string,
        name: string,
    },
    comment: string,
    commentedOn: Timestamp,
    parentPost: string,
}

export type PostDocument = UserPostData & InternalDoc
export type PostCommentDocument = PostComments & InternalDoc