import { firebase } from '../config/firebase';
export type InternalDoc = {
    id: string,
    ref: firebase.firestore.DocumentReference,
}