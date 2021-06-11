import './MentorCard.css'
import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom';
import { storage } from '../../../config/firebase';

const MentorCard = ({ id, name, university, major, description }) => {

    const [imageUrl, setImageUrl] = useState("");

    useEffect(async () => {
        setImageUrl(await storage.ref(`profilepics/${id}.png`).getDownloadURL())
    }, [id]);

    return (
        <div className="mentorCard">
            <img src={imageUrl} />
            <h1>{name}</h1>
            <h2><b>University: </b>{university}</h2>
            <h2><b>Major: </b>{major}</h2>
            <p>{description}</p>
            <Link to={`/app/mentors/${id}`}>
                <Button
                    variant="default"
                >View Profile</Button>
            </Link>
        </div>
    );
}

export default MentorCard;
