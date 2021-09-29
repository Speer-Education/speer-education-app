import React, { Suspense, lazy, useEffect } from 'react';
import "./App.css";
import Home from "./pages/Home/Home";
import { useAuth } from "./hooks/useAuth";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import history from './hooks/history';
import ServiceWorkerWrapper from './components/ServiceWorker/ServiceWorkerWrapper';
import AppLoader from './components/Loader/AppLoader';
import FallbackPage from './pages/Fallback/FallbackPage';
import {ErrorBoundary} from 'react-error-boundary';
import NotFoundPage from './pages/Fallback/NotFoundPage';
import { logEvent } from './utils/analytics';

const LazyLogin = lazy(() => import("./pages/Login/Login"))
const LazyOnboarding = lazy(() => import("./pages/Onboarding/Onboarding"))
const LazyMainApp = lazy(() => import("./container/MainApp/MainApp"))
const LazyAdminApp = lazy(() => import("./container/AdminApp/AdminApp"))

function App() {

  const { user, userDetails } = useAuth();

  useEffect(() => {
    logEvent('app_start', {
      app_version: process.env.REACT_APP_VERSION
    });
  },[]);

  const errorHandler= (error,errorInfo) => {
    console.log('logging error:', error, errorInfo)
  }

  return (
    <ErrorBoundary FallbackComponent={FallbackPage} onError={errorHandler}>
      <Router history={history}>
        <div className="app bg-gray-100 min-h-screen">
          <Suspense fallback={<AppLoader/>}>
            {user !== false? <Switch>
              <Route exact path={"/login"} component={LazyLogin} />
              <Route exact path={"/onboarding"} component={LazyOnboarding} /> {/* Onboarding form to get the neccesary details before starting */}
              <Route path="/admin" component={LazyAdminApp} /> {/* Only render if user is logged in as admin*/}
              <Route path="/" component={LazyMainApp} /> {/* In the future, we make it so it only renders if user is logged in */}
              {/* <Route path="*" component={NotFoundPage}/> */}
            </Switch>:<Switch>
              <Route exact path={"/login"} component={LazyLogin} />
            </Switch>}
            {user === false && <Route path="/">
                <Redirect to="/login" />
              </Route>}
          </Suspense>
          <ServiceWorkerWrapper/>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
