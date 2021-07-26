import { useAuth } from "../../../hooks/useAuth"
import ProfilePicture from "../../User/ProfilePicture";

const UserSmallProfileCard = () => {
    const { userDetails, user } = useAuth();
    const { name , major, school } = userDetails || {};
    return <div className="p-3 m-2 shadow-lg rounded-md bg-white">
        <div className="flex flex-row space-x-2 items-center">
            <ProfilePicture uid={user?.uid} alt="user" className="rounded-full border-white border-8 border-solid shadow-lg"/>
            <div className="space-y-1 ">
                <h3 className="font-medium">{name}</h3>
                <p className="text-md text-gray-600">{major?.label} @ {school}</p>
            </div>
        </div>

    </div>
}

export default UserSmallProfileCard