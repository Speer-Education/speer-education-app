import React, { forwardRef } from 'react';
import { MDEditor as Editor } from './Editor/mdeditor';

const BlogContent = forwardRef(({ content }, ref) => {
    const { title, body, description } = content;
    return (
        <article className="prose" ref={ref}>
            <Editor 
                defaultValue={body} 
                readOnly={true}/>
        </article>
    );
})

export default BlogContent;
