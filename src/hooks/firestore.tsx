import { useState, useEffect } from 'react';
import { firebase, db } from '../config/firebase';
import { FixMeLater } from '../types/temp';

const useDocListener = (path: string) => {
    const [doc, setDoc] = useState({});
    useEffect(() => {
        return db.doc(path).onSnapshot(snap => {
            setDoc({
                ...snap.data(),
                id: snap.id,
                loaded: true
            })
        })
    }, [path, setDoc])
    return doc
}

const updateDoc = async (path: string, updates: FixMeLater) => {
    delete updates.id;
    return await db.doc(path).set({
        ...updates,
        _updatedOn: firebase.firestore.FieldValue.serverTimestamp(),
        _createdOn: !updates.createdOn && firebase.firestore.FieldValue.serverTimestamp()
    },{merge:true})
}

const getNewDocId = (path: string) => db.collection(path).doc().id

const deletePost = (path: string) => db.doc(path).delete();

const getSnapshot = (ref: firebase.firestore.CollectionReference | firebase.firestore.Query ) => new Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>>((resolve, reject) => {
    let unsubscribe = ref.onSnapshot((snapshot) => {
        unsubscribe();
        resolve(snapshot)
    })
})


export { useDocListener, updateDoc, getNewDocId, deletePost, getSnapshot }
