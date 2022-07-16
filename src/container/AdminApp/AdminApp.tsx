import React from 'react';
import { Routes, Route } from "react-router-dom";
import AppNavbar from '../../components/AppNavbar/AppNavbar';
import { useAuth } from '../../hooks/useAuth';
import Users from '../../pages/AdminApp/Users/Users';

export default function AdminApp() {

    const { userDetails } = useAuth();

    return (
        <div>
            <AppNavbar/>
            {/* Only exist if user is admin */}
            {userDetails?.permissions?.isAdm && <Routes>
                <Route path="/" element={<>
                    <h1>Admin Page</h1>
                    <a href ={`/users`}>Users</a>
                </>}/>
                <Route path={`/users`} element={<Users/>} />
                <Route path={`/blog-manager`} element={<h1>Manage Blog</h1>} />
            </Routes>}
        </div>
    )
}
