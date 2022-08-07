import React, { Suspense, lazy, useEffect } from 'react';
import "./App.css";
import { useAuth } from "./hooks/useAuth";
import { Router, Routes, Route, Navigate } from "react-router-dom";
import ServiceWorkerWrapper from './components/ServiceWorker/ServiceWorkerWrapper';
import AppLoader from './components/Loader/AppLoader';
import FallbackPage from './pages/Fallback/FallbackPage';
import {ErrorBoundary} from 'react-error-boundary';
import NotFoundPage from './pages/Fallback/NotFoundPage';
import { logEvent } from './utils/analytics';
import useRoutingInstrumentation from 'react-router-v6-instrumentation';
import * as Sentry from '@sentry/react';
import {Integrations} from '@sentry/tracing';

const LazyLogin = lazy(() => import("./pages/Login/Login"))
const LazyOnboarding = lazy(() => import("./pages/Onboarding/Onboarding"))
const LazyMainApp = lazy(() => import("./container/MainApp/MainApp"))
const LazyVerify = lazy(() => import("./pages/Login/Verify"))
const LazyForgotPassword = lazy(() => import("./pages/Login/ForgotPassword"))

function App() {

  const { user, authing } = useAuth();
  const routingInstrumentation = useRoutingInstrumentation();
  useEffect(() => {
    Sentry.init({
      dsn: "https://0ea940615ee84c89a07bb2e2cc91dbfe@o992434.ingest.sentry.io/5949937",
      //@ts-ignore
      integrations: [new Integrations.BrowserTracing({
        //@ts-ignore
        routingInstrumentation
      })],
    
      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
    });
  }, [routingInstrumentation]);

  useEffect(() => {
    logEvent('app_start', {
      app_version: process.env.REACT_APP_VERSION
    });
  },[]);

  const errorHandler= (error: Error, errorInfo: {
    componentStack: string;
  }) => { 
    console.log('logging error:', error, errorInfo)
  }
  return (
    <ErrorBoundary FallbackComponent={FallbackPage} onError={errorHandler}>
      <div className="app bg-gray-100 min-h-screen">
        <Suspense fallback={<AppLoader/>}>
          <Routes>
            {user && user !== null && <>
              <Route path="/*" element={<LazyMainApp />}/>
              <Route path="/onboarding" element={<LazyOnboarding />}/>
              <Route path="/verify" element={<LazyVerify />}/>
            </>}
            {user === null &&  <>
              <Route path="/login" element={<LazyLogin />}/>
              <Route path="/forgot_password" element={<LazyForgotPassword />}/>
              <Route path="/*" element={<Navigate to="/login" />}/>
            </>}
            {/* // <Route path="/*" element={<NotFoundPage/>}/> */}
          </Routes>
        </Suspense>
        <ServiceWorkerWrapper/>
      </div>
    </ErrorBoundary>
  );
}

export default App;
