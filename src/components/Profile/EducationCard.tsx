import { PublicUser } from "../../types/User";
import { getMajor, getSchool } from "../../utils/user";

export default function EducationCard({userDetails, isUser, isMentor}: {
    userDetails: PublicUser,
    isUser: boolean,
    isMentor: boolean,
}){
    const { name } = userDetails || {};
    return (
        <div className="flex flex-col p-3 shadow-lg rounded-md bg-white space-y-3">
        <h3 className="font-semibold text-lg">{isUser?"Your":`${name}'s`} Education</h3>
        <div className="flex flex-row items-center space-x-2">
            <p className="text-4xl w-16 text-center">🏫</p>
            <div className="space-y-2">
                <h3>{getMajor(userDetails)}</h3>
                <p>{getSchool(userDetails)}</p>
            </div>
        </div>
    </div>)
}