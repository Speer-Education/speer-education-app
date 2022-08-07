import { collection, CollectionReference, deleteDoc, doc, DocumentData, onSnapshot, Query, QuerySnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { firebase, db } from '../config/firebase';
import { FixMeLater } from '../types/temp';

const useDocListener = (path: string) => {
    const [docs, setDocs] = useState({});
    useEffect(() => {
        return onSnapshot(doc(db, path), snap => {
            setDocs({
                ...snap.data(),
                id: snap.id,
                loaded: true
            })
        })
    }, [path, setDocs])
    return docs
}

const updateDoc = async (path: string, updates: FixMeLater) => {
    delete updates.id;
    return await setDoc(doc(db, path), {
        ...updates,
        _updatedOn: serverTimestamp(),
        _createdOn: !updates.createdOn && serverTimestamp()
    },{merge:true})
}

const getNewDocId = (path: string) => doc(collection(db, path)).id

const deletePost = (path: string) => deleteDoc(doc(db, path));

const getSnapshot = (ref: CollectionReference | Query ) => new Promise<QuerySnapshot<DocumentData>>((resolve, reject) => {
    let unsubscribe = onSnapshot(ref, (snapshot) => {
        unsubscribe();
        resolve(snapshot)
    })
})


export { useDocListener, updateDoc, getNewDocId, deletePost, getSnapshot }
