import React from 'react';

const PostLoader = () => {
    return (
        <div className="py-4 px-6 bg-white rounded-lg shadow-lg flex-1 animate-pulse space-y-2">
            <div className=" flex space-x-4">
                <div className="rounded-full bg-gray-300 h-12 w-12"></div>
                <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-gray-300 rounded w-3/12"></div>
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-300 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-11/12"></div>
                        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row space-x-2">
                <div className="h-[32px] bg-gray-200 w-[86px] rounded-md"></div>
                <div className="h-[32px] bg-gray-200 w-[120px] rounded-md"></div>
            </div>
        </div>
    );
}

export default PostLoader;
