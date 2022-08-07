import { Autocomplete, AutocompleteCloseReason, Button, Chip, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { usersIndex } from '../../config/algolia';
import { useAuth } from "../../hooks/useAuth";
import FormInputText from "../form-components/FormTextField";
import ProfilePicture from '../User/ProfilePicture';
import {logEvent} from '../../utils/analytics';
import { UserHit } from "../../types/Algolia";
import { httpsCallable } from 'firebase/functions';
import { functions } from "../../config/firebase";
import { RoomID } from "../../types/Messaging";
import { UserID } from "../../types/User";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import FormUserSelector from "./FormUserSelector";

type FormValues = {
    participants: UserHit[];
}

const AddGroupMembersForm: FC<{ onClose: () => void, existing: UserID[], roomId: string }> = ({ onClose, existing, roomId }) => {
    const { user } = useAuth();
    const { control, handleSubmit, watch, formState: { isValid, isSubmitting } } = useForm<FormValues>({
        defaultValues: {
            participants: [],
        },
        mode: "onChange",
    });
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const onSubmit = async (data: FormValues) => {
        try {
            const UpdateGroupChat = httpsCallable<{ name?: string, newUsers?: UserID[], picture?: String, roomId: string }, boolean>(functions, 'UpdateGroupChat');
            await UpdateGroupChat({
                newUsers: data.participants.map(participant => participant.objectID),
                roomId
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
            <FormUserSelector 
                control={control} 
                name="participants" 
                label="New participants" 
                filter={(hit: UserHit) => (hit.objectID != user?.uid && !existing.includes(hit.objectID))}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit(onSubmit)} disabled={!isValid || isSubmitting}>Add</Button>
        </DialogActions>
    </>
}

export default AddGroupMembersForm;