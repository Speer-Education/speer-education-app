import PropTypes from "prop-types";
import React, { useEffect, useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { db } from '../../config/firebase';

export default function YoutubeEmbed() {
  
  let [embed_id, setembed_id] = useState([]);
  let [isOpen, setIsOpen] = useState(false)
  const [Video_data, setVideo_data] = useState([]);

  //set pop up state
  function closeModal() {
    setIsOpen(false)
  }

  function openModal(embedId) {
    setembed_id(embedId)
    setIsOpen(true)
  }

  useEffect(() => {
    //read video data from firebase
    return db.collection('video').onSnapshot(snap => {
      let data = snap.docs.map(docSnap => {
        return {
          id: docSnap.id,
          ...docSnap.data()
        }
      })
      setVideo_data(data);
    });
  }, []);
  return (
    <>
      {/**? display the video img base on list read from firebase */}
      <div className="flex flex-col w-300 p-3 min-w-500 m-2 shadow-lg rounded-md bg-white space-y-3">
        <div className="flex flex-row space-x-2">
          <img src="/full-transparent-logo.png" className="h-7" alt="logo" />
          <h3 className="text-base">Education</h3>
        </div>
        {Video_data.map(data =>
          <div className="flex flex-row space-x-2 cursor-pointer" onClick={() => openModal(data.youtubeid)}>
            <img src={`http://img.youtube.com/vi/${data.youtubeid}/0.jpg`} height="90px" width="160px" style={{aspectRatio:'16/9'}}/>
            <div className="flex flex-col text-sm">
              <b>{data.title}</b>
              <p className="text-gray-500">{data.description.slice(0, 30) + "..."}</p>
            </div>
          </div>
        )}
        <div><a href="https://www.youtube.com/" target="_blank" className="text-blue-700 underline text-xs">See all Videos</a></div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-y-10 z-0 inset-x-1"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-max max-w-full h-max max-h-full p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="mt-2">
                  <iframe
                    width="800px"
                    height="450px"
                    src={`https://www.youtube.com/embed/${embed_id}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Close Video
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}



