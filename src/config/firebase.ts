import { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";
import "firebase/functions";
import "firebase/analytics";
import { isDevelopment } from "../utils/environment";
import { CACHE_SIZE_UNLIMITED, collection, CollectionReference, doc, DocumentData, DocumentReference, enableMultiTabIndexedDbPersistence, Firestore, FirestoreDataConverter, getFirestore, initializeFirestore, QueryDocumentSnapshot, SnapshotOptions, Timestamp, WithFieldValue } from 'firebase/firestore';
import {PostDocument, UserPostData} from '../types/Posts';
import { InternalDoc } from "../types/DocConverter";
import { PublicUserDoc, UserDetailsDocument } from "../types/User";
import { MessageRoomDocument } from "../types/Messaging";
import { FixMeLater } from "../types/temp";
import {Blog, BlogDocument} from '../types/Blogs';
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";
import { Analytics, getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAx-OEKEZF6LgX5wv03qRilbGTWIJvL4kw",
  authDomain: 'auth.speeredu.com',
  // authDomain: 'speer-education-dev.firebaseapp.com', //! Temp as domain is not renewed
  databaseURL: "https://speer-education-dev-default-rtdb.firebaseio.com",
  projectId: "speer-education-dev",
  storageBucket: "speer-education-dev.appspot.com",
  messagingSenderId: "768215592962",
  appId: "1:768215592962:web:944d85b44e2cdc2e0c371b",
  measurementId: "G-19MWDB3T0C"
};

//Make sure there are firebase apps loaded to initialize
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// //make sure firestore caches everything that it needs
// firebase.firestore().settings({
//   cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
// });

// const app = firebase.app();
// const auth = firebase.auth();
// const db = firebase.firestore();
// const rtdb = firebase.database();
// const now = firebase.firestore.Timestamp.now();
// const storage = firebase.storage();
// const functions = firebase.functions();

// let analytics: firebase.analytics.Analytics | null = null;

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
// Get all the services we'll use in this app, then export them
const auth = getAuth(firebase)
const db = getFirestore(firebase); //We'll limit the cache size to 40MB for now. else client side will get super bloated
const rtdb = getDatabase(firebase);
const functions = getFunctions(firebase);
const storage = getStorage(firebase);
const now = Timestamp.now();


let analytics: Analytics | null = null;
if (isDevelopment()) {
  // dev code
  // analytics = firebase.analytics();
} else {
  // production code
  analytics = getAnalytics(firebase);
}

// FOR LOCAL EMULATORS  =================
// db.useEmulator("localhost", 8080);
// rtdb.useEmulator("localhost", 9000);
// functions.useEmulator("localhost", 5001);



enableMultiTabIndexedDbPersistence(db)

export { firebase, auth, db, now, storage, rtdb, functions, analytics };

console.log(firebase.name ? "Firebase Mode Activated!" : "Firebase not working :(");

export const docConverter = {
  toFirestore(doc: WithFieldValue<any>): DocumentData {
      const { id, ref, ...docWithoutId } = doc;
      return docWithoutId;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): {
    [x: string]: any
  } & InternalDoc {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      ref: snapshot.ref,
      ...data,
    };
  },
};

export const postConverter = {
  toFirestore(doc: PostDocument): DocumentData {
      const { id, ref, content, ...docWithoutId } = doc;
      return {
        ...docWithoutId,
        content: {
          ...content,
          delta: JSON.stringify(content.delta)
        }
      };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): PostDocument {
    const data = snapshot.data(options) as Omit<UserPostData, 'content'> & { content: { delta: string, html: string } };
    return {
      id: snapshot.id,
      ref: snapshot.ref,
      ...data,
      content: {
        ...data.content,
        delta: JSON.parse(data.content.delta)
      }
    };
  },
};
export const typeCollection: ({
  <T extends InternalDoc>(base: Firestore, ...pathSegments: string[]): CollectionReference<T>;
  <T extends InternalDoc>(base: DocumentReference<T>, ...pathSegments: string[]): CollectionReference<T>;
}) = <T extends InternalDoc>(base: FixMeLater, ...pathSegments: string[]) => {
  return collection(base, pathSegments[0], ...pathSegments.slice(1)).withConverter({
    toFirestore(doc: T): DocumentData {
        const { id, ref, ...docWithoutId } = doc;
        return docWithoutId;
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): T {
      const data = snapshot.data(options) as Omit<T, 'id' | 'ref'>;
      return {
        id: snapshot.id,
        ref: snapshot.ref,
        ...data,
      } as T;
    },
  });
}

export const blogConverter = {
  toFirestore(doc: BlogDocument): DocumentData {
      const { id, ref, body, ...docWithoutId } = doc;
      return {
        body: {
          html: body.html,
          delta: JSON.stringify(body.delta)
        },
        ...docWithoutId
      };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): BlogDocument {
    const data = snapshot.data(options) as Omit<Blog, 'body'> & { body: { delta: string, html: string } };
    return {
      id: snapshot.id,
      ref: snapshot.ref,
      ...data,
      body: {
        ...data.body,
        delta: JSON.parse(data.body.delta)
      }
    } as BlogDocument;
  },
}

export const publicUserCollection = typeCollection<PublicUserDoc>(db, 'usersPublic');
export const usersCollection = typeCollection<UserDetailsDocument>(db, 'users');
export const roomsCollection = typeCollection<MessageRoomDocument>(db, 'rooms');
