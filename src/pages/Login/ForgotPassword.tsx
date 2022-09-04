import {auth} from '../../config/firebase';
import {sendPasswordResetEmail} from 'firebase/auth';


    
import { useAuth } from "../../hooks/useAuth";
import {Helmet} from "react-helmet";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button"
import { useSnackbar } from 'notistack';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import FormInputText from '../../components/form-components/FormTextField';


export default function ForgotPassword() {
    const { user, signOut } = useAuth();
    const { control, handleSubmit, formState: { isValid, isSubmitting, isSubmitSuccessful } } = useForm<{
        email: string
    }>({
        mode: 'onChange',
        defaultValues: {
            email: ''
        }
    });
    const { enqueueSnackbar } = useSnackbar();

    const forgotPassword = async ({ email }: { email: string }) => {
        try {
            await sendPasswordResetEmail(auth, email)
        } catch (error) {
            enqueueSnackbar(error.message, {
                variant: 'error'
            })
            throw error;
        }
    }

    return (
        <div className="bg-gray-100 h-screen overflow-x-hidden">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Sign Up | Catalyst Education</title>
            </Helmet>
            <div className="flex flex-row w-screen h-screen">
                <div className="flex-1 text-left p-6 md:p-20 bg-white space-y-4">
                    <div className="flex flex-row justify-between items-center">
                        <img className="h-24 -ml-4" src="/full-transparent-logo.png" alt="speer logo"/>
                        <div>
                        <Button variant="outlined" color="error" onClick={signOut}>Log out</Button>
                        </div>
                    </div>
                    <div className="space-y-2 text-speer-yellow font-extrabold">
                        <h1><span className="text-speer-blue">We Are</span> Catalyst</h1>
                        <h1>We so excited to meet you</h1>
                    </div>
                    {!isSubmitSuccessful ? <div className='flex flex-col w-[240px] space-y-3'>
                        <h3>Forgotten your password?</h3>
                        <p>It's alright, we'll just send an email to you to reset your password!</p>
                        <FormInputText
                            control={control}
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            variant='filled'
                            size='small'
                            rules={{ required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i }}
                        />
                        <Button
                            variant="outlined"
                            color="primary"
                            disabled={!isValid || isSubmitting}
                            onClick={handleSubmit(forgotPassword)}
                        >
                            Send
                        </Button>
                    </div>: <div className='flex flex-col w-[240px] space-y-3'>
                        <h3>We've sent you an email!</h3>
                        <p>Check your inbox and click the link in the email to reset your password.</p>
                    </div>}
                </div>
                <div className="flex-1 hidden md:block">
                    <img className="w-full h-full object-contain p-32" src="/rocket-logo@3x.png" alt="speer rocket logo"/>
                </div>
            </div>
        </div>
    )
}
    