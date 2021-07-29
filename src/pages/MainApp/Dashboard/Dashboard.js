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
    return (
        <div className="dashboard">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Dashboard | Speer Education</title>
            </Helmet>
            <div className="dashboard_sidebar">
                {/* left side bar */}
                <MentorShowcase/>
                <StatsCard/>
            </div>
            <div className="stream_container">
                {/* center container */}
                <div className="m-2 flex-1 max-w-4xl">
                <p className="font-semibold text-lg pl-4 pt-4">Create a Post</p>
                    <PostComposerCard /> {/* only show if user wants to create a post */}
                    <div className="flex flex-row justify-between w-full">
                        <p className="font-semibold text-lg pl-4 pt-4">Post Feed</p>
                    </div>
                    <PostStream/>
                </div>
            </div>
            <div className="dashboard_sidebar">
                {/* right side bar */}
                <OpenChats/>
                <YoutubeEmbed/>
            </div>
        </div>
    )
}

export default Dashboard
