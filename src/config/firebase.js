import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAx-OEKEZF6LgX5wv03qRilbGTWIJvL4kw",
  authDomain: "speer-education-dev.firebaseapp.com",
  databaseURL: "https://speer-education-dev-default-rtdb.firebaseio.com",
  projectId: "speer-education-dev",
  storageBucket: "speer-education-dev.appspot.com",
  messagingSenderId: "768215592962",
  appId: "1:768215592962:web:944d85b44e2cdc2e0c371b",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const app = firebase.app();
const auth = firebase.auth();
const db = firebase.firestore();
const rtdb = firebase.database();
const now = firebase.firestore.Timestamp.now();
const storage = firebase.storage();

db.enablePersistence()
db.settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
});

export { firebase, auth, db, now, storage, rtdb };

console.log(app.name ? "Firebase Mode Activated!" : "Firebase not working :(");
