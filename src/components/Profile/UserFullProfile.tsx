import { Button, CircularProgress, Fade, IconButton, LinearProgress, Tooltip } from "@mui/material";
import { EditOutlined, ExitToAppOutlined, MessageOutlined, PasswordTwoTone } from "@mui/icons-material";
import { FC, lazy, useRef, useState } from "react";
import { functions, db } from "../../config/firebase";
import { useAuth } from "../../hooks/useAuth";
import MentorCardModal from "../Modal/MentorCardModal";
import BannerPicture from "../User/BannerPicture";
import ProfilePicture from "../User/ProfilePicture";
import UserHighlight from "../User/UserHighlight";
import { logEvent } from "../../utils/analytics";
import { useNavigate } from "react-router-dom";
import lookup from 'country-code-lookup'
import { PublicUser } from "../../types/User";
import { getMajor, getSchool } from "../../utils/user";
import { useDialog } from "../../hooks/useDialog";
import UpdatePasswordDialog from "./UpdatePasswordDialog";
import CircleLoader from "../Loader/CircleLoader";
import imageCompression from 'browser-image-compression';
import { doc, getDoc } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import EditDetailsDialog from "./EditDetailsDialog";
import { useMediaQuery } from "react-responsive";


const LazyEditDetailsDialog = lazy(() => import("./EditDetailsDialog"));

const UserProfilePicture: FC<{ profileId: string, isUser?: boolean }>  = ({ profileId, isUser = false }) => {
    const profileUpload = useRef<HTMLInputElement>(null);
    const [ppLoading, setppLoading] =  useState<boolean>(false);

    const handleUploadProfilePic = async (file: File) => {
        if (!isUser) return;
        setppLoading(true); // Set loading bar
        logEvent('update_profile_picture');
        const compressed = await imageCompression(file, {maxSizeMB: 0.49});
        let reader = new FileReader();
        reader.readAsDataURL(compressed);
        let base64image = await new Promise((resolve, reject) => {
            reader.addEventListener("load", function () {
                resolve(reader.result);
            }, false);
        });
        try {
            await httpsCallable(functions, 'updateProfilePicture')({
                image: base64image,
            });
            setppLoading(false);
            //reload to see changes
            window.location.reload()
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="relative">
            {!ppLoading ? <>
            <ProfilePicture 
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-white border-8 border-solid shadow-lg transform -translate-y-16 mx-1" 
                uid={profileId} 
                forceRefresh/> 
                <input ref={profileUpload} type="file" name="file" accept="image/png" onChange={({ target }) => target.files?.[0] && handleUploadProfilePic(target.files?.[0])} hidden />
                {isUser && <div className="absolute top-0 right-0 text-white transform -translate-y-16 rounded-full bg-gray-800 scale-75">
                <IconButton onClick={e => profileUpload.current?.click()} size="large">
                    <EditOutlined className="text-white" />
                </IconButton>
            </div>}
            </>
            : <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-white border-8 border-solid shadow-lg transform -translate-y-16 mx-1 grid place-items-center bg-gray-100 animate-pulse" >
                <CircularProgress/>
            </div>}
        </div>
    );
}

const UserBannerPicture: FC<{ profileId: string, isUser?: boolean }>  = ({ profileId, isUser = false }) => {
    const { user } = useAuth();
    const bannerUpload = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleUploadBannerPic = async (file:File) => {
        if (!isUser) return;
        logEvent('update_banner_picture')
        setLoading(true);
        let reader = new FileReader();
        const compressed = await imageCompression(file, {maxSizeMB: 0.49});
        reader.readAsDataURL(compressed);
        let base64image = await new Promise((resolve, reject) => {
            reader.addEventListener("load", function () {
                resolve(reader.result);
            }, false);
        });
        try {
            await httpsCallable(functions,'updateBannerPicture')({
                image: base64image,
            });
            //reload to see changes
            setLoading(false);
            window.location.reload()
        } catch (e) {
            console.error(e)
            setLoading(false);
        }
    }

    return (
        <div className="relative">
            {loading? <div className="w-full h-32 rounded-xl shadow-md bg-gray-400 animate-pulse grid place-items-center">
            </div>:<>
                <BannerPicture className="w-full h-32 rounded-xl shadow-md object-cover" uid={profileId} />
                <input ref={bannerUpload} type="file" name="file" accept="image/png" onChange={({ target }) => target.files?.[0] && handleUploadBannerPic(target.files?.[0])} hidden />
                {isUser && <div className="absolute top-0 right-0 m-1 text-white rounded-full bg-gray-100 transform scale-75">
                    <IconButton onClick={e => bannerUpload.current?.click()} size="large">
                        <EditOutlined />
                    </IconButton>
                </div>}
            </>}
        </div>
    );
}

export default function UserFullProfile({ profileId, isMentor, isUser, userDetails }: { profileId: string, isMentor?: boolean, isUser?: boolean, userDetails: PublicUser }) {
    const navigate = useNavigate();
    const { user, signOut, isUsingPasswordLogin } = useAuth();
    const { name, country, highlights } = userDetails || {};
    const [highlight1, highlight2] = highlights;
    const [mentorModalOpen, setMentorModalOpen] = useState(false);
    const [openDialog, closeDialog] = useDialog();
    const isMobile = useMediaQuery({ maxWidth: 768 });
    
    const connectWithPerson = async () => {
        if (!user?.uid || !profileId) return;

        const snap = await getDoc(doc(db,`relationships`, `${profileId}_${user.uid}`))

        //Relationsip has not been made, room does not exist yet, open the modal.
        if(!snap.exists) {
            setMentorModalOpen(true)
        //Room exists, just push to the roomId
        } else {
            try {
                logEvent('message_user', { targetUser: profileId })
                const targetRoomId = snap.data()?.roomId
                navigate(`/messages/${targetRoomId}`)
            } catch (e) {
                console.error(e)
            }
        }

    }

    const handleEditDetails = () => {
        openDialog({
            children: <EditDetailsDialog onClose={closeDialog} />,
            fullScreen: isMobile,
            TransitionComponent: Fade,
        })
    }

    const handlePasswordChangeDialog = () => {
        openDialog({
            children: <UpdatePasswordDialog onClose={closeDialog} />,
        })
    }


    return <>
        <div className="rounded-xl shadow-lg w-full overflow-hidden bg-white">
            <UserBannerPicture profileId={profileId} isUser={isUser} />
            <div className="flex flex-col md:flex-row p-3 w-full items-start">
                <UserProfilePicture profileId={profileId} isUser={isUser}/>
                <div className="flex flex-col space-y-1 w-full relative transform -mb-16 md:mb-0 -translate-y-16 md:translate-y-0">
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="text-2xl text-gray-800">{name}</h1>
                        {/* Show Edit Profile if is User, else show Message User */}
                        {isUser ? <div className="flex flex-row space-y-1">
                            {isUsingPasswordLogin && <Tooltip title="Change Password">
                                <IconButton onClick={handlePasswordChangeDialog} size="large">
                                    <PasswordTwoTone className="text-orange-600" />
                                </IconButton>
                            </Tooltip>}
                            <Tooltip title="Logout">
                                <IconButton onClick={() => signOut()} size="large">
                                    <ExitToAppOutlined className="text-red-600" />
                                </IconButton>
                            </Tooltip>
                            <div className="hidden md:inline">
                                <Button variant="contained" color="primary" onClick={handleEditDetails}>Edit Your Profile</Button>
                            </div>
                            <div className="md:hidden">
                                <IconButton onClick={handleEditDetails} size="large"><EditOutlined /></IconButton>
                            </div>
                        </div> : <>
                            <div className="hidden md:inline">
                                <Button variant="contained" color="primary" startIcon={<MessageOutlined />} onClick={() => connectWithPerson()}>Message</Button>
                            </div>
                            <div className="md:hidden">
                                <IconButton onClick={() => connectWithPerson()} size="large"><MessageOutlined /></IconButton>
                            </div>
                        </>}
                    </div>
                    <p className="text-gray-600 text-sm">{isMentor ? "Mentor" : getMajor(userDetails)} at {getSchool(userDetails)}</p>
                    <p className="text-gray-600 text-sm ">{lookup.byInternet(country)?.country}</p>
                    <div className="flex flex-col sm:flex-row items-center my-5 space-x-3">
                        <UserHighlight highlight={highlight1} />
                        <UserHighlight highlight={highlight2} />
                    </div>
                </div>
            </div>
        </div>
        <MentorCardModal open={mentorModalOpen} setOpen={setMentorModalOpen} mentorSelected={{id: profileId, ...userDetails}}/>
    </>;
}