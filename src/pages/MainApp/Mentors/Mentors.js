import React from 'react';
import './Mentors.css'
import MentorCard from '../../../components/Mentor/MentorCard/MentorCard';

const Mentors = () => {
    return (
        <div className="mentors">
            <div className="mentors__grid">
                <MentorCard
                    photoURL="https://www.whitehouse.gov/wp-content/uploads/2021/01/44_barack_obama.jpg"
                    name="Barack Obama"
                    university="Harvard Law School"
                    major="Law"
                    description="President of the United States, from 2008 - 2016. First black president in the United States of America and is currently living a life of philanthropy"
                    />
                <MentorCard
                    photoURL="https://www.whitehouse.gov/wp-content/uploads/2021/01/44_barack_obama.jpg"
                    name="Barack Obama"
                    university="Harvard Law School"
                    major="Law"
                    description="President of the United States, from 2008 - 2016. First black president in the United States of America and is currently living a life of philanthropy"
                    />
            </div>
        </div>
    );
}

export default Mentors;
