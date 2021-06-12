import React, { useState, useEffect } from 'react';
import './EditProfile.css';
import { db } from '../../../config/firebase';
import { useAuth } from '../../../hooks/useAuth';

function EditProfile() {

    const { user, userDetails } = useAuth();
    const [updatedUserInfo, setUpdatedUserInfo] = useState();

    useEffect(() => {
        setUpdatedUserInfo(userDetails);
    }, [userDetails])


    return (
        <div className="editProfile">
            Edit Profile
            {console.log(updatedUserInfo)}
            {/* Make this into a form with everything below in inputs, and with an edit button. If the user wants to edit, they hit that edit button, then they can edit their
            inputs. When they hit submit, we send the changes by updating the db with the new information */}
            <form>
                <label>Name:</label>
                <input type="text" value={updatedUserInfo?.name} onChange={(e) => setUpdatedUserInfo({...updatedUserInfo, name: e.target.value})}></input>
                {/* <label>Date Of Birth:</label>
                <input type="date">{userDetails?.dateofBirth}</input>
                <label>Country:</label>
                <input type="text">{userDetails?.country.label}</input>
                <label>Plan to Major In:</label>
                <input type="text">{userDetails?.major.label}</input>
                <label>Hobbies:</label>
                <input type="text">{userDetails?.hobbies}</input> */}
            </form>
        </div>
    )
}

export default EditProfile
