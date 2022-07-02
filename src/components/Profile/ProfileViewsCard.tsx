import { FC } from "react";

const ProfileViewsCard: FC<{ views: number }> = ({ views }) => {
    return <div className="flex flex-col p-3 m-2 shadow-lg rounded-md bg-white space-y-3">
        <h3 className="font-semibold text-lg">Lifetime Data</h3>
        <div className="flex flex-row items-center space-x-2">
            <p className="text-3xl w-16 text-center">{views}</p>
            <p className="text-gray-600">{"Profile Views"}</p>
        </div>
    </div>
}

export default ProfileViewsCard;