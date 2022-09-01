import { PublicUser } from "../../types/User";
import {IconButton} from '@mui/material';
import {EditOutlined} from '@mui/icons-material';
import { useDialog } from "../../hooks/useDialog";
import { format } from "date-fns";
import EditOccupationDialog from "./EditOccupationDialog";

export default function OccupationCard({userDetails, isUser, isMentor}: {
    userDetails: PublicUser,
    isUser: boolean,
    isMentor: boolean,
}){
    const { name } = userDetails || {};
    const [openDialog, closeDialog] = useDialog();
    const [occupation] = userDetails.occupation || [];

    const handleEditEducation = () => {
        openDialog({
            children: <EditOccupationDialog onClose={closeDialog} />,
        })
    }

    return (
        <div className="relative flex flex-col p-3 shadow-lg rounded-md bg-white space-y-3">
            <h3 className="font-semibold text-lg">{isUser?"Your":`${name}'s`} Occupation</h3>
            <div className="absolute -top-2 right-0 m-1 text-white rounded-full bg-gray-100 transform scale-75">
                {isUser && <IconButton onClick={handleEditEducation} size="large">
                    <EditOutlined />
                </IconButton>}
            </div>
            {occupation ? <div className="flex flex-row items-center space-x-2">
                <p className="text-4xl w-16 text-center">🏢</p>
                <div className="space-y-2">
                    <h3>{occupation.position}</h3>
                    <p>{occupation.company}</p>
                    <p>{format(occupation.startDate.toDate(), 'MMM yyyy')} - {occupation.endDate ? format(occupation.endDate.toDate(), 'MMM yyyy') : 'Present'}</p>
                </div>
            </div>:
            <p>No Occupation Listed</p>}
        </div>)
}