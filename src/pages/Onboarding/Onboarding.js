import { useState, useMemo } from 'react';
import './Onboarding.css';
import Select from 'react-select';
import { gradeOptions, majorOptions, countryOptions } from './OnboardingConfig';
import { updateDoc } from '../../hooks/firestore';
import { useAuth } from '../../hooks/useAuth';
import { functions } from '../../config/firebase';
import Button from '@material-ui/core/Button';
import { Helmet } from "react-helmet";
import Spinner from '../../components/Loader/Spinner';


const InputField = ({ className, label, id, required = false, onChange, ...props }) => {
    const [empty, setEmpty] = useState(false);

    const handleInputChange = e => {
        onChange(e)
        if (required) setEmpty(e.target.value.length == 0)
    }

    return <div className={`w-full px-3 ${className}`}>
        {label && <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for={id}>
            {label} {required ? <span className="text-red-600">*</span> : ""}
        </label>}
        <input className={`appearance-none block w-full ${empty && required ? "bg-red-100" : "bg-gray-200"} text-gray-700 border-0 focus:border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
            id={id}
            onChange={handleInputChange}
            {...props} />
    </div>
}

const InputAreaField = ({ className, label, id, required = false, ...props }) => {
    return <div className={`w-full px-3 ${className}`}>
        {label && <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for={id}>
            {label} {required ? <span className="text-red-600">*</span> : ""}
        </label>}
        <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border-0 focus:border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id={id}
            {...props} />
    </div>
}

const InputSelect = ({ className, label, id, required = false, ...props }) => {
    return <div className={`w-full px-3 ${className}`}>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for={id}>
            {label} {required ? <span className="text-red-600">*</span> : ""}
        </label>
        <Select className="user-details__custom-select" id={id} {...props} />
    </div>
}

const FormRow = ({ children }) => (
    <div class="flex flex-wrap -mx-3 mb-6">{children}</div>
)

export default function UserDetails() {
    const { user } = useAuth();
    // Hard coding default values for the select fields first
    const [form, setForm] = useState({
        name: "",
        grade: "",
        dateOfBirth: "",
        country: "",
        school: "",
        major: "",
        bio: ""
    });
    const [updatingClaims, setUpdatingClaims] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // To check if all fields are filled up
    const isValidForm = useMemo(() => {
        return form.name !== undefined && form.name !== ""
            && form.grade !== undefined && form.grade !== ""
            && form.dateOfBirth !== undefined && form.dateOfBirth !== ""
            && form.country !== undefined && form.country !== ""
            && form.school !== undefined && form.school !== ""
            && form.major !== undefined && form.major !== ""
            && form.bio !== undefined && form.bio !== ""
    }, [form])

    //To submit the form when the user hits submit (Yet to implement)
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        console.log(countryOptions);

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
        submitForm.grade = form.grade.label;
        //TODO: remove these once the highlight functionality is implemented so we can add them to user document no problem
        delete submitForm.highlight1;
        delete submitForm.highlight2;

        await functions.httpsCallable('onBoarding')({ form: submitForm })
            .catch((error) => {
                console.error(error)
            })
        setUpdatingClaims(true);
    }

    //Updates state whenever the user change fields in the form
    const handleFormInput = (e) => {
        console.log(e.target.value);
        const { value, name } = e.target;
        setForm({ ...form, [name]: value });
    };

    // To handle select form inputs.
    const handleCountrySelectFormInput = value => {
        setForm({ ...form, country: value })
    }

    const handleGradeSelectFormInput = value => {
        setForm({ ...form, grade: value })
    }

    return (
        <div className="bg-gray-100 h-screen">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Sign Up | Speer Education</title>
            </Helmet>
            {!updatingClaims ? <div className="flex flex-row w-screen h-screen">
                <div className="flex-1 text-left p-12">
                    <h1>Tell us about yourself!</h1>
                    <div className="flex flex-col">
                        {/* Ask which to make mandatory and then force them to be required*/}
                        <div className="mt-2">
                            <FormRow>
                                {/* Name */}
                                <InputField required type="text" className="md:w-full mb-6 md:mb-0" label="Full Name" placeholder="John Doe" id="fullname" name="name" value={form.name} onChange={handleFormInput} />
                            </FormRow>
                            <FormRow>
                                {/* Date Of Birth */}
                                <InputField required type="date" className="md:w-1/2 mb-6 md:mb-0" label="Date of Birth" id="dateofbirth" name="dateOfBirth" value={form.dateOfBirth} onChange={handleFormInput} />
                                {/* Insert Country They Live In (Use a country list)*/}
                                <InputSelect required className="md:w-1/2 mb-6 md:mb-0" label="Country" id="country" name="country" options={countryOptions} value={form.country} onChange={handleCountrySelectFormInput} />
                            </FormRow>
                            <FormRow>
                                {/* Their school Name: */}
                                <InputField required type="text" className="md:w-1/3 mb-6 md:mb-0" label="Current Education Institute" id="school" name="school" placeholder="Harvard University" value={form.school} onChange={handleFormInput} />
                                {/* Grade */}
                                <InputSelect required className="md:w-1/3 mb-6 md:mb-0" label="Grade" id="grade" name="grade" options={gradeOptions} value={form.grade} onChange={handleGradeSelectFormInput} />
                                {/* What they plan to major in */}
                                <InputField required type="text" className="md:w-1/3 mb-6 md:mb-0" label="Current/Intended Major" placeholder="Economics, Business ...." id="major" name="major" value={form.major} onChange={handleFormInput} />
                            </FormRow>
                            <FormRow>
                                <InputAreaField type="text" label="Short Biography" id="bio" name="bio" placeholder="Tell us something about yourself........" value={form.bio} onChange={handleFormInput} />
                            </FormRow>
                            <h2 className="mb-2">Highlights</h2>
                            <FormRow>
                                {/* TODO: Change this to the emoji selecter */}
                                <InputSelect required className="md:w-1/3 mb-6 md:mb-0" label="Country" id="country" name="country" options={countryOptions} value={form.country} onChange={handleCountrySelectFormInput} />
                                <InputField required type="text" className="md:w-1/3 mb-6 md:mb-0" label="Highlight 1" placeholder="Where you work, study etc..." id="highlight1" name="highlight1" value={form.highlight1} onChange={handleFormInput} />
                            </FormRow>
                            <FormRow>
                                {/* TODO: Change this to the emoji selecter */}
                                <InputSelect required className="md:w-1/3 mb-6 md:mb-0" label="Country" id="country" name="country" options={countryOptions} value={form.country} onChange={handleCountrySelectFormInput} />
                                <InputField required type="text" className="md:w-1/3 mb-6 md:mb-0" label="Highlight 2" placeholder="Where you work, study etc..." id="highlight2" name="highlight2" value={form.highlight2} onChange={handleFormInput} />
                            </FormRow>
                        </div>
                        {/* Interests/hobbies */}
                        {!isValidForm && <p className="text-red-600">Error! Please fill in all the blanks.</p>}
                        {/* Submission Button */}
                        <Button
                            type="submit"
                            onClick={handleFormSubmit}
                            disabled={!isValidForm || submitting}
                            variant="outlined"
                        >
                            {submitting ? <Spinner /> : "Submit"}
                        </Button>

                        {/* Change the other selects to the cool select form */}
                    </div>
                </div>
                <div className="flex-1 bg-white">
                    <img className="w-full h-full object-contain p-32" src="./rocket-logo@3x.png" />
                </div>
            </div> : <div className="grid place-items-center w-screen h-screen">
                <div className="flex flex-col items-center space-y-2">
                    <img className="object-contain w-24 p-4" src="./rocket-logo@3x.png" />
                    <h2>Setting Up Your Account...</h2>
                    <p>Please Wait</p>
                    <div className="animate-pulse h-2 rounded-md w-52 bg-gray-400"></div>
                </div>
            </div>}

        </div>
    )
}
