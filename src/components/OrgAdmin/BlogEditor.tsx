import {doc, DocumentReference, setDoc, Timestamp, collection} from 'firebase/firestore';
import {useCallback, useEffect, useMemo, useRef, FC} from 'react';
import { useDocumentData, useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { blogConverter} from '../../config/firebase';
import { useSpeerOrg } from "../../hooks/useSpeerOrg";
import { MDEditor } from "../Blog/Editor/mdeditor";
import { Delta } from 'quill';
import { Button } from "@mui/material";
import {SimpleUserDetails} from '../../types/User';
import { useAuth } from "../../hooks/useAuth";
import { BlogDocument } from "../../types/Blogs";
import FormCheckbox from '../form-components/FormCheckbox';
import ReactQuill from 'react-quill';

type BlogForm = {
    title: string;
    description: string;
    body: {
        html: string;
        delta: Delta
    },
    published: boolean;
}

const BlogEditor: FC = () => {
    const { id } = useParams();
    const { orgRef } = useSpeerOrg();
    const { user, userDetails } = useAuth();
    const navigate = useNavigate();

    const blogId = useMemo(() => (!id || id == 'new')? doc(collection(orgRef, 'blogs')).id : id, [id, orgRef]);
    const [blogDoc, loading, error] = useDocumentData   <BlogDocument>(doc(orgRef, 'blogs', blogId).withConverter(blogConverter));
    const { control, register, handleSubmit, watch, setValue, reset, formState: { isValid, isSubmitting } } = useForm<BlogForm>({
        mode: 'onChange',
        defaultValues: {
            title: blogDoc?.title,
            description: blogDoc?.description,
            body: {
                html: blogDoc?.body?.html,
                delta: blogDoc?.body?.delta
            },
            published: blogDoc?.status == 'published'
        }
    });
    const editorRef = useRef<ReactQuill>(null);
    if(error) console.error(loading, error);
    useEffect(() => {
        reset({
            title: blogDoc?.title,
            description: blogDoc?.description,
            body: {
                html: blogDoc?.body?.html,
                delta: blogDoc?.body?.delta
            },
            published: blogDoc?.status == 'published'
        });
        if(blogDoc?.status == 'published') {
            editorRef.current?.setEditorReadOnly(editorRef.current.getEditor(), true);
        }
    }, [blogDoc]);  

    const onSave = async (data: BlogForm) => {
        if(!user || !userDetails) return;
        console.log(blogId)
        await setDoc(doc(orgRef, 'blogs', blogId).withConverter(blogConverter), {
            ...data,
            postedOn: Timestamp.now(),
            author: {
                id: user.uid,
                name: userDetails.name,
            },
            status: data.published? 'published' : 'draft',
        } as any, { merge: true })
        if(id == 'new') navigate('../blogs/' + blogId);
        // navigate('../blogs/list');
    }

    return (
        <div>
            <h1 className='text-base text-gray-400'>Blog Editor</h1>
            <input {...register('title', { required: true })} className="my-3 outline-none text-gray-900 text-3xl font-bold bg-transparent border-0 border-b-2 border-transparent border-gray-200 focus:border-gray-400 w-full bg-white" placeholder="Title" />
            <input {...register('description', { required: true })} className="my-3 outline-none text-gray-900 text-base bg-transparent border-0 border-b-2 border-transparent border-gray-200 focus:border-gray-400 w-full bg-white" placeholder="Description" />
            <Controller
                key={blogDoc?.id}
                control={control}
                name="body.delta"
                render={({ field: { onChange, value } }) => (
                    <MDEditor ref={editorRef} docId="test" value={value as Delta} onChange={(content, delta, source, editor) => {
                        onChange(editor.getContents())
                        setValue('body.html', content)
                    }}/>
                )}
            />
            <FormCheckbox
                control={control}
                name="published"
                label="Published"
                />
            <Button
                variant='contained'
                disabled={!isValid || isSubmitting}
                onClick={handleSubmit(onSave)}
                >Save</Button>
        </div>
    );
}

export default BlogEditor;