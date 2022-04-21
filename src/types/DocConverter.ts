import { DocumentReference } from "firebase/firestore";

export type InternalDoc = {
    id: string,
    ref: DocumentReference,
}