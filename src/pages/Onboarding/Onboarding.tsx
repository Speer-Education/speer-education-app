import { useState } from 'react';
import './Onboarding.css';
import { gradeOptions, countryOptions } from './OnboardingConfig';
import { functions } from '../../config/firebase';
import Button from '@mui/material/Button';
import { Helmet } from "react-helmet";
import Spinner from '../../components/Loader/Spinner';
import Picker from 'emoji-picker-react';
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


const FormRow = ({ children }) => (
    <div className="flex flex-wrap -mx-3 mb-6">{children}</div>
)

type FormValues = {
    name: string,
    hsGradYear: {
        value: string
        label: string
    },
    dateOfBirth: Date
    country: {
        value: string
        label: string
    },
    school: string
    major: string
    bio: string
    highlight1: {
        emoji: string,
        description: string
    },
    highlight2: {
        emoji: string,
        description: string
    },
    socials: {
        github: string
        personal: string
        youtube: string
    }
}

export default function UserDetails() {
    const { getUserTokenResult } = useAuth();
    const [pageNumber, setPageNumber] = useState(1);
    const { register, control, handleSubmit, watch, setValue, formState: { isValid, isSubmitting } } = useForm<FormValues>({
        mode: 'all',
        defaultValues: {
            name: "",
            hsGradYear: {
                value: "",
                label: ""
            },
            country: {
                value: "",
                label: ""
            },
            school: "",
            major: "",
            bio: "",
            highlight1: {
                emoji: "🚀",
                description: ""
            },
            highlight2: {
                emoji: "🗣",
                description: ""
            },
            socials: {
                github: "",
                personal: "",
                youtube: "",
            }
        }
    });
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [updatingClaims, setUpdatingClaims] = useState(false);
    const [showPicker1, setShowPicker1] = useState(false);
    const [showPicker2, setShowPicker2] = useState(false);
    const [showError, setShowError] = useState(false);
    const highlight1 = watch('highlight1')
    const highlight2 = watch('highlight2')
    const form = watch()
    console.log(form)
    const callOnboarding = async (numTries, form) => {
        if (numTries > 9){
            throw new Error ("Onboarding function failed too many times")
        }
        await functions
            .httpsCallable('onBoarding')({ form: form })
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
            country: data.country.label,
            hsGradYear: data.hsGradYear.label,
            dateOfBirth: data.dateOfBirth.toLocaleString()
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
                setShowError(true)
                setUpdatingClaims(false);
                getUserTokenResult(true)
                // navigate("/")
            },10*1000)
        } catch (e) {
            Sentry.captureException(e);
            console.error('onBoarding submission error occured',e)
            setShowError(true)
            setUpdatingClaims(false);
        }
    }


    const handleHighlight1Emoji = (event, emojiObject) => {
        setValue("highlight1.emoji", emojiObject.emoji)
        setShowPicker1(false)
    };

    const handleHighlight2Emoji = (event, emojiObject) => {
        setValue("highlight2.emoji", emojiObject.emoji)
        setShowPicker2(false)
    };


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
                                        <Controller
                                            control={control}
                                            name="dateOfBirth"
                                            rules={{required: true}}
                                            render={({ field: { onChange, onBlur, value, ref }}) => (
                                                <DatePicker
                                                    disableFuture
                                                    open={showDatePicker}
                                                    onClose={() => setShowDatePicker(false)}
                                                    label="Your Date of Birth"
                                                    inputFormat="dd/MM/yyyy"
                                                    value={value}    
                                                    onChange={onChange}
                                                    renderInput={({ 
                                                        ref,
                                                        inputProps,
                                                        disabled,
                                                        onChange,
                                                        value
                                                    }) => 
                                                        <InputField 
                                                            required
                                                             //@ts-ignore
                                                            ref={ref}
                                                            value={value}
                                                            label="Your Date of Birth"
                                                            disabled={disabled}
                                                            placeholder="dd/mm/yyyy"
                                                            onChange={onChange}
                                                            //@ts-ignore
                                                            onClick={(e) => setShowDatePicker(true)}
                                                            {...inputProps} />
                                                    }
                                                />
                                            )}
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
                                    <InputField {...register('school', {required: true})}  required type="text" className="md:w-64 mb-6 md:mb-0" label="Name of Your School" id="school" name="school" placeholder="Harvard University"/>
                                    {/* Grade */}
                                </FormRow>
                                <FormRow>
                                    <Controller
                                        control={control}
                                        name="hsGradYear"
                                        rules={{required: true}}
                                        render={({ field: { onChange, value }}) => (
                                            <InputSelect 
                                                required 
                                                className="md:w-full mb-6 md:mb-0" 
                                                label="Year Of Graduation from High School" 
                                                options={gradeOptions}
                                                value={value}
                                                onChange={onChange}/>
                                        )}/>
                                </FormRow>
                                    {/* What they plan to major in */}
                                <FormRow>
                                    <InputField {...register('major', {required: true})}  required type="text" className="md:w-64 mb-6 md:mb-0" label="Current/Intended Major" placeholder="Economics, Business ...." id="major" name="major"/>
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
                                        {...register('bio', {required: true})}
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
                                    <div className="px-3">
                                        <Button variant="outlined" style={{height: "40px", width: "40px"}} id="highlight1Emoji" onClick={() => setShowPicker1(!showPicker1)}>{highlight1.emoji || "Pick an emoji"}</Button>
                                    </div>
                                    {showPicker1 ? <Picker 
                                        onEmojiClick={handleHighlight1Emoji} 
                                        pickerStyle={{ zIndex:"1",position:"absolute",left: "130px" }} /> : null}
                                    <InputField 
                                        {...register('highlight1.description', {required: true})} 
                                        required 
                                        type="text" 
                                        label=""
                                        className="md:w-3/4 mb-6 md:mb-0" 
                                        autoWidth 
                                        placeholder="eg. Marketing Lead @ Amce Inc" />
                                </FormRow>
                                <FormRow>
                                    {/* TODO: Change this to the emoji selecter */}
                                    <div className="px-3">
                                        <Button variant="outlined" style={{height: "40px", width: "40px"}} id="highlight2Emoji" onClick={() => setShowPicker2(!showPicker2)}>{highlight2.emoji || "Pick an emoji"}</Button>
                                    </div>
                                    {showPicker2 ? <Picker 
                                        onEmojiClick={handleHighlight2Emoji} 
                                        pickerStyle={{ zIndex:"1",position:"absolute",left: "130px" }} /> : null}
                                    <InputField 
                                        {...register('highlight2.description', {required: true})} 
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
            <Snackbar open={showError} onClose={() => setShowError(false)} autoHideDuration={3000}>
                <Alert severity="error" onClose={() => setShowError(false)} sx={{ width: '100%' }}>
                    An Error Occuured
                </Alert>
            </Snackbar>
        </div>
    )
}
