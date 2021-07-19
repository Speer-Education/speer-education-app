import React, { Suspense, lazy } from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { AppNavbar } from '../../components/AppNavbar/AppNavbar';
// import BlogEditorPage from '../../pages/MainApp/BlogEditor/BlogEditor';
// import BlogPage from '../../pages/MainApp/Blog/BlogPage';

const LazyMessages = lazy(() => import('../../pages/MainApp/Messaging/Messaging'))
const LazyMentorsPage = lazy(() => import('../../pages/MainApp/Mentors/Mentors'))
const LazyMentorProfile = lazy(() => import('../../pages/MainApp/MentorProfile/MentorProfile'))
const LazyEditProfile = lazy(() => import('../../pages/MainApp/EditProfile/EditProfile'))
const LazyProfilePage = lazy(() => import('../../pages/MainApp/ProfilePage/ProfilePage'))
const LazyDashboard = lazy(() => import('../../pages/MainApp/Dashboard/Dashboard'))

export default function MainApp() {

    let { path } = useRouteMatch();

    return (
        <>
            <AppNavbar />
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    {/* Main Page */}
                    <Route exact path={`${path}`}>
                        <LazyDashboard />
                    </Route>
                    {/* Mentor Page */}
                    <Route exact path={`${path}/mentors`}>
                        <LazyMentorsPage />
                    </Route>
                    {/* Mentor Profile Page */}
                    <Route path={`${path}/mentors/:mentorId`}>
                        <LazyMentorProfile />
                    </Route>
                    {/* Profile Page */}
                    <Route path={`${path}/profile/:profileId`}>
                        <LazyProfilePage />
                    </Route>
                    {/* Edit Profile Page */}
                    <Route path={`${path}/editProfile`}>
                        <LazyEditProfile />
                    </Route>
                    {/* Chat Page */}
                    <Route path={`${path}/messages`}> {/* Fixed routing bug to do with "exact" */}
                        <LazyMessages />
                    </Route>
                </Switch>
            </Suspense>
        </>
    )
}
