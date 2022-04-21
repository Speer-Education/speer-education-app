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
} from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';

const usePaginateCollection = <DocType extends DocumentData = DocumentData>(ref: CollectionReference<DocType>, {
    orderKey,
    direction,
    pageLimit,
    queryConstraints = [],
    sortFunc,
}: {
    orderKey: string,
    pageLimit: number,
    direction: 'asc' | 'desc',
    queryConstraints?: QueryConstraint[],
    sortFunc?: (a: DocType, b: DocType) => number
}) => {
    const [documents, setDocuments] = useState<DocType[]>([])
    const [finished, setFinished] = useState(false)
    const [loading, setLoading] = useState(true)
    const page = useRef<{
        start: QueryDocumentSnapshot<DocType> | null,
        end: QueryDocumentSnapshot<DocType> | null,
        listeners: Unsubscribe[]
    }>({
        start: null,
        end: null,
        listeners: []
    })

    useEffect(() => {
        //Clear all variables before reloading page.
        page.current = {
            start: null,
            end: null,
            listeners: []
        }
        setDocuments([]);
        getDocuments();

        return () => detachListeners();
    }, [ref])

    function handleUpdatedComments(snapshot: QuerySnapshot<DocType>) {
        setDocuments((prevDoc) => {
            let newDocuments: DocType[] = prevDoc.slice();
            snapshot.forEach((doc) => {
                // filter out any duplicates (from modify/delete events)         
                newDocuments = documents.filter(x => x.id !== doc.id)
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

            //Sort array because it is unsorted
            if (!sortFunc) newDocuments.sort((a, b) => {
                return direction == 'asc' ?
                    a[orderKey] - b[orderKey] : b[orderKey] - a[orderKey]
            })
            else newDocuments.sort(sortFunc)
            setLoading(false)
            return newDocuments;
        })
    }

    async function getDocuments() {
        // single query to get startAt snapshot
        let snapshots = await getDocs<DocType>(query(ref, ...queryConstraints, orderBy('commentedOn', 'desc'), limit(pageLimit)))
        // save startAt snapshot
        page.current.end = snapshots.docs[snapshots.docs.length - 1]
        // create listener using startAt snapshot (starting boundary)    
        let listener = onSnapshot(page.current.end ?
            query(ref, orderBy('commentedOn', 'desc'), endAt(page.current.end)) :
            query(ref, orderBy('commentedOn', 'desc'))
            , handleUpdatedComments)
        // add listener to list
        page.current.listeners.push(listener)
    }

    async function loadMore() {
        setLoading(true)
        if (!page.current.end) {
            setFinished(true);
            setLoading(false)
            return;
        }
        // single query to get new startAt snapshot
        let snapshots = await getDocs<DocType>(query(ref,
            orderBy('commentedOn', 'desc'),
            startAfter(page.current.end),
            limit(pageLimit)
        ))
        // previous starting boundary becomes new ending boundary
        page.current.start = page.current.end
        page.current.end = snapshots.docs[snapshots.docs.length - 1]
        // create another listener using new boundaries     
        if (!page.current) {
            setFinished(true);
            setLoading(false)
            return;
        }
        let listener = onSnapshot(query(ref,
            orderBy('commentedOn', 'desc'),
            endAt(page.current),
            startAfter(page.current))
            , handleUpdatedComments)
        page.current.listeners.push(listener)
    }

    // call to detach all listeners
    function detachListeners() {
        page.current.listeners.forEach(listener => listener())
    }

    return [documents, loadMore, loading, finished] as [DocType[], () => void, boolean, boolean]
}

export default usePaginateCollection;