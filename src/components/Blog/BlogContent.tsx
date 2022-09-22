import { forwardRef, useEffect } from 'react';
import { docConverter } from '../../config/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { doc } from 'firebase/firestore';
import { useSpeerOrg } from '../../hooks/useSpeerOrg';
import { BlogDocument } from '../../types/Blogs';
import {useSnackbar} from 'notistack';

const BlogContent = forwardRef<HTMLDivElement, { content: BlogDocument }>(({ content: { id: slug } }, ref) => {
    const { orgRef } = useSpeerOrg();
    const [content, loading, error] = useDocumentData<BlogDocument>(doc(orgRef, 'blogs', slug).withConverter(docConverter));

    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        if (error) enqueueSnackbar(error.message, { variant: 'error' });
    }, [error, enqueueSnackbar]); 
    
    if(loading) {
        return <div>Loading...</div>
    }
    const { title, body } = content!;

    //TODO: Sanitize __html
    return <div ref={ref} className="w-[calc(100vw-24px)] sm:w-[300px] md:w-[450px] [&_img]:w-full">
        <h1>{title}</h1>
        {!loading && <article className="prose" dangerouslySetInnerHTML={{__html: body.html}}/>}
    </div>
})

export default BlogContent;
