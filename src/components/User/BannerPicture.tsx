import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';

/**
 * This component is used to laod the banner photo of a uid in a img, the url is dynamic thus this component handles the state for it.
 * @component
 * @param {string} uid 
 * @returns 
 */
export default function BannerPicture({ uid, forceRefresh, ...params }: { uid: string, forceRefresh?: boolean } & React.HTMLAttributes<HTMLImageElement>) {
    const [url, setUrl] = useState<string>();
    const { user, appInstance } = useAuth();
    const imageRef = useRef<HTMLImageElement>(null);

    //Fetches the URL for the user's profile picture
    useEffect(() => {
        if(!user || !uid) return;
        setUrl(`https://storage.googleapis.com/speer-education-dev.appspot.com/users/${uid}/bannerPicture.png?${(forceRefresh || uid == user?.uid)?appInstance:''}`);
    }, [uid, user]);

    return <>
        <img
            ref={imageRef}
            src={url}
            alt="banner"
            onError={(e) => { 
                if (imageRef.current!.src != '/banner_placeholder.png') imageRef.current!.src = '/banner_placeholder.png';
            }}
            {...params}
        />
    </>
}