import {
    CollectionReference,
    DocumentData,
    endAt,
    getDocs,
    limit,
    onSnapshot,
    orderBy,
    query,
    QueryDocumentSnapshot,
    QuerySnapshot,
    startAfter,
    Unsubscribe,
    QueryConstraint,
    startAt,
    updateDoc,
    collection,
    DocumentReference,
    endBefore,
} from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { docConverter } from '../config/firebase';
import { MessageDocument, MessageRoomDocument } from '../types/Messaging';
import {useIsFirestoreRefEqual, useIsFirestoreQueryEqual} from '../utils/firestoreHelper';
import { useAuth } from './useAuth';

const useMessages = (roomRef: DocumentReference<MessageRoomDocument>, {
    pageLimit,
}: {
    pageLimit: number,
}) => {
    const colRef = collection(roomRef, 'messages').withConverter(docConverter);
    const { user } = useAuth();
    const [documents, setDocuments] = useState<MessageDocument[]>([])
    const [finished, setFinished] = useState(false)
    const [loading, setLoading] = useState(true)
    const page = useRef<{
        start: QueryDocumentSnapshot<MessageDocument> | null,
        end: QueryDocumentSnapshot<MessageDocument> | null,
        listeners: Unsubscribe[]
    }>({
        start: null,
        end: null,
        listeners: []
    })

    const reset = () => {
        detachListeners();
        setDocuments([]);
        setFinished(false);
        setLoading(true);
        page.current = {
            start: null,
            end: null,
            listeners: []
        }
    }

    const ref = useIsFirestoreQueryEqual(query(colRef), reset)
    useEffect(() => {
        if(!ref.current) {
            setDocuments([])
            setLoading(false)
            setFinished(true);
        }
        reset()
        getDocuments();

        return () => detachListeners();
    }, [ref.current])


    async function getDocuments() {
        if(!ref.current) return;
        // single query to get startAt snapshot
        let snapshots = await getDocs<MessageDocument>(query(colRef, orderBy('date', 'desc'), limit(pageLimit)))
        
        page.current.start = snapshots.docs[snapshots.docs.length - 1]
        //if no docs found, collection empty and is finished
        if (snapshots.empty) {
            // create listener using startAt snapshot (starting boundary)    
            let listener = onSnapshot(
                query(ref.current, orderBy('date', 'asc'))
                , handleUpdatedMessages)
            // add listener to list
            page.current.listeners.push(listener)
            return;
        } else {
            // create listener using startAt snapshot (starting boundary)    
            let listener = onSnapshot(
                query(ref.current, orderBy('date', 'asc'), startAt(page.current.start))
                , handleUpdatedMessages)
            // add listener to list
            page.current.listeners.push(listener)
        }

    }

    async function loadMore() {
        if(!ref.current || finished) return;
        setLoading(true)
        if (!page.current.start) {
            setFinished(true);
            setLoading(false)
            return;
        }
        // single query to get new startAt snapshot
        let snapshots = await getDocs<MessageDocument>(query(ref.current,
            orderBy('date', 'desc'),
            startAt(page.current.start),
            limit(pageLimit)
        ))
        // previous starting boundary becomes new ending boundary
        page.current.end = page.current.start
        page.current.start = snapshots.docs[snapshots.docs.length - 1]
        // create another listener using new boundaries     
        if (!page.current.end) {
            setFinished(true);
            setLoading(false)
            return;
        }
        let listener = onSnapshot(query(ref.current,
            orderBy('date', 'asc'),
            startAt(page.current.start),
            endBefore(page.current.end))
            , handleUpdatedMessages)
        page.current.listeners.push(listener)
    }

    // call to detach all listeners
    function detachListeners() {
        page.current.listeners.forEach(listener => listener())
    }

    function handleUpdatedMessages(snapshot: QuerySnapshot<MessageDocument>) {
        if(!user) return;
        setDocuments((prevDoc) => {
            let newDocuments: MessageDocument[] = prevDoc.slice();
            snapshot.forEach((doc) => {
                if(!(doc.data()?.read || {})[user.uid]){
                    //@ts-ignore
                    updateDoc(doc.ref, { [`read.${user.uid}`] : true });
                } 
    
                // filter out any duplicates (from modify/delete events)         
                newDocuments = newDocuments.filter(x => x.id !== doc.id)
                newDocuments.push(doc.data())
            })

            // remove post from local array if deleted
            snapshot.docChanges().forEach(change => {
                if (change.type === 'removed') {
                    const doc = change.doc
                    //Remove post from our array if it is here
                    newDocuments = newDocuments.filter(x => x.id !== doc.id)
                }
            });
            newDocuments = newDocuments.filter(({ date }) => date != null);
            //Sort array because it is unsorted, filter date as it might be null
            newDocuments.sort(({ date: x }, { date: y }) => {
                return x.toMillis() - y.toMillis()
            })
            setLoading(false)
            return newDocuments;
        })
    }

    return [documents, loadMore, loading, finished] as [MessageDocument[], () => void, boolean, boolean]
}

export default useMessages;