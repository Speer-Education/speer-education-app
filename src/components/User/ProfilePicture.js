import { storage } from '../../config/firebase';
import { useState, useEffect } from 'react';

export default function ProfilePicture({ uid, ...params }) {
    const [url, setUrl] = useState(false);

    useEffect(async () => {
        let imageUrl = await storage.ref(`/profilepics/${uid}.png`).getDownloadURL()
        setUrl(imageUrl)
    }, [uid]);

    return <img
        src={url || './user_placeholder.png'}
        {...params}
    />
}