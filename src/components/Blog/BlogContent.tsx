import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { db, docConverter } from '../../config/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { doc } from 'firebase/firestore';
import { useSpeerOrg } from '../../hooks/useSpeerOrg';
import { BlogDocument } from '../../types/Blogs';

const BlogContent = forwardRef<HTMLDivElement, { content: BlogDocument }>(({ content: { id: slug } }, ref) => {
    const { orgRef } = useSpeerOrg();
    const [content, loading, error] = useDocumentData<BlogDocument>(doc(orgRef, 'blogs', slug).withConverter(docConverter));
    const editorRef = useRef();
    if(loading) {
        return <div>Loading...</div>
    }
    const { id, title, body, description } = content!;

    //TODO: Sanitize __html
    return <div ref={ref} className="w-[calc(100vw-24px)] sm:w-[300px] md:w-[450px] [&_img]:w-full">
        <h1>{title}</h1>
        {!loading && <article className="prose" dangerouslySetInnerHTML={{__html: body.html}}/>}
    </div>
})

export default BlogContent;
