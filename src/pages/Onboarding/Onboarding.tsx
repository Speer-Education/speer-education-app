import { PropsWithChildren, useState } from 'react';
import './Onboarding.css';
import { gradeOptions, countryOptions } from './OnboardingConfig';
import { functions } from '../../config/firebase';
import Button from '@mui/material/Button';
import { Helmet } from "react-helmet";
import Spinner from '../../components/Loader/Spinner';
import Picker, { IEmojiData } from 'emoji-picker-react';
import { GitHub, LanguageOutlined } from '@mui/icons-material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { InputAreaField, InputField, InputSelect } from '../../components/Forms/Inputs';
import DatePicker from '@mui/lab/DatePicker';
import { useAuth } from '../../hooks/useAuth';
import * as Sentry from "@sentry/react";
import { Controller, useForm } from 'react-hook-form';
import { Slide } from '@mui/material';
import { FixMeLater } from '../../types/temp';
import {Timestamp} from 'firebase/firestore';
import {CountryCode, ActiveRoom, UserHighlight} from '../../types/User';
import {FormEmojiPicker} from '../../components/Forms/EmojiPicker';
import FormDatePicker from '../../components/form-components/FormDateTimePicker';
import { useSnackbar } from 'notistack';
import { httpsCallable } from 'firebase/functions';


const FormRow = ({ children }: PropsWithChildren<{}>) => (
    <div className="flex flex-wrap -mx-3 mb-6">{children}</div>
)

type FormValues = {
    name: string;
    dateOfBirth: Date;
    email: string;
    country: CountryCode;
    biography: string;
    education: {
        major: string;
        school: string;
        graduationDate: Date;
        country: CountryCode;
    }[],
    highlights: UserHighlight[],
    socials: {
        github: string;
        personal: string;
        youtube: string;
    },
}

export default function UserDetails() {
    const { getUserTokenResult } = useAuth();
    const [pageNumber, setPageNumber] = useState(1);
    const { register, control, handleSubmit, watch, setValue, formState: { isValid, isSubmitting } } = useForm<FormValues>({
        mode: 'all',
        defaultValues: {
            name: '',
            dateOfBirth: new Date(new Date(0).setFullYear(2000)),
            country: '',
            biography: '',
            education: [{
                major: '',
                school: '',
                graduationDate: new Date(new Date(0).setFullYear(2000)),
            }],
            highlights: [{
                emoji: '',
                description: '',
            },
            {
                emoji: '',
                description: '',
            }],
            socials: {
                github: '',
                personal: '',
                youtube: '',
            },
        }
    });
    const { enqueueSnackbar } = useSnackbar();
    const [updatingClaims, setUpdatingClaims] = useState(false);
    const form = watch()
    console.log(form)
    const callOnboarding = async (numTries: number, form: FixMeLater) => {
        if (numTries > 9){
            throw new Error ("Onboarding function failed too many times")
        }
        await httpsCallable(functions, 'onBoarding')({ form: form })
            .catch((error) => {
                callOnboarding(numTries +1, form)
            })
    }

    //To submit the form when the user hits submit (Yet to implement)
    const onSubmit = async (data: FormValues) => {
        // Only submit if the entered a name
        if (isValid === true) {
            console.log("Valid Form")
        } else {
            // Trigger some sort of UI to tell the user they need to fill up all the inputs
            console.log("Submission unsuccessful, please fill up all the inputs")
        }
        const submitForm = {
            ...data,
            //@ts-ignore
            country: data.country.value,
        };
        try {
            await callOnboarding(0, submitForm)
            console.log('onBoarding setup was successful, attempting to get finishSetup token')
            getUserTokenResult(true)
            setUpdatingClaims(true);
            console.log('[UI] Show Setting Up Account Screen')
            //Create a timeout to forcefully update the claims again
            setTimeout(() => {
                Sentry.captureMessage("onBoarding timeout, updating token was not successful");
                console.log('onBoarding timeout, updating token was not successful')
                enqueueSnackbar('Something went wrong, please try again', { variant: 'error' });
                setUpdatingClaims(false);
                getUserTokenResult(true)
                // navigate("/")
            },10*1000)
        } catch (e) {
            Sentry.captureException(e);
            console.error('onBoarding submission error occured',e)
            enqueueSnackbar('Something went wrong, please try again', { variant: 'error' });
            setUpdatingClaims(false);
        }
    }


    return (
        <div className="bg-gray-100 md:h-screen overflow-x-hidden flex justify-center md:items-center">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Onboarding | Speer Education</title>
            </Helmet>
            {!updatingClaims ? <div className="flex flex-col md:flex-row  bg-white rounded-2xl onboardingForm shadow-xl">
                <div className="flex-1 pr-2 py-3 space-y-2 onboardingForm__welcomeContainer">
                    <img className="object-contain w-[70%]" src="/full-transparent-logo.png" alt="speer logo"/>
                    <h1 className="text-3xl md:text-5xl font-black -mt-8 pl-10 w-72 pb-3 md:pb-0">We're so <span style={{color: "#F08E17"}}>excited</span> for you to join us!</h1>
                    <p className=" pl-10 mt-3 text-gray-500">You can change these details later!</p>
                </div>
                <div className="flex-1 text-left p-12 relative">
                    <div className="flex flex-col">
                        {/* Looks weird on Mobile*/}
                        <Slide
                            direction="left" 
                            in={pageNumber === 1} 
                            mountOnEnter 
                            unmountOnExit
                        >
                            <div className="mt-2">
                                <FormRow>
                                    {/* Name */}
                                    <InputField {...register('name', {required: true})} required type="text" className="md:w-64 mb-6 md:mb-0" label="What is your full name" placeholder="John Doe"/>
                                </FormRow>
                                <FormRow>
                                    {/* Date Of Birth */}
                                    <div className="md:w-1/2 mb-6 md:mb-0 flex flex-row items-baseline" >
                                        <FormDatePicker
                                            control={control}
                                            name="dateOfBirth"
                                            disableFuture
                                            label="Your Date of Birth"
                                            inputFormat="dd/MM/yyyy"
                                        />
                                    </div>
                                </FormRow>
                                <FormRow>
                                    <Controller
                                        control={control}
                                        name="country"
                                        rules={{required: true}}
                                        render={({field: {onChange, value}}) => (
                                            <InputSelect 
                                                required 
                                                className="md:w-1/2 mb-6 md:mb-0" 
                                                label="Country of Residence"
                                                options={countryOptions}
                                                value={value}
                                                onChange={onChange}/>
                                        )}/>
                                </FormRow>
                            </div>
                        </Slide>
                        <Slide
                            direction="left" 
                            in={pageNumber === 2} 
                            mountOnEnter 
                            unmountOnExit
                        >
                            <div className="mt-2">
                                <FormRow>
                                    {/* Their school Name: */}
                                    <InputField {...register('education.0.school', {required: true})}  required type="text" className="md:w-64 mb-6 md:mb-0" label="Name of Your School" placeholder="Harvard University"/>
                                    {/* Grade */}
                                </FormRow>
                                <FormRow>
                                    <FormDatePicker
                                        control={control}
                                        name="education.0.graduationDate"
                                        views={['year']}
                                        className="md:w-full mb-6 md:mb-0" 
                                        label="Year Of Graduation from your School"
                                        inputFormat="yyyy"
                                    />
                                </FormRow>
                                    {/* What they plan to major in */}
                                <FormRow>
                                    <InputField {...register('education.0.major', {required: true})}  required type="text" className="md:w-64 mb-6 md:mb-0" label="Current/Intended Major" placeholder="Economics, Business ...."/>
                                </FormRow>
                            </div>
                        </Slide>
                        <Slide
                            direction="left" 
                            in={pageNumber === 3} 
                            mountOnEnter 
                            unmountOnExit
                        >
                            <div className="mt-2">
                                <FormRow>
                                    <InputAreaField 
                                        {...register('biography', {required: true})}
                                        required 
                                        className="resize-none"
                                        //@ts-ignore
                                        rows={3}
                                        maxLength={300} 
                                        type="text" 
                                        label="Your Biography" 
                                        placeholder="Tell us something about yourself........" />
                                </FormRow>
                                <p className="block titlecase tracking-wide text-gray-700 text-xs font-bold mb-2" style={{color: "#2596be"}}>
                                    Show the world what you're proud of <span className="text-red-600">*</span>
                                </p>                            
                                <FormRow>
                                    {/* TODO: Change this to the emoji selecter */}
                                    <FormEmojiPicker
                                        control={control}
                                        name="highlights.0.emoji"/>
                                    <InputField
                                        {...register('highlights.0.description', { required: true })}
                                        required
                                        type="text"
                                        label=""
                                        className="md:w-3/4 mb-6 md:mb-0"
                                        autoWidth
                                        placeholder="eg. Marketing Lead @ Amce Inc" />
                                    </FormRow>
                                    <FormRow>
                                    {/* TODO: Change this to the emoji selecter */}
                                    <FormEmojiPicker
                                        control={control}
                                        name="highlights.1.emoji"/>
                                    <InputField
                                        {...register('highlights.1.description', { required: true })}
                                        required
                                        type="text"
                                        label=""
                                        className="md:w-3/4 mb-2 md:mb-0"
                                        autoWidth
                                        placeholder="eg. CEO @ Amce Labs" />
                                </FormRow>
                            </div>
                        </Slide>
                        <Slide
                            direction="left" 
                            in={pageNumber === 4} 
                            mountOnEnter 
                            unmountOnExit
                        >
                            <div className="mt-2">
                                <p className="block titlecase tracking-wide text-gray-700 text-xs font-bold mb-2" style={{color: "#2596be"}}>
                                    Link your socials (optional):
                                </p>
                                <FormRow >
                                    <div className={`px-3`}>
                                        <GitHub style={{ fontSize: 42 }}></GitHub>
                                    </div>                                
                                    <InputField {...register('socials.github')} type="text" className="md:w-3/4 mb-6 md:mb-0" autoWidth placeholder="Github Link" label=""/>   
                                </FormRow>
                                <FormRow >
                                    <div className={`px-3`}>
                                        <LanguageOutlined style={{ fontSize: 42 }}></LanguageOutlined>
                                    </div>                                
                                    <InputField {...register('socials.personal')} type="text" className="md:w-3/4 mb-6 md:mb-0" autoWidth placeholder="Personal Website Link" label=""/>   
                                </FormRow>
                                <FormRow>
                                    <div className={`px-3`}>
                                        <YouTubeIcon style={{ fontSize: 42 }}></YouTubeIcon>
                                    </div>                                
                                    <InputField {...register('socials.youtube')} type="text" className="md:w-3/4 mb-6 md:mb-0" autoWidth placeholder="Youtube Link" label=""/>   
                                </FormRow>
                            </div>
                        </Slide>
                        {pageNumber === 4? !isValid && <p className="mb-5 text-red-600">Please go back and fill all fields. Not all fields are filled.</p> : null}
                    </div>
                    <div className="absolute bottom-5 right-5 space-x-2">
                        {/* Only render the back button if not on first section*/}
                        {pageNumber !== 1 && <Button 
                            disabled={isSubmitting}
                            onClick={() => setPageNumber(pageNumber-1)} 
                            variant="contained"
                            color="primary">Back
                        </Button>}
                        {/* Only render the next button if not on last section */}
                        {pageNumber !== 4? <Button 
                            onClick={() => setPageNumber(pageNumber+1)} 
                            variant="contained"
                            color="secondary">
                            Next
                        </Button> : <Button
                            type="submit"
                            onClick={handleSubmit(onSubmit)}
                            disabled={!isValid || isSubmitting}
                            variant="outlined"
                            color="secondary"
                        >
                            {isSubmitting ? <Spinner /> : "Submit"}
                        </Button>}
                    </div>
                </div>
            </div> : <>
            {<Snackbar open={true} autoHideDuration={3000}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    Your Profile is now completed!
                </Alert>
            </Snackbar>}
            <div className="grid place-items-center w-screen h-screen">
                <div className="flex flex-col items-center space-y-2">
                    <img className="object-contain w-24 p-4" src="/rocket-logo@3x.png" alt="speer rocket logo"/>
                    <h2>Setting Up Your Account...</h2>
                    <p>This might take a while</p>
                    <div className="animate-pulse h-2 rounded-md w-52 bg-gray-400"></div>
                </div>
            </div>
            </>}
        </div>
    )
}
