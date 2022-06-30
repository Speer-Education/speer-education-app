import { AccountCircleRounded } from "@mui/icons-material";
import { FC } from "react";
import { useAuth } from "../../hooks/useAuth";

const OrgDashboard: FC<{}> = () => {
    const { userDetails } = useAuth();
    return <div className="space-y-2">
        <div className="space-y-1">
            <h2 className="text-[#084887]">Welcome back {userDetails?.name}</h2>
            <p className="text-sm">This dashboard is only visible to you and other admins.</p>
        </div>
        <div className="flex flex-col">
            <div className="flex flex-row items-center space-x-1">
                <AccountCircleRounded/>
                <span className="text-gray-600">Total Users</span>
            </div>
        </div>
    </div>
}

export default OrgDashboard;