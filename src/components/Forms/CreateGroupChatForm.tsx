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
    name: string;
    participants: UserHit[];
}

const CreateGroupChatForm: FC<{ onClose: () => void }> = ({ onClose }) => {
    const { user } = useAuth();
    const { control, handleSubmit, watch, formState: { isValid, isSubmitting } } = useForm<FormValues>({
        defaultValues: {
            name: "",
            participants: [],
        },
        mode: "onChange",
    });
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const onSubmit = async (data: FormValues) => {
        try {
            console.log(data)
            const CreateGroupChat = httpsCallable<{name: string, users: UserID[], picture?: String}, RoomID>(functions, 'CreateGroupChat');
            const roomID = await CreateGroupChat({
                name: data.name,
                users: data.participants.map(participant => participant.objectID)
            })
            navigate(`/messages/${roomID.data}`);
            onClose();
        } catch (e) {
            console.error(e)
            enqueueSnackbar(e.message, { variant: "error" })
        }
    }

    return <>
        <DialogTitle>Create A Group Chat</DialogTitle>
        <DialogContent sx={{minWidth: '260px'}}>
            <FormInputText
                fullWidth
                control={control}
                name="name"
                label="Chat Name"
                variant="filled"
                rules={{ required: true }}
            />
            <h3 className="py-2">Chat Participants</h3>
            <FormUserSelector 
                control={control} 
                name="participants" 
                label="Participants" 
                filter={(hit: UserHit) => (hit.objectID != user?.uid)}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit(onSubmit)} disabled={!isValid || isSubmitting}>Create</Button>
        </DialogActions>
    </>
}

export default CreateGroupChatForm;