import React from 'react';
import MentorShowcase from '../../../components/Dashboard/MentorShowcase';
import PostComposerCard from '../../../components/Dashboard/PostComposerCard';
import PostStream from '../../../components/Dashboard/PostStream';

import './Dashboard.css';

function Dashboard() {
    return (
        <div className="dashboard">
            <MentorShowcase/>
            <div className="stream_container">
                <PostComposerCard />
                <PostStream/>
            </div>
            <div className="flex-1">

            </div>
        </div>
    )
}

export default Dashboard
