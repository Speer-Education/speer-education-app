import React, { useEffect, useState } from 'react';
import './Login.css';
import { Button } from '@material-ui/core';
import { useAuth } from "../../hooks/useAuth";
import {Helmet} from "react-helmet";
import { useSkipPageAfterAuth } from '../../hooks/useSkipPageAfterAuth';
import { auth } from '../../config/firebase';
import AppLoader from '../../components/Loader/AppLoader';
export default function Login() {

    const { initGoogleSignIn } = useAuth();
    const [loggingIn, setLoggingIn] = useState(true);
    useSkipPageAfterAuth();

    const googleSignIn = (e) => {
        e.preventDefault();
        initGoogleSignIn();
    }
    
    //Check if user is trying to login, else show login page
    useEffect(() => {
        auth.getRedirectResult().then(result => {
            // If user just signed in or already signed in, hide spinner.
            if (result.user || auth.currentUser) {
                setLoggingIn(true);
            } else {
                setLoggingIn(false);
            }
          });
    });

    if(loggingIn) return <AppLoader/>

    return (
        <div className="bg-gray-100 h-screen overflow-x-hidden">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Login | Speer Education</title>
            </Helmet>
            <div className="flex flex-row w-screen h-screen">
                <div className="flex-1 text-left p-20 bg-white space-y-4">
                    <img className="h-24 -ml-4" src="/full-transparent-logo.png" alt="speer logo"/>
                    <div className="space-y-2 text-speer-yellow font-extrabold">
                        <h1><span className="text-speer-blue">We Are</span> Speer</h1>
                        <h1>We help you connect to people</h1>
                    </div>
                    <p className="text-gray-600">Sign in or register to find out what we can do for you!</p>
                    <Button type="submit" onClick={googleSignIn} variant="contained" color="primary" startIcon={<i className="fab fa-google"></i>}>Sign In With Google</Button>
                </div>
                <div className="flex-1 hidden md:block">
                    <img className="w-full h-full object-contain p-32" src="/rocket-logo@3x.png" alt="speer rocket logo"/>
                </div>
            </div>
        </div>
    )
}
