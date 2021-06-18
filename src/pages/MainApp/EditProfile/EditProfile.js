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
                //Add mentor details here (make user details contain mentor details (in any as well), sync userDetails name and major 
                //with mentor details, or exclude name and major from the mentors documents, also remember to have email appear on 
                //users document in firestore.
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
            console.log("updated user info:", updatedUserInfo)
            console.log("submission is valid")
            await db.doc(`users/${user.uid}`).update(updatedUserInfo); /* <-- When we add mentors, we will have to change this so that we
            don't include the university and mentor description details */
            /*Then here we update the mentor details as well, only need to include the name, major, university, and mentor 
            description sections*/
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
            {console.log(userDetails)}
            Edit Profile
            <form>
                <label htmlFor="name">Full Name (Put first name before last name):</label>
                <input type="text" id="name" value={updatedUserInfo?.name} onChange={(e) => setUpdatedUserInfo({ ...updatedUserInfo, name: e.target.value })}></input> 
                {/* When I submit this, it changes the name in the users/id but not for userDetails.name or user.displayName */}
                <label htmlFor="dateOfBirth">Date Of Birth:</label>
                <input type="date" id="dateOfBirth" value={updatedUserInfo?.dateOfBirth} onChange={(e) => setUpdatedUserInfo({ ...updatedUserInfo, dateOfBirth: e.target.value })}></input>

                {/* Grade */}
                <label htmlFor="grade">What Grade Are You In?</label>
                <Select className="user-details__custom-select" id="grade" name="grade" options={gradeOptions} value={updatedUserInfo?.grade} onChange={handleGradeSelectFormInput} />
                {/* What country they live in */}
                <label htmlFor="country">Country Of Residence</label>
                <Select className="user-details__custom-select" id="country" name="country" options={countryOptions} value={updatedUserInfo?.country} onChange={handleCountrySelectFormInput} />
                {/* What school they go to */}
                <label htmlFor="school">What school do you go to?</label>
                <input type="text" id="school" value={updatedUserInfo?.school} onChange={(e) => setUpdatedUserInfo({ ...updatedUserInfo, school: e.target.value })}></input>
                {/* What they plan to major in */}
                <label htmlFor="major">What Do You Plan To Major In?</label>
                <Select className="user-details__custom-select" id="major" name="major" options={majorOptions} value={updatedUserInfo?.major} onChange={handleMajorSelectFormInput} />
                {/* Short Bio */}
                <label htmlFor="bio">Bio:</label>
                <input type="text" id="bio" value={updatedUserInfo?.bio} onChange={(e) => setUpdatedUserInfo({ ...updatedUserInfo, bio: e.target.value })}></input>
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
            {userDetails?.isMtr === true? <>
            Edit Mentor Profile (Only for Mentor Accounts)
            <form>
                {/* Mentor Description */}
                <label htmlFor="mentorDescription">Mentor Description</label>
                <textarea id="mentorDescription" ></textarea>
            </form>
            </> : null}
        </div>
    )
}

