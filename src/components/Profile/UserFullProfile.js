import { Button, IconButton } from "@material-ui/core";
import { EditOutlined, MessageOutlined } from "@material-ui/icons";
import { functions } from "../../config/firebase";
import history from "../../hooks/history";
import { useAuth } from "../../hooks/useAuth";
import { followUser } from "../../utils/relationships";
import BannerPicture from "../User/BannerPicture";
import ProfilePicture from "../User/ProfilePicture";
import UserHighlight from "../User/UserHighlight";

export default function UserFullProfile({profileId, isMentor, isUser, userDetails}){

    const { user } = useAuth();
    const { name, major, school, country,highlight1,highlight2, bio, socials } = userDetails || {};

    const connectWithPerson = async () => {
        /* Send Mentor ID to backend for checking and room creation */
        if(!user?.uid || !profileId) return;
        //send it in as profile id instead of mentor id (will need to change the backend so this still works)
        try {
            let { data: targetRoomId } = await functions.httpsCallable('createRoom')({ profileId })
            .catch((error) => {
                console.error(error)
            })
            await followUser(user.uid, profileId)
            history.push(`/app/messages/${targetRoomId}`)
        } catch (e) {
            console.error(e)
        }
    }

    return <div className="rounded-xl shadow-lg w-full overflow-hidden bg-white">
        <BannerPicture className="w-full h-32 rounded-xl shadow-md object-cover" uid={profileId}/>
        <div className="flex flex-row p-3 w-full">
            <ProfilePicture className="w-32 h-32 rounded-full border-white border-8 border-solid shadow-lg transform -translate-y-16 mx-3" uid={profileId}/>
            <div className="flex flex-col space-y-1 w-full">
                <div className="flex flex-row justify-between">
                    <h1 className="text-2xl text-gray-800">{name}</h1>
                    {/* Show Edit Profile if is User, else show Message User */}
                    {isUser?<>
                        <div className="hidden md:inline">
                            <Button variant="contained" color="primary">Edit Your Profile</Button>
                        </div>
                        <div className="md:hidden">
                            <IconButton><EditOutlined /></IconButton>
                        </div>
                    </>:<>
                        <div className="hidden md:inline">
                            <Button variant="contained" color="primary" startIcon={<MessageOutlined />} onClick={() => connectWithPerson()}>Message</Button>
                        </div>
                        <div className="md:hidden">
                            <IconButton onClick={() => connectWithPerson()}><MessageOutlined /></IconButton>
                        </div>
                    </>}
                </div>
                <p className="text-gray-600 text-sm">{isMentor?"Mentor":major} at {school}</p>
                <p className="text-gray-600 text-sm">{country}</p>
                <div className="flex flex-row items-center my-5 space-x-3">
                    <UserHighlight highlight={highlight1}/>
                    <UserHighlight highlight={highlight2}/>
                </div>
            </div>
        </div>
    </div>
}