import { useAuth } from "../../hooks/useAuth";
import {Helmet} from "react-helmet";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import Button from "@mui/material/Button"


export default function Verify() {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(user && user != null && user.emailVerified) {
            navigate('/');
        } else if(user && user != null) {
            const intv = setInterval(() => {
                user.reload()
                    .then(() => {
                        if(user.emailVerified) {
                            navigate('/');
                        }
                    }
                )
            },1000)
            return () => clearInterval(intv);
        }
    }, [user, navigate]);

    return (
        <div className="bg-gray-100 h-screen overflow-x-hidden">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Sign Up | Speer Education</title>
            </Helmet>
            <div className="flex flex-row w-screen h-screen">
                <div className="flex-1 text-left p-20 bg-white space-y-4">
                    <div className="flex flex-row justify-between items-center">
                        <img className="h-24 -ml-4" src="/full-transparent-logo.png" alt="speer logo"/>
                        <div>
                        <Button variant="outlined" color="error" onClick={signOut}>Log out</Button>
                        </div>
                    </div>
                    <div className="space-y-2 text-speer-yellow font-extrabold">
                        <h1><span className="text-speer-blue">We Are</span> Speer</h1>
                        <h1>We so excited to meet you</h1>
                    </div>
                    <p className="text-gray-600">You should've received an verification email in the inbox of {user?.email}.</p>
                    <p className="text-gray-600">If you haven't, please check your spam folder.</p>
                    
                </div>
                <div className="flex-1 hidden md:block">
                    <img className="w-full h-full object-contain p-32" src="/rocket-logo@3x.png" alt="speer rocket logo"/>
                </div>
            </div>
        </div>
    )
}
