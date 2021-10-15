import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { db } from '../../config/firebase';
import { MDEditor } from './Editor/mdeditor.js';

const BlogContent = forwardRef(({ content: { id: slug } }, ref) => {
    const [content, setContent] = useState({});
    const { id, title, body, description } = content;
    const [loading, setLoading] = useState(true);
    const editorRef = useRef();
    useEffect(() => {
        setLoading(true)
        db.doc(`/blogs/${slug}`).onSnapshot(doc => {
            setContent({
                ...doc.data()
            })
            setLoading(false)
        })
    }, [slug])
    console.log(body)
    return (<div ref={ref}>
        {!loading && <article className="prose">
            {<MDEditor 
                ref={editorRef}
                key={slug}
                defaultValue={body}
                readOnly={true}
                onChange={val => console.log(val())} 
                />}
        </article>}
    </div>
    );
})

export default BlogContent;
