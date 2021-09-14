import { storage } from '../../config/firebase';
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

/**
 * This component is used to laod the banner photo of a uid in a img, the url is dynamic thus this component handles the state for it.
 * @component
 * @param {string} uid 
 * @returns 
 */
export default function BannerPicture({ uid, ...params }) {
    const [url, setUrl] = useState(false);
    const { user } = useAuth();

    //Fetches the URL for the user's profile picture
    useEffect(() => {
        if(!user || !uid) return;
        setUrl(false);
        storage.ref(`/users/${uid}/bannerPicture.png`).getDownloadURL().then(setUrl)
            .catch(e => {
                if(e.code != 'storage/object-not-found') {
                    console.error(e);
                }
            });
    }, [uid, user]);

    return <img
        src={url || '/banner_placeholder.png'}
        alt="banner"
        {...params}
    />
}