import React from 'react';
import { Switch, Route } from "react-router-dom";
import AppNavbar from '../../components/AppNavbar/AppNavbar';
import { useAuth } from '../../hooks/useAuth';
import BlogEditor from '../../pages/AdminApp/Users/Blogs/Editor/BlogEditor';
import Users from '../../pages/AdminApp/Users/Users';

export default function AdminApp() {

    const { userDetails } = useAuth();

    return (
        <div>
            <AppNavbar/>
            {/* Only exist if user is admin */}
            {userDetails?.isAdm && <Switch>
                {/* Main Page */}
                <Route exact path ={`/admin`}>
                    <h1>Admin Page</h1>
                    <a href ={`/admin/users`}>Users</a>
                </Route>
                {/* User Manage Page */}
                <Route exact path={`/admin/users`} component={Users} />
                {/* Blog Management Page */}
                <Route exact path={`/admin/blog-manager`}>
                    <h1>Manage Blog</h1>
                </Route>
                <Route exact path={`/admin/blog/:slug`} component={BlogEditor} />
            </Switch>}
        </div>
    )
}
