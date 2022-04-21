import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, firebase } from '../../../../../config/firebase';
import { MDEditor as Editor } from '../../../../../components/Blog/Editor/mdeditor';
import { useAuth } from '../../../../../hooks/useAuth';

const BlogEditor = () => {
    const { slug } = useParams()
    const [content, setContent] = useState({});
    const [editedBody, setEditedBody] = useState("");
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const { body } = content;
    const { user } = useAuth();
    const editorRef = useRef();

    useEffect(() => setEditedBody(body), [body]);

    useEffect(() => {
        setLoading(true)
        db.doc(`/blogs/${slug}`).onSnapshot(doc => {
            setContent({
                ...doc.data()
            })
            setLoading(false)
        })
    }, [slug])

    const handleSaveBlog = () => {
        setSaving(true)
        const headings = editorRef.current.getHeadings() || []
        if(headings.length == 0) return setSaving(false)
        db.doc(`/blogs/${slug}`).set({
            ...content,
            title: headings[0].title,
            body: editedBody,
            authorUid: user.uid,
            views: 0,
            description: editedBody.substring(0, 200),
            postedOn: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true })
        .then(() => {
            setSaving(false)
        })
    }
    
    return (
        <div>
            {!loading && <article className="prose">
                {<Editor 
                    ref={editorRef}
                    key={slug}
                    defaultValue={body}
                    readOnly={saving}
                    onChange={val => setEditedBody(val())} 
                    />}
            </article>}
            <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={handleSaveBlog}
            >
            Save
            </button>
        </div>
    );
}

export default BlogEditor;