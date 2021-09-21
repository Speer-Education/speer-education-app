import React, { Suspense, lazy, useEffect } from 'react';
import "./App.css";
import Home from "./pages/Home/Home";
import { useAuth } from "./hooks/useAuth";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import history from './hooks/history';
import ServiceWorkerWrapper from './components/ServiceWorker/ServiceWorkerWrapper';
import AppLoader from './components/Loader/AppLoader';
import { hotjar } from 'react-hotjar';
import FallbackPage from './pages/Fallback/FallbackPage';
import {ErrorBoundary} from 'react-error-boundary';
import NotFoundPage from './pages/Fallback/NotFoundPage';
import { NoMatch, ProviderHOC } from './pages/Fallback/NoMatch';

const LazyLogin = lazy(() => import("./pages/Login/Login"))
const LazyOnboarding = lazy(() => import("./pages/Onboarding/Onboarding"))
const LazyMainApp = lazy(() => import("./container/MainApp/MainApp"))
const LazyAdminApp = lazy(() => import("./container/AdminApp/AdminApp"))

function App() {

  const { user, userDetails } = useAuth();

  useEffect(() => {
    hotjar.initialize(2565266, 6);
  });

  useEffect(() => {
    if(!user) return;
    hotjar.identify('USER_ID', { userProperty: user.uid });
  }, [user]);

  const errorHandler= (error,errorInfo) => {
    console.log('logging error:', error, errorInfo)
  }

  const RouteManager  = ProviderHOC(NotFoundPage);

  return (
    <ErrorBoundary FallbackComponent={FallbackPage} onError={errorHandler}>
      <Router history={history}>
        <div className="app bg-gray-100 min-h-screen">
          <Suspense fallback={<AppLoader/>}>
            <RouteManager>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path={"/login"} component={LazyLogin} />
                {user !== false ? <>
                  <Route path="/app" component={LazyMainApp} /> {/* In the future, we make it so it only renders if user is logged in */}
                  {userDetails?.isAdm && <Route path="/admin" component={LazyAdminApp} />} {/* Only render if user is logged in as admin*/}
                  <Route exact path={"/onboarding"} component={LazyOnboarding} /> {/* Onboarding form to get the neccesary details before starting */}
                </> : null}
                {user === false && <Route path="/">
                  <Redirect to="/" />
                </Route>}
                <NoMatch/>
              </Switch>
            </RouteManager>
          </Suspense>
          <ServiceWorkerWrapper/>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
