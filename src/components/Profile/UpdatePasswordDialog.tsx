import { Button, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useSnackbar } from "notistack";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import FormInputText from "../form-components/FormTextField";

type FormValues = {
    old: string;
    new: string;
    confirm: string;
}

const UpdatePasswordDialog: FC<{ onClose: () => void}> = ({ onClose }) => {
    const { user, changePassword } = useAuth();
    const { control, watch, formState: { isSubmitting, isValid }, handleSubmit } = useForm<FormValues>({
        mode: "onChange",
        defaultValues: {
            old: "",
            new: "",
            confirm: ""
        }
    })
    const { enqueueSnackbar } = useSnackbar();

    const newPassword = watch("new");

    const onSubmit = async (data: FormValues) => {
        if (!isValid) return;
        try {
            await changePassword(data.old, data.new)
            enqueueSnackbar("Password updated successfully", { variant: "success" });
            onClose();
        } catch (error) {
            enqueueSnackbar(error.message, { variant: "error" });
        }
    }

    return <>
        <DialogTitle>
            Update Password
        </DialogTitle>
        <DialogContent className="flex flex-col space-y-1">
            <FormInputText
                control={control}
                name="old"
                label="Old Password"
                variant="filled"
                type="password"
                size="small"
                rules={{ required: true, minLength: 8 }}
            />
            <FormInputText
                control={control}
                name="new"
                label="New Password"
                variant="filled"
                type="password"
                size="small"
                rules={{ required: true, minLength: 8 }}
            />
            <FormInputText
                control={control}
                name="confirm"
                label="Confirm Password"
                variant="filled"
                type="password"
                size="small"
                rules={{ required: true, minLength: 8, validate: (value) => value === newPassword }}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting || !isValid}>Update</Button>
        </DialogActions>
    </>
}

export default UpdatePasswordDialog;