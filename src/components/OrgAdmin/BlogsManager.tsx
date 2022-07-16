import {collection, query, where} from 'firebase/firestore';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {blogConverter, db, publicUserCollection} from '../../config/firebase';
import {useSpeerOrg} from '../../hooks/useSpeerOrg';
import {useDialog} from '../../hooks/useDialog';
import {useSnackbar} from 'notistack';
import { BlogDocument } from '../../types/Blogs';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import {FC} from 'react';

const BlogsManager: FC = () => {
    const { orgRef, orgDoc } = useSpeerOrg();
    const [blogs = [], loading, error] = useCollectionData<BlogDocument>(collection(orgRef, 'blogs').withConverter(blogConverter));
    const [openDialog, closeDialog] = useDialog();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    return (
        <div className="space-y-4">
            <h1>Blogs Manager</h1>
            <div className='flex flex-col divide-solid divide-x-0 divide-y divide-gray-300'>
                {blogs.map(blog => (
                    <div key={blog.id} className="flex flex-row space-x-2 py-2 cursor-pointer transition-colors hover:bg-gray-50" onClick={() => navigate(`/orgadmin/blogs/${blog.id}`)}>
                        <div className="flex flex-col flex-1">
                            <p className={`text-xs font-semibold uppercase ${blog.status == 'draft'? 'text-gray-400': 'text-green-600'}`}>{blog.status}</p>
                            <h2>{blog.title}</h2>
                            <p>{blog.description}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-sm font-semibold text-gray-400">{blog.author.name}</p>
                            <p className="text-sm font-semibold text-gray-400">On {format(blog.postedOn.toDate(), 'yyyy-MM-dd')}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default BlogsManager;