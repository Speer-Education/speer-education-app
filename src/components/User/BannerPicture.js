import { storage } from '../../config/firebase';
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

/**
 * This component is used to laod the banner photo of a uid in a img, the url is dynamic thus this component handles the state for it.
 * @component
 * @param {string} uid 
 * @returns 
 */
export default function BannerPicture({ uid, forceRefresh, ...params }) {
    const [url, setUrl] = useState(false);
    const { user, appInstance } = useAuth();

    //Fetches the URL for the user's profile picture
    useEffect(() => {
        if(!user || !uid) return;
        setUrl(`https://storage.googleapis.com/speer-education-dev.appspot.com/users/${uid}/bannerPicture.png?${(forceRefresh || uid == user?.uid)?appInstance:''}`);
    }, [uid, user]);

    return <img
        src={url || '/banner_placeholder.png'}
        alt="banner"
        {...params}
    />
}