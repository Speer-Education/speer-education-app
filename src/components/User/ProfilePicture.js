import { storage } from '../../config/firebase';
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

/**
 * This component is used to laod the profile picture of a uid in a img, the url is dynamic thus this component handles the state for it.
 * @component
 * @param {string} uid 
 * @returns 
 */
export default function ProfilePicture({ uid, thumb = false, className, isRoom, ...params }) {
    const [url, setUrl] = useState(false);
    const { user } = useAuth();

    //Fetches the URL for the user's profile picture
    useEffect(() => {
        if(!user || !uid) return;
        setUrl(`https://storage.googleapis.com/speer-education-dev.appspot.com/users/${uid}/${thumb?'thumb-':''}profilePicture.png`);

        if (isRoom){
            storage.ref(`/roompics/${uid}/${thumb?"thumb-":""}roomPicture.png`)
            .getDownloadURL()
            .then(setUrl)
            .catch(e => {
                if(e.code !== 'storage/object-not-found') {
                    console.error(e);
                }
            });
        }

    }, [uid, user]);

    return <img
        src={url || '/user_placeholder.png'}
        className={`${className} bg-white`}
        {...params}
    />
}