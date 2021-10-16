import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { db } from '../../config/firebase';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

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
    return (<div ref={ref}>
        {!loading && <article className="prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]} >{body}</ReactMarkdown>
        </article>}
    </div>
    );
})

export default BlogContent;
