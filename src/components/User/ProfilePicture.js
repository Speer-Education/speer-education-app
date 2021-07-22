import { storage } from '../../config/firebase';
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

/**
 * This component is used to laod the profile picture of a uid in a img, the url is dynamic thus this component handles the state for it.
 * @component
 * @param {string} uid 
 * @returns 
 */
export default function ProfilePicture({ uid, ...params }) {
    const [url, setUrl] = useState(false);
    const { user } = useAuth();

    //Fetches the URL for the user's profile picture
    useEffect(async () => {
        if(!user) return;
        let imageUrl = await storage.ref(`/profilepics/${uid}.png`).getDownloadURL()
        setUrl(imageUrl)
    }, [uid, user]);

    return <img
        src={url || './user_placeholder.png'}
        {...params}
    />
}