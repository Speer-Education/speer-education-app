import React, { Suspense, lazy } from 'react';
import { Routes, Route, useMatch } from "react-router-dom";
import CircleLoader from '../../components/Loader/CircleLoader';
import './MainApp.css';

import AppNavbar from '../../components/AppNavbar/AppNavbar';
import { NoMatch } from '../../pages/Fallback/NoMatch';
const LazyMessages = lazy(() => import('../../pages/MainApp/Messaging/Messaging'))
const LazyMentorsPage = lazy(() => import('../../pages/MainApp/Mentors/Mentors'))
const LazyProfilePage = lazy(() => import('../../pages/MainApp/ProfilePage/ProfilePage'))
const LazyDashboard = lazy(() => import('../../pages/MainApp/Dashboard/Dashboard'))

export default function MainApp() {

    return (
        <>
            <AppNavbar />
            <Suspense fallback={<div className="grid place-items-center w-screen h-app bg-gray-100"> <CircleLoader /> </div>}>
                <Routes>
                    <Route path="/" element={<LazyDashboard />} />
                    <Route path="/mentors" element={<LazyMentorsPage />} />
                    <Route path="/profile/:profileId" element={<LazyProfilePage />} />
                    <Route path="/profile" element={<LazyProfilePage isUser={true} />} />
                    <Route path="/messages/*" element={<LazyMessages />} />
                    <Route path="*" element={<NoMatch/>}/>
                    {/* Refactored and Migrated Code */}
                </Routes>
            </Suspense>
        </>
    )
}
