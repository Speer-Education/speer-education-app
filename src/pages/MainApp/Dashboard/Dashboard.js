import React from 'react';
import MentorShowcase from '../../../components/Dashboard/MentorShowcase';
import PostComposerCard from '../../../components/Dashboard/PostComposerCard';
import PostStream from '../../../components/Dashboard/PostStream';
import OpenChats from '../../../components/Dashboard/OpenChats';
import StatsCard from '../../../components/Dashboard/StatsCard';
import { Helmet } from "react-helmet";
import './Dashboard.css';
import BlogShowcase from "../../../components/Dashboard/BlogShowcase";

function Dashboard() {
    return (
        <div className="dashboard h-app">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Dashboard | Speer Education</title>
            </Helmet>
            <div className="dashboard_sidebar">
                {/* left side bar */}
                <div className="dashboard_sidebar h-app fixed hidden xl:visible">
                    <MentorShowcase/>
                    <StatsCard/>
                </div>
            </div>
            <div className="stream_container">
                {/* center container */}
                <div className="m-2 flex-1 p-2 space-y-2" style={{ maxWidth: "1024px" }}>
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
                <div className="dashboard_sidebar h-app fixed">
                    <OpenChats/>
                    <BlogShowcase/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
