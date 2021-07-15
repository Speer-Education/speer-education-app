import React, { useState } from 'react';
import MentorShowcase from '../../../components/Dashboard/MentorShowcase';
import PostComposerCard from '../../../components/Dashboard/PostComposerCard';
import PostStream from '../../../components/Dashboard/PostStream';
import NotificationShowcase from '../../../components/Dashboard/NotificationShowcase';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import { IconButton } from '@material-ui/core';

import './Dashboard.css';

function Dashboard() {
    const [createPost, setCreatePost] = useState(false);
    return (
        <div className="dashboard">
            <MentorShowcase/>
            <div className="stream_container shadow-lg m-4">
                <div className="flex flex-row justify-between w-full">
                    <p className="font-semibold text-lg pl-4 pt-4">Your Feed</p>
                    {!createPost ? <IconButton aria-label="delete" className="float-right" onClick={() => setCreatePost(true)}>
                        <EditIcon className="text-blue-600"/>
                    </IconButton>:<IconButton aria-label="delete" className="float-right" onClick={() => setCreatePost(false)}>
                        <CancelIcon className="text-red-600"/>
                    </IconButton>}
                </div>
                {createPost && <PostComposerCard />}
                <PostStream/>
            </div>
            <div className="flex-1">
                <NotificationShowcase/>
            </div>
        </div>
    )
}

export default Dashboard
