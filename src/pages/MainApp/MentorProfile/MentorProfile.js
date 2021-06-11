import React from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../config/firebase';

const MentorProfile = () => {
    const { mentorId } = useParams();
    const [mentor, setMentor] = useState({});

    useEffect(() => {
        return db.doc(`users/${mentorId}`).onSnapshot(snap => {
            setMentor(snap.data())
        })
    }, [mentorId, setMentor]);

    return (
        <div className="mentorProfile">
            
        </div>
    );
}

export default MentorProfile;
