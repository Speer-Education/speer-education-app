import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useAuth } from "../../hooks/useAuth";
import {Helmet} from "react-helmet";
import { useSkipPageAfterAuth } from '../../hooks/useSkipPageAfterAuth';
import { auth } from '../../config/firebase';
import AppLoader from '../../components/Loader/AppLoader';
import FormInputText from '../../components/form-components/FormTextField';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword, getRedirectResult, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import useKeyPress from '../../hooks/useKeyPress';

export default function Login() {
    const { initGoogleSignIn } = useAuth();
    const [loggingIn, setLoggingIn] = useState(true);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    useSkipPageAfterAuth();
    const enterPressed = useKeyPress('Enter');

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

    const onLogIn = (data: {email: string, password: string}) => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then(result => {
            })
            .catch(error => {
                if(error.code == 'auth/user-not-found') {
                    //User does not exist, create user
                    createUserWithEmailAndPassword(auth, data.email, data.password)
                        .then(async result => {
                            await sendEmailVerification(result.user);
                            navigate('/verify')
                        })
                        .catch(error => {
                            console.error(error.message);
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

    useEffect(() => {
        if (enterPressed) {
            handleSubmit(onLogIn)();
        }
    }, [enterPressed]);

    //Check if user is trying to login, else show login page
    useEffect(() => {
        getRedirectResult(auth).then(result => {
            // If user just signed in or already signed in, hide spinner.
            if (result && result.user || auth.currentUser) {
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
                <title>Login | Catalyst Education</title>
            </Helmet>
            <div className="flex flex-row w-screen h-screen">
                <div className="flex-1 text-left p-6 md:p-20 bg-white space-y-4">
                    <img className="h-24 -ml-4" src="/full-transparent-logo.png" alt="speer logo"/>
                    <div className="space-y-2 text-speer-yellow font-extrabold">
                        <h1><span className="text-speer-blue">We Are</span> Catalyst</h1>
                        <h1>We help you connect to people</h1>
                    </div>
                    <p className="text-gray-600">Sign up or Login to find out what we can do for you!</p>
                    <div className="flex flex-col max-w-[350px] space-y-3">
                        <div className="flex flex-col space-y-1 ">
                            <FormInputText
                                control={control}
                                variant="filled"
                                name="email"
                                label="Email"
                                size="small"
                                rules={{ required: true }}
                                type="email"
                                />
                            <FormInputText
                                control={control}
                                variant="filled"
                                name="password"
                                label="Password"
                                size="small"
                                rules={{ required: true }}
                                type="password"
                                />
                            <Link to="/forgot_password">
                                <p className='underline text-speer-blue font-semibold'>Forgot Password?</p>
                            </Link>
                            <Button variant="outlined" onClick={handleSubmit(onLogIn)}>Sign Up/Login</Button>
                        </div>
                        <Button type="submit" onClick={initGoogleSignIn} variant="contained" color="primary" startIcon={<i className="fab fa-google"></i>}>Sign In With Google</Button>

                    </div>
                </div>
                <div className="flex-1 hidden md:block">
                    <img className="w-full h-full object-contain p-32" src="/rocket-logo@3x.png" alt="speer rocket logo"/>
                </div>
            </div>
        </div>
    )
}
