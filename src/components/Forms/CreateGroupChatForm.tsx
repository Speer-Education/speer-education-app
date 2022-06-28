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
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = useState<UserHit[]>([]);
    const [open, setOpen] = useState(false);
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

    React.useEffect(() => {
        if(!open) {
            setOptions([]);
            return;
        }
        usersIndex.search<UserHit>(inputValue, {
            hitsPerPage: 10
        })
        .then((content) => {
            setOptions(content.hits.filter(hit => !!hit.name && (hit.objectID != user?.uid)))
        });
    }, [inputValue, open]);

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
            <Controller
                control={control}
                name="participants"
                render={({ field: { onChange, value }}) => (
                    <Autocomplete
                        open={open}
                        onOpen={() => setOpen(true)}
                        onClose={() => setOpen(false)}
                        multiple
                        autoComplete
                        fullWidth
                        value={value}
                        onChange={(event, newValue) => {onChange(newValue)}}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        renderTags={(tagValue, getTagProps) =>
                            tagValue.map((option, index) => (
                                <Chip
                                    label={option.name}
                                    avatar={<ProfilePicture uid={option.objectID} className="rounded-full"/>}
                                    {...getTagProps({ index })}
                                />
                            ))
                        }
                        noOptionsText="No labels"
                        renderOption={(props, option, { selected }) => (
                            <li {...props}>
                                <ProfilePicture className="h-8 w-8 rounded-full" uid={option.objectID} thumb />
                                <div className="flex-col ml-2">
                                    <h3 className="font-semibold">{option.name}</h3>
                                </div>
                            </li>
                        )}
                        getOptionLabel={(option) => option.name}
                        //@ts-ignore
                        isOptionEqualToValue={(option, value) => option.objectID === value.objectID}
                        options={options}
                        renderInput={(params) => (
                            <TextField
                                label="Participants"
                                placeholder="Add"
                                variant="filled"
                                {...params}
                            />
                        )}
                    />
                )}
                rules={{ required: true }}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit(onSubmit)} disabled={!isValid || isSubmitting}>Create</Button>
        </DialogActions>
    </>
}

export default CreateGroupChatForm;