import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useAuth } from "../../hooks/useAuth";
import {Helmet} from "react-helmet";
import { useSkipPageAfterAuth } from '../../hooks/useSkipPageAfterAuth';
import { auth } from '../../config/firebase';
import AppLoader from '../../components/Loader/AppLoader';
import FormTextField from '../../components/form-components/FormTextField';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

export default function Login() {
    const { initGoogleSignIn } = useAuth();
    const [loggingIn, setLoggingIn] = useState(true);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    useSkipPageAfterAuth();
    const { control, handleSubmit, formState: { isValid } } = useForm<{
        email: string,
        password: string
    }>({
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const googleSignIn = (e) => {
        e.preventDefault();
        initGoogleSignIn();
    }

    const onLogIn = (data) => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error.code);
                if(error.code == 'auth/user-not-found') {
                    //User does not exist, create user
                    createUserWithEmailAndPassword(auth, data.email, data.password)
                        .then(async result => {
                            await sendEmailVerification(result.user);
                            navigate('/verify')
                        })
                        .catch(error => {
                            console.log(error.message);
                            enqueueSnackbar(error.message, {
                                variant: 'error'
                            })
                        });
                } else {
                    enqueueSnackbar(error.message, {
                        variant: 'error'
                    })
                }
            });
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
                    <div className="flex flex-col items-center space-y-3">
                        <div className="flex flex-col space-y-1 min-w-[350px]">
                            <FormTextField
                                control={control}
                                variant="filled"
                                name="email"
                                label="Email"
                                size="small"
                                rules={{ required: true }}
                                type="email"
                                />
                            <FormTextField
                                control={control}
                                variant="filled"
                                name="password"
                                label="Password"
                                size="small"
                                rules={{ required: true }}
                                type="password"
                                />
                            <Button onClick={handleSubmit(onLogIn)}>Login</Button>
                        </div>
                        <Button type="submit" onClick={googleSignIn} variant="contained" color="primary" startIcon={<i className="fab fa-google"></i>}>Sign In With Google</Button>

                    </div>
                </div>
                <div className="flex-1 hidden md:block">
                    <img className="w-full h-full object-contain p-32" src="/rocket-logo@3x.png" alt="speer rocket logo"/>
                </div>
            </div>
        </div>
    )
}