import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { db, docConverter } from '../../config/firebase';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { PlatformBlogDocument } from '../../types/PlatformBlogs';
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { doc } from 'firebase/firestore';
import { useSpeerOrg } from '../../hooks/useSpeerOrg';

const BlogContent = forwardRef<HTMLDivElement, { content: PlatformBlogDocument }>(({ content: { id: slug } }, ref) => {
    const { orgRef } = useSpeerOrg();
    const [content, loading, error] = useDocumentData<PlatformBlogDocument>(doc(orgRef, 'blogs', slug).withConverter(docConverter));
    const editorRef = useRef();
    if(loading) {
        return <div>Loading...</div>
    }
    const { id, title, body, description } = content!;

    //TODO: Sanitize __html
    return <div ref={ref}>
        {!loading && <article className="prose" dangerouslySetInnerHTML={{__html: body}}/>}
    </div>
})

export default BlogContent;
