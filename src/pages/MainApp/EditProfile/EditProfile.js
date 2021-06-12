import React, { useState, useEffect, useMemo } from 'react';
import './EditProfile.css';
import { db } from '../../../config/firebase';
import Select from 'react-select';
import { gradeOptions, majorOptions, countryOptions } from '../../Onboarding/OnboardingConfig';
import { useAuth } from '../../../hooks/useAuth';
import Button from '@material-ui/core/Button';

export default function EditProfile() {

    const { user, userDetails } = useAuth();
    const [updatedUserInfo, setUpdatedUserInfo] = useState({
        name: "",
        grade: "",
        dateOfBirth: "",
        country: "",
        major: "",
        hobbies: ""
    });

    const [submitting, setSubmitting] = useState(false);

    //setting the updated user info
    useEffect(() => {
        setUpdatedUserInfo({
            name : userDetails?.name, 
            grade : userDetails?.grade, 
            dateOfBirth : userDetails?.dateOfBirth, 
            country : userDetails?.country,
            major : userDetails?.major, 
            hobbies : userDetails?.hobbies
        });
    }, [userDetails])

    // To check if all fields are filled up
    const isValidForm = useMemo(() => {
        return updatedUserInfo?.name !== undefined && updatedUserInfo?.name !== ""
            && updatedUserInfo?.grade !== undefined && updatedUserInfo?.grade !== ""
            && updatedUserInfo?.dateOfBirth !== undefined && updatedUserInfo?.dateOfBirth !== ""
            && updatedUserInfo?.country !== undefined && updatedUserInfo?.country !== ""
            && updatedUserInfo?.major !== undefined && updatedUserInfo?.major !== ""
            && updatedUserInfo?.hobbies !== undefined && updatedUserInfo?.hobbies !== ""
    }, [updatedUserInfo])

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        console.log(user);
        console.log("User Id:", user.uid)

        if (isValidForm === true && user) {
            console.log("submission is valid")
            db.doc(`users/${user.uid}`).update(updatedUserInfo);
        } else {
            console.log("submission is invalid")
        }

        setSubmitting(false);
    }

    // To handle select form inputs.
    const handleCountrySelectFormInput = value => {
        setUpdatedUserInfo({ ...updatedUserInfo, country: value })
    }

    const handleGradeSelectFormInput = value => {
        setUpdatedUserInfo({ ...updatedUserInfo, grade: value })
    }

    const handleMajorSelectFormInput = value => {
        setUpdatedUserInfo({ ...updatedUserInfo, major: value })
    }

    return (
        <div className="editProfile">
            Edit Profile
            <form>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" value={updatedUserInfo?.name} onChange={(e) => setUpdatedUserInfo({ ...updatedUserInfo, name: e.target.value })}></input>
                <label htmlFor="dateOfBirth">Date Of Birth:</label>
                <input type="date" id="dateOfBirth" value={updatedUserInfo?.dateOfBirth} onChange={(e) => setUpdatedUserInfo({ ...updatedUserInfo, dateOfBirth: e.target.value })}></input>

                {/* Grade */}
                <label htmlFor="grade">What Grade Are You In?</label>
                <Select className="user-details__custom-select" id="grade" name="grade" options={gradeOptions} value={updatedUserInfo?.grade} onChange={handleGradeSelectFormInput} />
                <label htmlFor="country">Country Of Residence</label>
                <Select className="user-details__custom-select" id="country" name="country" options={countryOptions} value={updatedUserInfo?.country} onChange={handleCountrySelectFormInput} />
                {/* What they plan to major in */}
                <label htmlFor="major">What Do You Plan To Major In?</label>
                <Select className="user-details__custom-select" id="major" name="major" options={majorOptions} value={updatedUserInfo?.major} onChange={handleMajorSelectFormInput} />

                <label htmlFor="hobbies">Hobbies:</label>
                <input type="text" id="hobbies" value={updatedUserInfo?.hobbies} onChange={(e) => setUpdatedUserInfo({ ...updatedUserInfo, hobbies: e.target.value })}></input>
                {!isValidForm && <p className="text-red-600">Error! Please Don't leave any blanks.</p>}
                <Button
                    type="submit"
                    onClick={handleUpdateProfile}
                    disabled={!isValidForm || submitting}
                    variant="outlined"
                >
                    {submitting ? "Submitting..." : "Submit Changes"}
                </Button>
            </form>
        </div>
    )
}

