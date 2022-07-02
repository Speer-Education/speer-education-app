import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useMatch, useLocation } from "react-router-dom";
import CircleLoader from "../../components/Loader/CircleLoader";
import "./MainApp.css";

import AppNavbar from "../../components/AppNavbar/AppNavbar";
import { NoMatch } from "../../pages/Fallback/NoMatch";
import { useSpeerOrg } from "../../hooks/useSpeerOrg";
import NotFoundPage from "../../pages/Fallback/NotFoundPage";

const LazyMessages = lazy(
  () => import("../../pages/MainApp/Messaging/Messaging")
);
const LazyMentorsPage = lazy(
  () => import("../../pages/MainApp/Mentors/Mentors")
);
const LazyProfilePage = lazy(
  () => import("../../pages/MainApp/ProfilePage/ProfilePage")
);
const LazyOrgAdmin = lazy(
  () => import("../../pages/MainApp/Admin/Admin")
)
const LazyDashboard = lazy(
  () => import("../../pages/MainApp/Dashboard/Dashboard")
);

export default function MainApp() {

  return (
    <>
      <AppNavbar />
      <Suspense
        fallback={
          <div className="grid place-items-center w-screen h-app bg-gray-100">
            {" "}
            <CircleLoader />{" "}
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<LazyDashboard />} />
          <Route path="/orgadmin/*" element={<LazyOrgAdmin />} />
          <Route path="/mentors" element={<LazyMentorsPage />} />
          <Route path="/profile/:profileId" element={<LazyProfilePage />} />
          <Route path="/profile" element={<LazyProfilePage isUser={true} />} />
          <Route path="/messages/*" element={<LazyMessages />} />
          <Route path="/*" element={<NotFoundPage />} />
          {/* Refactored and Migrated Code */}
        </Routes>
      </Suspense>
    </>
  );
}
