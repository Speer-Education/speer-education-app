import { Timestamp } from "firebase/firestore";
import { InternalDoc } from "./DocConverter";
import {Delta} from 'quill';
import {SimpleUserDetails} from './User';

export type Blog = {
    title: string;
    description: string;
    body: {
        html: string;
        delta: Delta
    },
    author: SimpleUserDetails,
    status: 'draft' | 'published',
    postedOn: Timestamp,
}
export type BlogDocument = Blog & InternalDoc;