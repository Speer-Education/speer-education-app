import React from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { AppNavbar } from '../../components/AppNavbar/AppNavbar';
import BlogEditorPage from '../../pages/MainApp/BlogEditor/BlogEditor';
import BlogPage from '../../pages/MainApp/Blog/BlogPage';
import Messages from '../../pages/MainApp/Messaging/Messaging';
import MentorsPage from '../../pages/MainApp/Mentors/Mentors';
import MentorProfile from '../../pages/MainApp/MentorProfile/MentorProfile';
import EditProfile from '../../pages/MainApp/EditProfile/EditProfile';
import ProfilePage from '../../pages/MainApp/ProfilePage/ProfilePage';
import Dashboard from '../../pages/MainApp/Dashboard/Dashboard';

export default function MainApp() {

    let { path } = useRouteMatch();

    return (
        <>
            <AppNavbar/>
            <Switch>
                {/* Main Page */}
                <Route exact path ={`${path}`}>
                    <Dashboard/>
                </Route>
                {/* Mentor Page */}
                <Route exact path={`${path}/mentors`}> 
                    <MentorsPage/>
                </Route>
                {/* Mentor Profile Page */}
                <Route path={`${path}/mentors/:mentorId`}> 
                    <MentorProfile/>
                </Route>
                {/* Profile Page */}
                <Route path={`${path}/profile/:profileId`}>
                    <ProfilePage/>
                </Route>
                {/* Edit Profile Page */}
                <Route path={`${path}/editProfile`}> 
                    <EditProfile/>
                </Route>
                {/* Chat Page */}
                <Route path={`${path}/messages`}> {/* Fixed routing bug to do with "exact" */}
                    <Messages/>
                </Route>
                {/* Blogs Page */}
                <Route path={`${path}/blogs`}>
                    <h1>Blog</h1>
                </Route>
                {/* Blog Page */}
                <Route path={`${path}/blog/:postId`}>
                    <BlogPage/>
                </Route>
                <Route path={`${path}/blogeditor/:postId`}>
                    <BlogEditorPage/>
                </Route>
            </Switch>
        </>
    )
}
