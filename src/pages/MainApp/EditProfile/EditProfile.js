import React, { useState, useEffect, useMemo } from 'react';
import './EditProfile.css';
import { db } from '../../../config/firebase';
import Select from 'react-select';
import { gradeOptions, majorOptions, countryOptions } from '../../Onboarding/OnboardingConfig';
import { useAuth } from '../../../hooks/useAuth';
import Button from '@mui/material/Button';
import {Helmet} from "react-helmet";

export default function EditProfile() {

    const { user, userDetails } = useAuth();
    const [updatedUserInfo, setUpdatedUserInfo] = useState({
        name: "",
        grade: "",
        dateOfBirth: "",
        country: "",
        school: "",
        major: "",
        bio: ""
    });

    const [submitting, setSubmitting] = useState(false);
    const [edited, setEdited] = useState(false);

    //setting the updated user info
    useEffect(() => {

        //If mentor, we will want to add additional details. (We could either query the database for the mentor details as well, OR 
        //we could just sync the mentor details WITH userDetails and then we could obtain everything from userDetails)
        if (userDetails?.isMtr === true){
            setUpdatedUserInfo({
                name : userDetails?.name, 
                grade : userDetails?.grade, 
                dateOfBirth : userDetails?.dateOfBirth, 
                country : userDetails?.country,
                school : userDetails?.school,
                major : userDetails?.major, 
                bio : userDetails?.bio,
                linkedInURL: userDetails?.linkedInURL || "",
                gradClass: userDetails?.gradClass || "",
            });
        } else {
            setUpdatedUserInfo({
                name : userDetails?.name, 
                grade : userDetails?.grade, 
                dateOfBirth : userDetails?.dateOfBirth, 
                country : userDetails?.country,
                school : userDetails?.school,
                major : userDetails?.major, 
                bio : userDetails?.bio
            });
        }

    }, [userDetails])

    // To check if all fields are filled up
    const isValidForm = useMemo(() => {
        return updatedUserInfo?.name !== undefined && updatedUserInfo?.name !== ""
            && updatedUserInfo?.grade !== undefined && updatedUserInfo?.grade !== ""
            && updatedUserInfo?.dateOfBirth !== undefined && updatedUserInfo?.dateOfBirth !== ""
            && updatedUserInfo?.country !== undefined && updatedUserInfo?.country !== ""
            && updatedUserInfo?.school !== undefined && updatedUserInfo?.school !== ""
            && updatedUserInfo?.major !== undefined && updatedUserInfo?.major !== ""
            && updatedUserInfo?.bio !== undefined && updatedUserInfo?.bio !== ""
    }, [updatedUserInfo])

    //On submission
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (isValidForm === true && user) {
            await db.doc(`users/${user.uid}`).update(updatedUserInfo); 
        } else {
            console.log("submission is invalid")
        }
        
        setSubmitting(false);
        setEdited(true);
        setTimeout(() => {
            setEdited(false)
        }, 1800);

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
            <Helmet>
                <meta charSet="utf-8" />
                <title>Edit Profile | Speer Education</title>
            </Helmet>
            Edit Profile
            <form>
                <label htmlFor="name">Full Name (Put first name before last name):</label>
                <input type="text" id="name" value={updatedUserInfo?.name} onChange={(e) => setUpdatedUserInfo({ ...updatedUserInfo, name: e.target.value })}></input> 
                {/* When I submit this, it changes the name in the users/id but not for userDetails.name or user.displayName */}
                <label htmlFor="dateOfBirth">Date Of Birth:</label>
                <input type="date" id="dateOfBirth" value={updatedUserInfo?.dateOfBirth} onChange={(e) => setUpdatedUserInfo({ ...updatedUserInfo, dateOfBirth: e.target.value })}></input>
                {/* Grade */}
                <label htmlFor="grade">What Grade Are You In? {userDetails?.isMtr? "(Just set this to Older/Graduated since you're a mentor)": ""}</label>
                <Select className="user-details__custom-select" id="grade" name="grade" options={gradeOptions} value={updatedUserInfo?.grade} onChange={handleGradeSelectFormInput} />
                {/* What country they live in */}
                <label htmlFor="country">Country Of Residence</label>
                <Select className="user-details__custom-select" id="country" name="country" options={countryOptions} value={updatedUserInfo?.country} onChange={handleCountrySelectFormInput} />
                {/* What school they go to */}
                <label htmlFor="school">What {userDetails?.isMtr? "university" : "school"} do you go to?</label>
                <input type="text" id="school" value={updatedUserInfo?.school} onChange={(e) => setUpdatedUserInfo({ ...updatedUserInfo, school: e.target.value })}></input>
                {/* What they plan to major in */}
                <label htmlFor="major">What Do You {userDetails?.isMtr? "" : "Plan To"} Major In?</label>
                <Select className="user-details__custom-select" id="major" name="major" options={majorOptions} value={updatedUserInfo?.major} onChange={handleMajorSelectFormInput} />
                {/* Short Bio */}
                <label htmlFor="bio">Bio:</label>
                <textarea type="text" id="bio" value={updatedUserInfo?.bio} onChange={(e) => setUpdatedUserInfo({ ...updatedUserInfo, bio: e.target.value })}></textarea>
                {userDetails?.isMtr === true ? <>
                {/* Mentor Linkedin Link */}
                <label htmlFor="linkedInURL">LinkedIn Profile</label>
                <input id="linkedInURL" value={updatedUserInfo?.linkedInURL} onChange={(e) => setUpdatedUserInfo({ ...updatedUserInfo, linkedInURL: e.target.value })}></input>
                <label htmlFor="gradClass">Graduating Class</label>
                <input id="gradClass" value={updatedUserInfo?.gradClass} onChange={(e) => setUpdatedUserInfo({ ...updatedUserInfo, gradClass: e.target.value })}></input>
                </> : null}
                {!isValidForm && <p className="text-red-600">Error! Please Don't leave any blanks.</p>}
                {edited? <h3>Edited Successfully!</h3> : null}
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

