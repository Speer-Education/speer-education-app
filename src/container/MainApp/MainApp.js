import React from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { AppNavbar } from '../../components/AppNavbar/AppNavbar';


export default function MainApp() {

    let { path } = useRouteMatch();

    return (
        <div>
            <AppNavbar/>
            <Switch>
                {/* Main Page */}
                <Route exact path ={`${path}`}>
                    <h1>Main App Page</h1>
                </Route>
                {/* Mentor Page */}
                <Route exact path={`${path}/mentors`}>
                    <h1>Mentors</h1>
                </Route>
                {/* Messages Page */}
                <Route exact path={`${path}/message`}>
                    <h1>Message</h1>
                </Route>
                {/* Blog Page */}
                <Route exact path={`${path}/blog`}>
                    <h1>Blog</h1>
                </Route>
            </Switch>
        </div>
    )
}
