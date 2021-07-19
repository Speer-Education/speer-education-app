import React, { useState } from 'react';
import MentorShowcase from '../../../components/Dashboard/MentorShowcase';
import PostComposerCard from '../../../components/Dashboard/PostComposerCard';
import PostStream from '../../../components/Dashboard/PostStream';
import NotificationShowcase from '../../../components/Dashboard/NotificationShowcase';
import OpenChats from '../../../components/Dashboard/OpenChats';
import StatsCard from '../../../components/Dashboard/StatsCard';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import { IconButton } from '@material-ui/core';
import {Helmet} from "react-helmet";
import './Dashboard.css';
import YoutubeEmbed from "../../../components/Dashboard/Video";

function Dashboard() {
    const [createPost, setCreatePost] = useState(false);
    return (
        <div className="dashboard">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Dashboard | Speer Education</title>
            </Helmet>
            <div>
                {/* left side bar */}
                <MentorShowcase/>
                <StatsCard/>
            </div>
            <div className="stream_container">
                {/* center container */}
                <div className="shadow-md bg-white shadow-lg m-2 flex-1 max-w-4xl rounded-md">
                    <div className="flex flex-row justify-between w-full">
                        <p className="font-semibold text-lg pl-4 pt-4">Your Feed</p>
                        {!createPost ? <IconButton aria-label="delete" className="float-right" onClick={() => setCreatePost(true)}>
                            <EditIcon className="text-blue-600"/>
                        </IconButton>:<IconButton aria-label="delete" className="float-right" onClick={() => setCreatePost(false)}>
                            <CancelIcon className="text-red-600"/>
                        </IconButton>}
                    </div>
                    {createPost && <PostComposerCard />} {/* only show if user wants to create a post */}
                    <PostStream/>
                </div>
            </div>
            <div>
                {/* right side bar */}
                <OpenChats/>
                <YoutubeEmbed embedId="rokGy0huYEA" />
                <p>testing</p>
            </div>
        </div>
    )
}

export default Dashboard
