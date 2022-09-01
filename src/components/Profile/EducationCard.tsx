import { PublicUser } from "../../types/User";
import { getMajor, getSchool } from "../../utils/user";
import {IconButton} from '@mui/material';
import {EditOutlined} from '@mui/icons-material';
import { useDialog } from "../../hooks/useDialog";
import EditEducationDialog from "./EditEducationDialog";

export default function EducationCard({userDetails, isUser, isMentor}: {
    userDetails: PublicUser,
    isUser: boolean,
    isMentor: boolean,
}){
    const { name } = userDetails || {};
    const [openDialog, closeDialog] = useDialog();

    const handleEditEducation = () => {
        openDialog({
            children: <EditEducationDialog onClose={closeDialog} />,
        })
    }

    return (
        <div className="relative flex flex-col p-3 shadow-lg rounded-md bg-white space-y-3">
            <h3 className="font-semibold text-lg">{isUser?"Your":`${name}'s`} Education</h3>
            <div className="absolute -top-2 right-0 m-1 text-white rounded-full bg-gray-100 transform scale-75">
                {isUser && <IconButton onClick={handleEditEducation} size="large">
                    <EditOutlined />
                </IconButton>}
            </div>
            <div className="flex flex-row items-center space-x-2">
                <p className="text-4xl w-16 text-center">🏫</p>
                <div className="space-y-2">
                    <h3>{getMajor(userDetails)}</h3>
                    <p>{getSchool(userDetails)}</p>
                </div>
            </div>
        </div>)
}