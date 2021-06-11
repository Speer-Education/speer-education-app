import './MentorCard.css'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom';

const MentorCard = ({ id, photoURL, name, university, major, description }) => {
    return (
        <div className="mentorCard">
            <img src={photoURL} />
            <h1>{name}</h1>
            <h2><b>University: </b>{university}</h2>
            <h2><b>Major: </b>{major}</h2>
            <p>{description}</p>
            <Link to={`/main-app/mentors/${id}`}>
                <Button
                    variant="default"
                >View Profile</Button>
            </Link>
        </div>
    );
}

export default MentorCard;
