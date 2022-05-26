import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"
import { PublicUser, UserDetails, UserDetailsDocument } from "../../types/User";
import ProfilePicture from "./ProfilePicture";
import UserHighlight from "./UserHighlight";
import { Button } from '@mui/material';
import { getMajor, getSchool } from "../../utils/user";

const UserSmallProfileCard = ({ userDetails, uid }: {
    userDetails: PublicUser,
    uid: string
}) => {
    const { user } = useAuth();
    const { name, highlights:[highlight1, highlight2] } = userDetails || {};
    return <div className="p-3 m-2 shadow-lg rounded-md bg-white bg-opacity-90 space-y-6">
        {!userDetails?.name ? <p>Loading...</p>:
        <><div className="flex flex-row space-x-2 items-center">
            <ProfilePicture uid={uid} className="w-28 h-28 rounded-full border-white border-8 border-solid shadow-lg"/>
            <div className="space-y-1 ">
                <h3 className="font-semibold text-xl">{name}</h3>
                <p className="text-md text-gray-600">{getMajor(userDetails)} @ {getSchool(userDetails)}</p>
            </div>
        </div>
        <div>
            <h3 className="text-gray-500 mb-2 font-semibold text-xl">{(user?.uid === uid)?"Your":`${name}'s`} Education</h3>
            <div className="flex flex-row items-center rounded-xl shadow-lg px-3 py-5 space-x-2">
                <p className="text-4xl w-16 text-center">🏫</p>
                <div className="space-y-2">
                    <h3 className="font-semibold text-xl">{getMajor(userDetails)}</h3>
                    <p>{getSchool(userDetails)}</p>
                </div>
            </div>
        </div>
        <div className="mt-5 mb-6">
            <h3 className="text-gray-600 font-semibold text-xl">{(user?.uid === uid)?"Your":`${name}'s`}  Highlights</h3>
            <div className="flex flex-row items-center my-5 space-x-3">
                <UserHighlight highlight={highlight1}/>
                <UserHighlight highlight={highlight2}/>
            </div>
        </div>
        <Link to={`/profile/${uid}`}>     
            <Button variant="contained">Visit Profile</Button>
        </Link>
        </>
        }
    </div>
}

export default UserSmallProfileCard