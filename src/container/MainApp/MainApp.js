import React, { Suspense, lazy } from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";
import CircleLoader from '../../components/Loader/CircleLoader';
import './MainApp.css';

import AppNavbar from '../../components/AppNavbar/AppNavbar';
import { NoMatch } from '../../pages/Fallback/NoMatch';
const LazyMessages = lazy(() => import('../../pages/MainApp/Messaging/Messaging'))
const LazyMentorsPage = lazy(() => import('../../pages/MainApp/Mentors/Mentors'))
const LazyMentorProfile = lazy(() => import('../../pages/MainApp/MentorProfile/MentorProfile'))
const LazyProfilePage = lazy(() => import('../../pages/MainApp/ProfilePage/ProfilePage'))
const LazyDashboard = lazy(() => import('../../pages/MainApp/Dashboard/Dashboard'))

export default function MainApp() {

    let { path } = useRouteMatch();

    return (
        <>
            <AppNavbar />
            <Suspense fallback={<div className="grid place-items-center w-screen h-app bg-gray-100"> <CircleLoader /> </div>}>
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
                    {/* Profile Page */}
                    <Route exact path={`${path}/profile/`}>
                        <LazyProfilePage isUser={true}/>
                    </Route>
                    {/* Chat Page */}
                    <Route path={`${path}/messages`}> {/* Fixed routing bug to do with "exact" */}
                        <LazyMessages />
                    </Route>
                    <NoMatch/>
                </Switch>
            </Suspense>
        </>
    )
}
