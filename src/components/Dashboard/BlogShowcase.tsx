import { useEffect, useState } from 'react';
import { blogConverter } from '../../config/firebase';
import DialogBase from '../Dialog/DialogBase';
import BlogContent from '../Blog/BlogContent';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, query, orderBy, where } from 'firebase/firestore';
import { DialogActions, DialogContent } from '@mui/material';
import { useSpeerOrg } from '../../hooks/useSpeerOrg';
import {BlogDocument} from '../../types/Blogs';
import {format} from 'date-fns';
import {useSnackbar} from 'notistack';


export default function BlogShowcase() {
  const { orgRef } = useSpeerOrg();
  const [blogData = [], loading, error] = useCollectionData<BlogDocument>(query(collection(orgRef, 'blogs').withConverter(blogConverter), where('status', '==', 'published'), orderBy('postedOn', 'desc')));
  const [blogOpen, setBlogOpen] = useState(false);
  const [activeBlog, setActiveBlog] = useState<BlogDocument>();

  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
      if (error) enqueueSnackbar(error.message, { variant: 'error' });
  }, [error, enqueueSnackbar]); 

  const handleShowBlog = (blog) => {
    setActiveBlog(blog);
    setBlogOpen(true);
  }

  //TODO: Add loading

  return (
    <>
      {/**? display the video img base on list read from firebase */}
      <div className="flex flex-col w-300 min-w-500 md:shadow-lg rounded-md md:bg-white space-y-3">
        <div className="hidden md:flex flex-row space-x-2 pl-3 pt-3">
          <img src="/full-transparent-logo.png" className="h-7" alt="logo" />
          <h3 className="text-base">Blogs</h3>
        </div>
        {blogData.length === 0 && <div className="flex flex-row space-x-2 cursor-pointer">
            <div className="flex flex-col text-sm">
              <b>No Blogs Yet</b>
              <p className="text-gray-500">We have yet to upload any blogs, stay tuned!</p>
            </div>
          </div>}
        <div className='space-y-1'>
        {blogData.map(blog =>
          <div className="flex flex-row space-x-2 cursor-pointer bg-white rounded-md shadow-md md:shadow-none p-2" key={blog.id} onClick={e => handleShowBlog(blog)}>
            <div className="flex flex-col text-sm flex-1">
              <b>{blog.title}</b>
              <p className="overflow-hidden overflow-ellipsis whitespace-nowrap flex-1 max-w-[30ch] pr-2">{blog.description}</p>
            </div>
            <p className='text-sm font-semibold text-gray-400'>{format(blog.postedOn.toDate(), 'yyyy-MM-dd')}</p>
          </div>
        )}
        </div>
        <DialogBase open={blogOpen} onClose={() => setBlogOpen(false)}>
        
                <DialogContent className="mt-2 h-full space-y-2 py-2 max-h-[70vh] overflow-y-auto">
                  {activeBlog && <BlogContent content={activeBlog}/>}
                </DialogContent>
                <DialogActions>
                  {/* <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => setBlogOpen(false)}
                  >
                    <OpenInNewTwoToneIcon className="text-base mr-2"/> Open Page
                  </button> */}
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 float-right text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => setBlogOpen(false)}
                  >
                    Close
                  </button>
                </DialogActions>
        </DialogBase>
        {/* TODO: Uncomment this when we implement blog page */}
        {/* <div><Link to="/blogs" className="text-blue-700 underline text-xs">See all Blogs</Link></div> */}
      </div>
    </>
  );
}



