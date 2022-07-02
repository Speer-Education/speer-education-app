import { ChangeEvent, FC, useState } from "react"
import { getDownloadURL, ref, uploadBytesResumable, UploadTask } from "firebase/storage";
import { db, docConverter, storage } from "../../config/firebase";
import { useAuth } from "../../hooks/useAuth";
import { Button, DialogContent, DialogTitle } from "@mui/material";
import LinearProgressWithLabel from "../Loader/LinearProgressWithLabel";
import { doc, updateDoc } from "firebase/firestore";
import { UserDetailsDocument } from "../../types/User";
import { useSnackbar } from "notistack";
import { UploadFile } from "@mui/icons-material";

const UploadResumeDialog: FC<{ onClose: () => void }> = ({ onClose }) => {
    const { user } = useAuth();
    const [uploadTask, setUploadTask] = useState<UploadTask>();
    const [uploadProgress, setUploadProgress] = useState(0);
    const { enqueueSnackbar } = useSnackbar();

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        if (!file) return;
        if (!user) return;
        //check if file is a pdf and is smaller than 10MB
        if (file.type !== "application/pdf" || file.size > 10 * 1024 * 1024) {
            enqueueSnackbar("Please upload a valid PDF file smaller than 10 MB", { variant: "error" });
            return;
        }
        const storageRef = ref(storage, `users/${user.uid}/resume`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
        }, (error) => {
            console.error(error);
        },
        () => {
            getDownloadURL(storageRef).then(async url => {
                await updateDoc(doc(db, 'users', user.uid).withConverter(docConverter), { resumeURL: url } as Partial<UserDetailsDocument>)
                onClose();
            })
        })
        setUploadTask(uploadTask);
    }


    return <>
        <DialogTitle>Choose your resume to upload</DialogTitle>
        <DialogContent>
            {!uploadTask ? <label className="flex flex-col w-full" htmlFor='resume_upload'>
                <input
                    className="hidden"
                    accept='application/pdf'
                    id='resume_upload'
                    type="file"
                    onChange={onFileChange}
                />
                <Button
                    component="span"
                    variant="contained"
                    startIcon={<UploadFile />}
                >
                    Upload Resume
                </Button>
            </label>: 
            <div className="flex flex-col items-center">
                {uploadProgress == 100 ? 
                <div className="text-green-500">
                    Upload Complete
                </div> :
                <LinearProgressWithLabel value={uploadProgress}/>
                }
            </div>}
        </DialogContent>
    </>
}

export default UploadResumeDialog;