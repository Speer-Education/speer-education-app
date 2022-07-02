import { FC } from "react";
import { PublicUser, UserDetailsDocument } from "../../types/User";
import {Button, IconButton} from '@mui/material';
import {EditOutlined} from '@mui/icons-material';
import { useDialog } from "../../hooks/useDialog";
import UploadResumeDialog from "./UploadResumeDialog";

const ResumeCard: FC<{ userDetails: PublicUser, isUser: boolean }> = ({ userDetails, isUser }) => {
    const { name, resumeURL } = userDetails || {};
    const [openDialog, closeDialog] = useDialog();
    const editResume = () => {
        openDialog({
            children: <UploadResumeDialog onClose={closeDialog} />,
        })
    }

    const resume = resumeURL ? <a className="text-blue-800 font-semibold underline" href={resumeURL} target="_blank" rel="noopener noreferrer">Resume</a> : "No Resume Uploaded";

    return <div className="relative flex flex-col p-3 m-2 shadow-lg rounded-md bg-white space-y-3">
        <div className=" flex flex-row space-between">
            <h3 className="font-semibold text-lg">{isUser?"Your":`${name}'s`} Resume</h3>
            <div className="absolute top-0 right-0 m-1 text-white rounded-full bg-gray-100 transform scale-75">
                {isUser && <IconButton onClick={editResume} size="large">
                    <EditOutlined />
                </IconButton>}
            </div>
        </div>
    
        <div className="flex flex-row space-x-2">
            {resume}
        </div>
    </div>
}

export default ResumeCard;