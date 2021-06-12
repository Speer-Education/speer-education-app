import './MentorCard.css'
import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom';
import { storage } from '../../../config/firebase';
import Loader from '../../Loader/Loader';

const MentorCard = ({ id, name, university, major, description }) => {

    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        setLoading(true)
        const getImage = async () => {
            setImageUrl(await storage.ref(`profilepics/${id}.png`).getDownloadURL())
            setLoading(false)
        }
        getImage();
    }, [id]);

    return (
        <div className="mentorCard">
            {loading ? <Loader/> : <img src={imageUrl} alt="mentor"/>}
            <h1>{name}</h1>
            <h2><b>University: </b>{university}</h2>
            <h2><b>Major: </b>{major}</h2>
            <p>{description.substring(0, 125) + "..."}</p>
            <Link to={`/app/mentors/${id}`}>
                <Button
                    variant="text"
                >View Profile</Button>
            </Link>
        </div>
    );
}

export default MentorCard;
