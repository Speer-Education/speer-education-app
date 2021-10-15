import React, { useEffect, useState, Fragment } from 'react';
import { db } from '../../config/firebase';
import { Link } from 'react-router-dom';

export default function BlogShowcase() {
  
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    //read video data from firebase
    return db.collection('blogs').onSnapshot(snap => {
      let data = snap.docs.map(docSnap => {
        return {
          id: docSnap.id,
          ...docSnap.data()
        }
      })
      setBlogData(data);
    });
  }, []);
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
          <div className="flex flex-row space-x-2 cursor-pointer" key={blog.id}>
            <div className="flex flex-col text-sm">
              <b>{blog.title}</b>
              <p className="text-gray-500">{blog.description.slice(0, 30) + "..."}</p>
            </div>
          </div>
        )}
        {/* TODO: Uncomment this when we implement blog page */}
        {/* <div><Link to="/blogs" className="text-blue-700 underline text-xs">See all Blogs</Link></div> */}
      </div>
    </>
  );
}



