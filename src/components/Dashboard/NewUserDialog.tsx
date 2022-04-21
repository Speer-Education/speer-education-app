import React from 'react';
import DialogBase from '../Dialog/DialogBase';

const NewUserDialog = ({onClose, ...props}: { open: boolean, onClose: () => void }) => {
    return (
        <DialogBase onClose={onClose} {...props}>
            <div className="space-y-2 inline-block w-full max-w-2xl p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg max-h-screen overflow-y-auto">
                <div className="mt-2 h-full space-y-2 py-2 max-h-[70vh] overflow-y-auto">
                  <article className="prose">
                    <img className="h-20 block" src="/full-transparent-logo.png" alt="logo"/>
                    <h1>👋 Welcome To Speer 🚀</h1>
                    <p>Speer is a mentorship organization for passionate economics students who wish to learn more about economics/business from college mentors.</p>
                    <h2>Step 1: Post a Welcoming Post</h2>
                    <p>Other users can find more about you through the posts you make! Write something about what you've been doing recently or anything interesting that's been going on in your life.</p> 
                    <h2>Step 2: Conenct with some mentors!</h2>
                    <p>Have any questions? Need some help? Try conencting with our mentors and see how they might be able to help you.</p> 
                    <h2>Step 3: Find new Contacts through Posts or Search! </h2>
                    <p>Speer doesn't just have mentors, there are many other Users waiting for you to find them. Use the Search Bar or click on each User's Profile and message them. It's all about building your network🌍</p> 
                    <br/>
                    <h2 className="text-blue-700">What are you waiting for! Go explore Speer!</h2> 
                  </article>
                </div>
                <div className="mt-4 pt-2">
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
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
            </div>
        </DialogBase>
    );
}

export default NewUserDialog;
