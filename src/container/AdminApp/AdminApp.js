import React from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";

export default function AdminApp() {
    let { path } = useRouteMatch();

    return (
        <div>
            <Switch>
                {/* Main Page */}
                <Route exact path ={`${path}`}>
                    <h1>Admin Page</h1>
                </Route>
                {/* User Manage Page */}
                <Route exact path={`${path}/user-manager`}>
                    <h1>Manage Mentors and Users</h1>
                </Route>
                {/* Blog Management Page */}
                <Route exact path={`${path}/blog-manager`}>
                    <h1>Manage Blog</h1>
                </Route>
                {/* Blog Poster Page */}
                <Route exact path={`${path}/blog-poster`}>
                    <h1>Post Blog</h1>
                </Route>
            </Switch>
        </div>
    )
}
