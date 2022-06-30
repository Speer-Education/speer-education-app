import { FC } from "react";
import {Button, DialogActions, DialogContent, DialogTitle} from '@mui/material';
import {useForm} from 'react-hook-form';
import {useAuth} from '../../hooks/useAuth';
import {UserHit} from '../../types/Algolia';
import {httpsCallable} from 'firebase/functions';
import {functions} from '../../config/firebase';
import {UserID} from '../../types/User';
import {useSnackbar} from 'notistack';
import {useNavigate} from 'react-router-dom';
import FormUserSelector from '../Forms/FormUserSelector';
import { useSpeerOrg } from "../../hooks/useSpeerOrg";

type FormValues = {
    users: UserHit[];
}

const AddUserToOrganization: FC<{ onClose: () => void }> = ({ onClose }) => {
    const { user } = useAuth();
    const { orgId } = useSpeerOrg();
    const { control, handleSubmit, watch, formState: { isValid, isSubmitting } } = useForm<FormValues>({
        defaultValues: {
            users: [],
        },
        mode: "onChange",
    });
    const { enqueueSnackbar } = useSnackbar();

    const onSubmit = async (data: FormValues) => {
        try {
            const UpdateGroupChat = httpsCallable<{ users: UserID[], orgId: string }, boolean>(functions, 'AddUserToOrganization');
            await UpdateGroupChat({
                users: data.users.map(participant => participant.objectID),
                orgId
            })
            onClose();
        } catch (e) {
            console.error(e)
            enqueueSnackbar(e.message, { variant: "error" })
        }
    }

    return <>
        <DialogTitle>Add Participants</DialogTitle>
        <DialogContent sx={{minWidth: '260px'}}>
            <h3>Search for users to add to your organization.</h3>
            <p>Users in another organization <b>can't</b> join a new organization unless they quit their existing ones.</p>
            <FormUserSelector 
                control={control} 
                name="users" 
                label="Add Users" 
                filter={(hit: UserHit) => (hit.objectID != user?.uid)}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit(onSubmit)} disabled={!isValid || isSubmitting}>Add</Button>
        </DialogActions>
    </>
}

export default AddUserToOrganization;