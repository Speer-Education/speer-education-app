import React, { useEffect, useState, Fragment } from 'react';
import { db } from '../../config/firebase';
import { Link } from 'react-router-dom';
import DialogBase from '../Dialog/DialogBase';
import BlogContent from '../Blog/BlogContent';
import OpenInNewTwoToneIcon from '@mui/icons-material/OpenInNewTwoTone';

export default function BlogShowcase() {
  
  const [blogData, setBlogData] = useState([]);
  const [blogOpen, setBlogOpen] = useState(false);
  const [activeBlog, setActiveBlog] = useState({});
  useEffect(() => {
    //read video data from firebase
    return db.collection('blogs').orderBy('postedOn','desc').onSnapshot(snap => {
      let data = snap.docs.map(docSnap => {
        return {
          id: docSnap.id,
          ...docSnap.data()
        }
      })
      setBlogData(data);
    });
  }, []);

  const handleShowBlog = (blog) => {
    setActiveBlog(blog);
    setBlogOpen(true);
  }

  return (
    <>
      {/**? display the video img base on list read from firebase */}
      <div className="flex flex-col w-300 p-3 min-w-500 m-2 shadow-lg rounded-md bg-white space-y-3">
        <div className="flex flex-row space-x-2">
          <img src="/full-transparent-logo.png" className="h-7" alt="logo" />
          <h3 className="text-base">Blogs</h3>
        </div>
        {blogData.length === 0 && <div className="flex flex-row space-x-2 cursor-pointer">
            <div className="flex flex-col text-sm">
              <b>No Blogs Yet</b>
              <p className="text-gray-500">We have yet to upload any blogs, stay tuned!</p>
            </div>
          </div>}
        {blogData.map(blog =>
          <div className="flex flex-row space-x-2 cursor-pointer" key={blog.id} onClick={e => handleShowBlog(blog)}>
            <div className="flex flex-col text-sm">
              <b>{blog.title}</b>
              <p className="overflow-hidden overflow-ellipsis whitespace-nowrap flex-1 max-w-[40ch] pr-2">{blog.description}</p>
            </div>
          </div>
        )}
        <DialogBase open={blogOpen} onClose={() => setBlogOpen(false)}>
        <div className="space-y-2 inline-block w-full max-w-2xl p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg max-h-screen overflow-y-auto">
                <div className="mt-2 h-full space-y-2 py-2">
                  <BlogContent content={activeBlog}/>
                </div>
                <div className="mt-4 pt-2">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => setBlogOpen(false)}
                  >
                    <OpenInNewTwoToneIcon className="text-base mr-2"/> Open Page
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 float-right text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => setBlogOpen(false)}
                  >
                    Close
                  </button>
                </div>
            </div>
        </DialogBase>
        {/* TODO: Uncomment this when we implement blog page */}
        {/* <div><Link to="/blogs" className="text-blue-700 underline text-xs">See all Blogs</Link></div> */}
      </div>
    </>
  );
}



