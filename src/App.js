import React, { Suspense, lazy, useEffect } from 'react';
import "./App.css";
import Home from "./pages/Home/Home";
import { useAuth } from "./hooks/useAuth";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import history from './hooks/history';
import CircleLoader from './components/Loader/CircleLoader';
import ServiceWorkerWrapper from './components/ServiceWorker/ServiceWorkerWrapper';
import AppLoader from './components/Loader/AppLoader';
import { hotjar } from 'react-hotjar';

const LazyLogin = lazy(() => import("./pages/Login/Login"))
const LazyOnboarding = lazy(() => import("./pages/Onboarding/Onboarding"))
const LazyMainApp = lazy(() => import("./container/MainApp/MainApp"))
const LazyAdminApp = lazy(() => import("./container/AdminApp/AdminApp"))

function App() {

  const { user } = useAuth();

  useEffect(() => {
    hotjar.initialize(2565266, 6);
  });

  useEffect(() => {
    if(!user) return;
    hotjar.identify('USER_ID', { userProperty: user.uid });
  }, [user]);

  return (
    <Router history={history}>
      <div className="app bg-gray-100 min-h-screen">
        <Suspense fallback={<AppLoader/>}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path={"/login"} component={LazyLogin} />
            {user !== false ? <>
              <Route path="/app" component={LazyMainApp} /> {/* In the future, we make it so it only renders if user is logged in */}
              <Route path="/admin-app" component={LazyAdminApp} /> {/* Only render if user is logged in as admin*/}
              <Route exact path={"/onboarding"} component={LazyOnboarding} /> {/* Onboarding form to get the neccesary details before starting */}
            </> : null}
            {user === false && <Route path="/">
              <Redirect to="/" />
            </Route>}
          </Switch>
        </Suspense>
        <ServiceWorkerWrapper/>
      </div>
    </Router>
  );
}

export default App;
