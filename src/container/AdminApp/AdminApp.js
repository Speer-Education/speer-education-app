import React from 'react';
import { Routes, Route } from "react-router-dom";
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
            {userDetails?.isAdm && <Routes>
                <Route path="/" element={<>
                    <h1>Admin Page</h1>
                    <a href ={`/users`}>Users</a>
                </>}/>
                <Route path={`/users`} element={<Users/>} />
                <Route path={`/blog-manager`} element={<h1>Manage Blog</h1>} />
                <Route path={`/blog/:slug`} element={<BlogEditor/>} />
            </Routes>}
        </div>
    )
}
