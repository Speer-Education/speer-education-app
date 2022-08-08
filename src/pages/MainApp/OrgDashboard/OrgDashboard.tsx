import React from 'react';
import MentorShowcase from '../../../components/Dashboard/MentorShowcase';
import PostComposerCard from '../../../components/Dashboard/PostComposerCard';
import PostStream from '../../../components/Dashboard/PostStream';
import OpenChats from '../../../components/Dashboard/OpenChats';
import StatsCard from '../../../components/Dashboard/StatsCard';
import { Helmet } from "react-helmet";
import './OrgDashboard.css';
import BlogShowcase from "../../../components/Dashboard/BlogShowcase";
import { useLocalStorage } from '../../../hooks/useHooks';
import NewUserDialog from '../../../components/Dashboard/NewUserDialog';
import { logEvent } from '../../../utils/analytics';
import Zoom from '@mui/material/Zoom';
import { useParams } from 'react-router-dom';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import { db, docConverter } from '../../../config/firebase';
import { OrganizationDocument } from '../../../types/Organization';

function OrgDashboard() {
    const { orgId } = useParams();
    //@ts-ignore
    const [organization, loading, error] = useDocumentData<OrganizationDocument>(orgId && doc(db, 'organization', orgId).withConverter(docConverter))
    //log error if exists
    if (error) {
        console.error('orgerr',error);
    }

    if(loading || !organization) {
        return <div>Loading...</div>
    }
    
    return (
        <Zoom in={true} >
            <div className="dashboard h-app">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{organization.name} | Speer Education</title>
                </Helmet>
                <div className="dashboard_sidebar">
                    {/* left side bar */}
                    <div className="dashboard_sidebar h-app fixed hidden xl:visible">
                        {/* <MentorShowcase/> */}
                        <StatsCard/>
                    </div>
                </div>
                <div className="stream_container">
                    {/* center container */}
                    <div className="m-2 flex-1 p-2 space-y-2" style={{ maxWidth: "1024px" }}>
                        <h1>{organization.name} Dashboard</h1>
                        <p className="font-semibold text-lg pl-4 pt-4">Create a Post</p>
                        <PostComposerCard organization={orgId}/> {/* only show if user wants to create a post */}
                        <div className="flex flex-row justify-between w-full">
                            <p className="font-semibold text-lg pl-4 pt-4">Post Feed</p>
                        </div>
                        <PostStream organization={orgId}/>
                    </div>
                </div>
                <div className="dashboard_sidebar">
                    {/* right side bar */}
                    <div className="dashboard_sidebar h-app fixed">
                        <OpenChats/>
                        {/* <BlogShowcase /> */}
                    </div>
                </div>
            </div>
        </Zoom>
    )
}

export default OrgDashboard
