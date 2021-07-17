import { storage } from '../../config/firebase';
import { useState, useEffect } from 'react';

/**
 * This component is used to laod the profile picture of a uid in a img, the url is dynamic thus this component handles the state for it.
 * @component
 * @param {string} uid 
 * @returns 
 */
export default function ProfilePicture({ uid, ...params }) {
    const [url, setUrl] = useState(false);

    //Fetches the URL for the user's profile picture
    //TODO: should check if user is logged in or not
    useEffect(async () => {
        let imageUrl = await storage.ref(`/profilepics/${uid}.png`).getDownloadURL()
        setUrl(imageUrl)
    }, [uid]);

    return <img
        src={url || './user_placeholder.png'}
        {...params}
    />
}