import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/storage";
import "firebase/compat/functions";
import "firebase/compat/analytics";
import { isDevelopment } from "../utils/environment";
import { DocumentData, DocumentReference, QueryDocumentSnapshot, SnapshotOptions, WithFieldValue } from 'firebase/firestore';
import {PostDocument, UserPostData} from '../types/Posts';

const firebaseConfig = {
  apiKey: "AIzaSyAx-OEKEZF6LgX5wv03qRilbGTWIJvL4kw",
  authDomain: 'auth.speeredu.com',
  databaseURL: "https://speer-education-dev-default-rtdb.firebaseio.com",
  projectId: "speer-education-dev",
  storageBucket: "speer-education-dev.appspot.com",
  messagingSenderId: "768215592962",
  appId: "1:768215592962:web:944d85b44e2cdc2e0c371b",
  measurementId: "G-19MWDB3T0C"
};

//Make sure there are firebase apps loaded to initialize
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

//make sure firestore caches everything that it needs
firebase.firestore().settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
});

const app = firebase.app();
const auth = firebase.auth();
const db = firebase.firestore();
const rtdb = firebase.database();
const now = firebase.firestore.Timestamp.now();
const storage = firebase.storage();
const functions = firebase.functions();

let analytics: firebase.analytics.Analytics | null = null;

if (isDevelopment()) {
  // dev code
  // analytics = firebase.analytics();
} else {
  // production code
  analytics = firebase.analytics();
}

// FOR LOCAL EMULATORS  =================
// db.useEmulator("localhost", 8080);
// rtdb.useEmulator("localhost", 9000);
// functions.useEmulator("localhost", 5001);

//Enable persistence for firestore so it saves in browser
db.settings({ cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED });

db.enablePersistence()

export { firebase, auth, db, now, storage, rtdb, functions, analytics };

console.log(app.name ? "Firebase Mode Activated!" : "Firebase not working :(");

export const docConverter = {
  toFirestore(doc: WithFieldValue<any>): DocumentData {
      const { id, ref, ...docWithoutId } = doc;
      return docWithoutId;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): {
    id: string,
    ref: DocumentReference,
    [x: string]: any
  } {
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