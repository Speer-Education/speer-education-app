import { useState, useMemo } from 'react';
import './Onboarding.css';
import Select from 'react-select';
import { gradeOptions, majorOptions, countryOptions } from './OnboardingConfig';
import { updateDoc } from '../../hooks/firestore';
import { useAuth } from '../../hooks/useAuth';
import { functions } from '../../config/firebase';
import Button from '@material-ui/core/Button';
import {Helmet} from "react-helmet";

export default function UserDetails() {
    const { user } = useAuth();
    // Hard coding default values for the select fields first
    const [form, setForm] = useState({
        name: "",
        grade: "",
        dateOfBirth:"",
        country: "",
        school: "",
        major: "",
        bio: ""
    });
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

        await functions.httpsCallable('onBoarding')({form})
            .catch((error) => {
                console.error(error)
            })
    }

    //Updates state whenever the user change fields in the form
    const handleFormInput = (e) => {
        console.log(e.target.value);
        const { value, name } = e.target;
        setForm({ ...form, [name]: value });
    };

    // To handle select form inputs.
    const handleCountrySelectFormInput = value => {
        setForm({...form, country: value})
    }

    const handleGradeSelectFormInput = value => {
        setForm({...form, grade: value})
    }

    const handleMajorSelectFormInput = value => {
        setForm({...form, major: value})
    }

    return (
        <div className="user-details">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Sign Up | Speer Education</title>
            </Helmet>
            <h1>Tell us about yourself!</h1>
            <form className="user-details__form">
                {/* Ask which to make mandatory and then force them to be required*/}
                {/* Name */}
                <label htmlFor="preferred-name">What's your Full Name? (Put first name before last name)</label>
                <input type="text" id="preferred-name" placeholder="Name" name="name" value={form.name} onChange={handleFormInput}/>
                {/* Grade */}
                <label htmlFor="grade">What Grade Are You In?</label>
                <Select className="user-details__custom-select" id="grade" name="grade" options={gradeOptions} value={form.grade} onChange={handleGradeSelectFormInput}/>
                {/* Date Of Birth */}
                <label htmlFor="dateOfBirth">What's you Date Of Birth?</label>
                <input type="date" id="dateOfBirth" value={form.date} max="2012-12-31" name="dateOfBirth" onChange={handleFormInput} />
                {/* Insert Country They Live In (Use a country list)*/}
                <label htmlFor="country">Country Of Residence</label>
                <Select className="user-details__custom-select" id="country" name="country" options={countryOptions} value={form.country} onChange={handleCountrySelectFormInput} />
                {/* Their school Name: */}
                <label htmlFor="school">What's the name of your school?</label>
                <input type="text" id="school" placeholder="school" name="school" value={form.school} onChange={handleFormInput}/>
                {/* What they plan to major in */}
                <label htmlFor="major">What Do You Plan To Major In?</label>
                <Select className="user-details__custom-select" id="major" name="major" options={majorOptions} value={form.major} onChange={handleMajorSelectFormInput}/>
                {/* Interests/hobbies */}
                <label htmlFor="bio">Give a short 50 word bio about yourself, your aspirations or hobbies etc...</label>
                <input name="bio" placeholder="Short Bio (50 words)" onChange={handleFormInput} value={form.bio}></input>
                {!isValidForm && <p className="text-red-600">Error! Please fill in all the blanks.</p>}
                {/* Submission Button */}
                <Button
                    type="submit"
                    onClick={handleFormSubmit}
                    disabled={!isValidForm || submitting}
                    variant="outlined"
                >
                    {submitting?"Submitting...":"Submit"}
                </Button>

                {/* Change the other selects to the cool select form */}
            </form>
        </div>
    )
}
