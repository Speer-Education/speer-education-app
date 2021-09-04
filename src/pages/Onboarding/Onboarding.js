import { useState, useMemo } from 'react';
import './Onboarding.css';
import { gradeOptions, countryOptions } from './OnboardingConfig';
import { functions } from '../../config/firebase';
import Button from '@material-ui/core/Button';
import { Helmet } from "react-helmet";
import Spinner from '../../components/Loader/Spinner';
import Picker from 'emoji-picker-react';
import { GitHub, LanguageOutlined } from '@material-ui/icons';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { InputAreaField, InputField, InputSelect } from '../../components/Forms/Inputs';
import { Transition } from "@headlessui/react";


const FormRow = ({ children }) => (
    <div class="flex flex-wrap -mx-3 mb-6">{children}</div>
)


export default function UserDetails() {
    // const { user } = useAuth();

    const [pageNumber, setPageNumber] = useState(1);

    // Hard coding default values for the select fields first
    const [form, setForm] = useState({
        name: "",
        hsGradYear: "",
        dateOfBirth: "",
        country: "",
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
    });
    const [updatingClaims, setUpdatingClaims] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [showPicker1, setShowPicker1] = useState(false);
    const [showPicker2, setShowPicker2] = useState(false);


    // To check if all fields are filled up
    const isValidForm = useMemo(() => {
        return form.name !== undefined && form.name !== ""
            && form.hsGradYear !== undefined && form.hsGradYear !== ""
            && form.dateOfBirth !== undefined && form.dateOfBirth !== ""
            && form.country !== undefined && form.country !== ""
            && form.school !== undefined && form.school !== ""
            && form.major !== undefined && form.major !== ""
            && form.bio !== undefined && form.bio !== ""
            && form.highlight1.emoji !== "" && form.highlight1.description !== ""
            && form.highlight2.emoji !== "" && form.highlight2.description !== ""
    }, [form])

    //To submit the form when the user hits submit (Yet to implement)
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        console.log("Form:", form);
        console.log("Is valid form", isValidForm);
        // Only submit if the entered a name
        if (isValidForm === true) {
            console.log("Submission sucessful")
        } else {
            // Trigger some sort of UI to tell the user they need to fill up all the inputs
            console.log("Submission unsuccessful, please fill up all the inputs")
            setSubmitting(false);
        }
        const submitForm = form;
        submitForm.country = form.country.label;
        submitForm.hsGradYear = form.hsGradYear.label;
        //TODO: remove these once the highlight functionality is implemented so we can add them to user document no problem
        //TODO: maybe scope function to "us-central1" so we wont have CORS issue
        await functions.httpsCallable('onBoarding')({ form: submitForm })
            .catch((error) => {
                console.error(error)
            })
        setUpdatingClaims(true);
    }

    //Updates state whenever the user change fields in the form
    const handleFormInput = (e) => {
        const { value, name } = e.target;
        setForm({ ...form, [name]: value });
    };

    // To handle select form inputs.
    const handleCountrySelectFormInput = value => {
        setForm({ ...form, country: value })
    }

    const handleHsGradYearSelectFormInput = value => {
        setForm({ ...form, hsGradYear: value })
    }

    const handleHighlight1Emoji = (event, emojiObject) => {
        setForm({ ...form, highlight1: {
            emoji: emojiObject.emoji,
            description: form.highlight1.description
        }})
        setShowPicker1(false)
    };

    const handleHighlight2Emoji = (event, emojiObject) => {
        setForm({ ...form, highlight2: {
            emoji: emojiObject.emoji,
            description: form.highlight2.description
        }})
        setShowPicker2(false)
    };

    return (
        <div className="bg-gray-100 md:h-screen overflow-x-hidden flex justify-center md:items-center">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Sign Up | Speer Education</title>
            </Helmet>
            {!updatingClaims ? <div className="flex flex-col md:flex-row  bg-white rounded-3xl onboardingForm shadow-xl">
                <div className="flex-1 pr-2 py-3 onboardingForm__welcomeContainer">
                    <img className="object-contain" src="/full-transparent-logo.png" alt="speer logo"/>
                    <h1 className="text-3xl md:text-5xl pl-10 w-72 pb-3 md:pb-0">We're so <span style={{color: "#F08E17"}}>excited</span> for you to join us!</h1>
                </div>
                <div className="flex-1 text-left p-12 relative">
                    <div className="flex flex-col">
                        {/* Looks weird on Mobile*/}
                        <div className="mt-2">
                            <Transition
                                show={pageNumber === 1}
                                enter="transform transition ease-linear duration-200"
                                enterFrom="-translate-x-96 opacity-0"
                                enterTo="translate-x-0 opacity-100 absolute"
                                leave="transform transition ease-linear duration-200"
                                leaveFrom="translate-x-0 opacity-100"
                                leaveTo="translate-x-96 opacity-0 -translate-y-24 absolute"
                            >
                                <FormRow>
                                    {/* Name */}
                                    <InputField required type="text" className="md:w-64 mb-6 md:mb-0" label="What is your full name" placeholder="John Doe" id="fullname" name="name" value={form.name} onChange={handleFormInput} />
                                </FormRow>
                                <FormRow>
                                    {/* Date Of Birth */}
                                    <InputField required type="date" className="md:w-1/2 mb-6 md:mb-0" label="Your Date of Birth" id="dateofbirth" name="dateOfBirth" value={form.dateOfBirth} onChange={handleFormInput} />
                                    {/* Insert Country They Live In (Use a country list)*/}
                                </FormRow>
                                <FormRow>
                                    <InputSelect required className="md:w-1/2 mb-6 md:mb-0" label="Country of Residence" id="country" name="country" options={countryOptions} value={form.country} onChange={handleCountrySelectFormInput} />
                                </FormRow>
                            </Transition>
                            <Transition
                                show={pageNumber === 2}
                                enter="transform transition ease-linear duration-200"
                                enterFrom="-translate-x-96 opacity-0"
                                enterTo="translate-x-0 opacity-100 absolute"
                                leave="transform transition ease-linear duration-200"
                                leaveFrom="translate-x-0 opacity-100"
                                leaveTo="translate-x-96 opacity-0 translate-y-24 absolute"
                            >
                                <FormRow>
                                    {/* Their school Name: */}
                                    <InputField required type="text" className="md:w-64 mb-6 md:mb-0" label="Name of Your School" id="school" name="school" placeholder="Harvard University" value={form.school} onChange={handleFormInput} />
                                    {/* Grade */}
                                </FormRow>
                                <FormRow>
                                    <InputSelect required className="md:w-full mb-6 md:mb-0" label="Year Of Graduation from High School" id="hsGradYear" name="hsGradYear" options={gradeOptions} value={form.hsGradYear} onChange={handleHsGradYearSelectFormInput} />
                                </FormRow>
                                    {/* What they plan to major in */}
                                <FormRow>
                                    <InputField required type="text" className="md:w-64 mb-6 md:mb-0" label="Current/Intended Major" placeholder="Economics, Business ...." id="major" name="major" value={form.major} onChange={handleFormInput} />
                                </FormRow>
                            </Transition>
                            <Transition
                                show={pageNumber === 3}
                                enter="transform transition ease-linear duration-200"
                                enterFrom="-translate-x-96 opacity-0"
                                enterTo="translate-x-0 opacity-100 absolute"
                                leave="transform transition ease-linear duration-200"
                                leaveFrom="translate-x-0 opacity-100"
                                leaveTo="translate-x-96 opacity-0 -translate-y-24 absolute"
                            >
                                <FormRow>
                                    <InputAreaField required style={{ resize: "none"}} rows="3" maxLength="300" type="text" label="Short Biography (Max of 300 characters)" id="bio" name="bio" placeholder="Tell us something about yourself........" value={form.bio} onChange={handleFormInput} />
                                </FormRow>
                                <p className="block titlecase tracking-wide text-gray-700 text-xs font-bold mb-2" style={{color: "#2596be"}}>
                                    Give us the two things you are most proud of <span className="text-red-600">*</span>
                                </p>                            
                                <FormRow>
                                    {/* TODO: Change this to the emoji selecter */}
                                    <div className="px-3">
                                        <Button variant="outlined" style={{height: "40px", width: "40px"}} id="highlight1Emoji" onClick={() => setShowPicker1(!showPicker1)}>{form.highlight1.emoji || "Pick an emoji"}</Button>
                                    </div>
                                    {showPicker1 ? <Picker onEmojiClick={handleHighlight1Emoji} pickerStyle={{ position: "relative", zIndex:1,position:"absolute",left: "130px" }} /> : null}
                                    <InputField required type="text" className="md:w-3/4 mb-6 md:mb-0" autoWidth placeholder="Where you work, study etc..." id="highlight1" name="highlight1" value={form.highlight1.description} onChange={(e) => setForm({...form, highlight1: {emoji: form.highlight1.emoji, description: e.target.value}})}/>
                                </FormRow>
                                <FormRow>
                                    {/* TODO: Change this to the emoji selecter */}
                                    <div className="px-3">
                                        <Button variant="outlined" style={{height: "40px", width: "40px"}} id="highlight2Emoji" onClick={() => setShowPicker2(!showPicker2)}>{form.highlight2.emoji || "Pick an emoji"}</Button>
                                    </div>
                                    {showPicker2 ? <Picker onEmojiClick={handleHighlight2Emoji} pickerStyle={{ position: "relative", zIndex:1,position:"absolute",left: "130px" }} /> : null}
                                    <InputField required type="text" className="md:w-3/4 mb-2 md:mb-0" autoWidth placeholder="Where you work, study etc..." id="highlight2" name="highlight2" value={form.highlight2.description} onChange={(e) => setForm({...form, highlight2: {emoji: form.highlight2.emoji, description: e.target.value}})} />
                                </FormRow>
                            </Transition>
                            <Transition
                                show={pageNumber === 4}
                                enter="transform transition ease-linear duration-200"
                                enterFrom="-translate-x-96 opacity-0"
                                enterTo="translate-x-0 opacity-100 absolute"
                                leave="transform transition ease-linear duration-200"
                                leaveFrom="translate-x-0 opacity-100"
                                leaveTo="translate-x-96 opacity-0 translate-y-24 absolute"
                            >
                                <p className="block titlecase tracking-wide text-gray-700 text-xs font-bold mb-2" style={{color: "#2596be"}}>
                                    Link your socials (optional):
                                </p>
                                <FormRow >
                                    <div className={`px-3`}>
                                        <GitHub style={{ fontSize: 42 }}></GitHub>
                                    </div>                                
                                    <InputField type="text" className="md:w-3/4 mb-6 md:mb-0" autoWidth placeholder="Github Link" value={form.socials.github} onChange={(e) => setForm({...form, socials : {...form.socials, github : e.target.value}})} />   
                                </FormRow>
                                <FormRow >
                                    <div className={`px-3`}>
                                        <LanguageOutlined style={{ fontSize: 42 }}></LanguageOutlined>
                                    </div>                                
                                    <InputField type="text" className="md:w-3/4 mb-6 md:mb-0" autoWidth placeholder="Personal Website Link" value={form.socials.personal} onChange={(e) => setForm({...form, socials : {...form.socials, personal : e.target.value}})} />   
                                </FormRow>
                                <FormRow>
                                    <div className={`px-3`}>
                                        <YouTubeIcon style={{ fontSize: 42 }}></YouTubeIcon>
                                    </div>                                
                                    <InputField type="text" className="md:w-3/4 mb-6 md:mb-0" autoWidth placeholder="Youtube Link" value={form.socials.youtube} onChange={(e) => setForm({...form, socials : {...form.socials, youtube : e.target.value}})} />   
                                </FormRow>
                            </Transition>
                        </div>
                        {pageNumber === 4? !isValidForm && <p className="mb-5 text-red-600">Please go back and fill all fields. Not all fields are filled.</p> : null}
                    </div>
                    <div className="absolute bottom-5 right-5">
                        {/* Only render the back button if not on first section*/}
                        {pageNumber !== 1? <Button onClick={() => setPageNumber(pageNumber-1)} style={{backgroundColor: "#597398", color: 'white', marginRight : "5px"}}>Back</Button> : null}
                        {/* Only render the next button if not on last section */}
                        {pageNumber !== 4? <Button onClick={() => setPageNumber(pageNumber+1)} style={{backgroundColor: "#F08E17", color: 'white'}}>Next</Button> : <Button
                            type="submit"
                            onClick={handleFormSubmit}
                            disabled={!isValidForm || submitting}
                            variant="outlined"
                        >
                            {submitting ? <Spinner /> : "Submit"}
                        </Button>}
                    </div>
                </div>
            </div> : <div className="grid place-items-center w-screen h-screen">
                <div className="flex flex-col items-center space-y-2">
                    <img className="object-contain w-24 p-4" src="/rocket-logo@3x.png" alt="speer rocket logo"/>
                    <h2>Setting Up Your Account...</h2>
                    <p>Please Wait</p>
                    <div className="animate-pulse h-2 rounded-md w-52 bg-gray-400"></div>
                </div>
            </div>}

        </div>
    )
}
