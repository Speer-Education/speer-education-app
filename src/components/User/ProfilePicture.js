import { storage } from '../../config/firebase';

export default function ProfilePicture({ uid, thumb=false, ...params }) {
    const [url, setUrl] = useState(false);

    useEffect(async () => {
        let imageUrl = await storage.ref(`/profilepics/${uid}.png`).getDownloadURL()
        setUrl(imageUrl)
    }, [uid]);

    return url&&<img
        src={url}
        {...params}
    />
}