import React, { useState } from 'react';
import './UserDetails.css';
import Select from 'react-select';
import { countryOptions } from './UserDetailsConfig';

export default function UserDetails() {

    // Hard coding default values for the select fields first
    const [form, setForm] = useState({
        grade: "<9",
        dateOfBirth:"2003-05-09",
        major: "undecided",
    });

    // To check if all fields are filled up
    const isValidForm = () => {
        return form.name !== undefined && form.name !== ""
            && form.grade !== undefined 
            && form.dateOfBirth !== undefined
            && form.country !== undefined 
            && form.major !== undefined
            && form.hobbies !== undefined && form.hobbies !== ""
    }

    //To submit the form when the user hits submit (Yet to implement)
    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(countryOptions);

        console.log("Form:", form);
        console.log("Is valid form", isValidForm());
        // Only submit if the entered a name
        if (isValidForm() === true) {
            console.log("Submission sucessful")
        } else {
            // Trigger some sort of UI to tell the user they need to fill up all the inputs
            console.log("Submission unsuccessful, please fill up all the inputs")
        }
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

    return (
        <div className="user-details">
            <h1>Tell us about yourself!</h1>
            <form className="user-details__form">
                {/* Ask which to make mandatory and then force them to be required*/}
                {/* Name */}
                <label for="preferred-name">What should we call you?</label>
                <input type="text" id="preferred-name" placeholder="Name" name="name" onChange={handleFormInput}/>
                {/* Grade */}
                <label for="grade">What Grade Are You In?</label>
                <select id="grade" name="grade" onChange={handleFormInput}>
                    <option value="<9" selected>Younger</option>
                    <option value="9">Grade 9/Grade 10</option>
                    <option value="10">Grade 10/Year 11</option>
                    <option value="11" >Grade 11/Year 12</option>
                    <option value="12">Grade 12/Year 13</option>
                    <option value=">12">Older</option>
                </select>
                {/* Date Of Birth */}
                <label for="dateOfBirth">What's you Date Of Birth?</label>
                <input type="date" id="dateOfBirth" value={form.date} max="2012-12-31" name="dateOfBirth" onChange={handleFormInput} />
                {/* Insert Country They Live In (Use a country list)*/}
                <label for="country">Country Of Residence</label>
                <Select className="user-details__custom-select" id="country" name="country" options={countryOptions} value={form.country} onChange={handleCountrySelectFormInput} />
                {/* What they plan to major in */}
                <label for="major">What Do You Plan To Major In?</label>
                <select id="major" name="major" onChange={handleFormInput}>
                    <option value="undecided" selected>Undecided</option>
                    <option value="economics">Economics</option>
                    <option value="business">Business</option>
                    <option value="accounting">Accounting</option>
                </select>

                {/* Interests/hobbies */}
                <label for="hobbies">What are some of your hobbies? (Sports, interests etc...)</label>
                <input name="hobbies" placeholder="Hobbies" onChange={handleFormInput}></input>
                
                {/* Submission Button */}
                <button
                    type="submit"
                    onClick={handleFormSubmit}
                >
                    Submit
                </button>

                {/* Change the other selects to the cool select form */}
            </form>
        </div>
    )
}
