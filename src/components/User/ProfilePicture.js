import { storage } from '../../config/firebase';
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

/**
 * This component is used to laod the profile picture of a uid in a img, the url is dynamic thus this component handles the state for it.
 * @component
 * @param {string} uid 
 * @returns 
 */
export default function ProfilePicture({ uid, thumb = false, className, ...params }) {
    const [url, setUrl] = useState(false);
    const { user } = useAuth();

    //Fetches the URL for the user's profile picture
    useEffect(async () => {
        if(!user) return;
        setUrl("");
        let imageUrl = await storage.ref(`/profilepics/${thumb?"thumb-":""}${uid}.png`).getDownloadURL().catch(e => console.log(e))
        setUrl(imageUrl)
    }, [uid, user]);

    return <img
        src={url || '/user_placeholder.png'}
        className={`${className} bg-white`}
        {...params}
    />
}