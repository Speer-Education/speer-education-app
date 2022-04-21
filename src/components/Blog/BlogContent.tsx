import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { db } from '../../config/firebase';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { PlatformBlogDocument } from '../../types/PlatformBlogs';

const BlogContent = forwardRef<HTMLDivElement, { content: PlatformBlogDocument }>(({ content: { id: slug } }, ref) => {
    const [content, setContent] = useState<PlatformBlogDocument>();
    const { id, title, body, description } = content;
    const [loading, setLoading] = useState<boolean>(true);
    const editorRef = useRef();
    useEffect(() => {
        setLoading(true)
        db.doc(`/blogs/${slug}`).onSnapshot(doc => {
            setContent({
                id: doc.id,
                ref: doc.ref,
                ...doc.data(),
            } as PlatformBlogDocument)
            setLoading(false)
        })
    }, [slug])
    //TODO: Sanitize __html
    return <div ref={ref}>
        {!loading && <article className="prose" dangerouslySetInnerHTML={{__html: body}}/>}
    </div>
})

export default BlogContent;
