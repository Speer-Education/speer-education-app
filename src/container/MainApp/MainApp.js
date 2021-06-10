import React from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { AppNavbar } from '../../components/AppNavbar/AppNavbar';
import BlogPage from '../../pages/MainApp/Blog/BlogPage';
import Messages from '../../pages/MainApp/Messaging/Messaging';

export default function MainApp() {

    let { path } = useRouteMatch();

    return (
        <>
            <AppNavbar/>
            <Switch>
                {/* Main Page */}
                <Route exact path ={`${path}`}>
                    <h1>Main App Page</h1>
                </Route>
                {/* Mentor Page */}
                <Route path={`${path}/mentors`}> 
                    <h1>Mentors</h1>
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
            </Switch>
        </>
    )
}
