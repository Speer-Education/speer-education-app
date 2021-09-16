import React from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";
import AppNavbar from '../../components/AppNavbar/AppNavbar';
import { useAuth } from '../../hooks/useAuth';
import Users from '../../pages/AdminApp/Users/Users';

export default function AdminApp() {
    let { path } = useRouteMatch();

    return (
        <div>
            <AppNavbar/>
            <Switch>
                {/* Main Page */}
                <Route exact path ={`${path}`}>
                    <h1>Admin Page</h1>
                    <a href ={`${path}/users`}>Users</a>
                </Route>
                {/* User Manage Page */}
                <Route exact path={`${path}/users`} component={Users} />
                {/* Blog Management Page */}
                <Route exact path={`${path}/blog-manager`}>
                    <h1>Manage Blog</h1>
                </Route>
            </Switch>
        </div>
    )
}
