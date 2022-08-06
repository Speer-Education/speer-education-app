import { storage } from '../../config/firebase';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getDownloadURL, ref } from 'firebase/storage';

/**
 * This component is used to laod the profile picture of a uid in a img, the url is dynamic thus this component handles the state for it.
 * @component
 * @param {string} uid 
 * @returns 
 */
export default function ProfilePicture({ uid, thumb = false, className, isRoom = "", forceRefresh = false, ...params } : {
    uid: string,
    thumb?: boolean,
    className?: string,
    isRoom?: string,
    forceRefresh?: boolean,
} & React.HTMLAttributes<HTMLImageElement>) {
    const [url, setUrl] = useState("");
    const { user, appInstance } = useAuth();
    const imageRef = useRef<HTMLImageElement>(null);

    //Fetches the URL for the user's profile picture
    useEffect(() => {
        if(!user || !uid) return;
        setUrl(`https://storage.googleapis.com/speer-education-dev.appspot.com/users/${uid}/${thumb?'thumb-':''}profilePicture.png?${(forceRefresh || uid == user?.uid)?appInstance:''}`);

        if (isRoom){
            getDownloadURL(ref(storage,`/roompics/${uid}/${thumb?"thumb-":""}roomPicture.png`))
            .then(setUrl)
            .catch(e => {
                if(e.code !== 'storage/object-not-found') {
                    console.error(e);
                }
            });
        }

    }, [uid, user]);

    return <img
        src={url}
        className={`${className} bg-white object-cover`}
        alt="User"
        ref={imageRef}
        onError={(e) => { 
            if (imageRef.current && imageRef.current.src != '/user_placeholder.png') imageRef.current.src = '/user_placeholder.png';
        }}
        {...params}
    />
}