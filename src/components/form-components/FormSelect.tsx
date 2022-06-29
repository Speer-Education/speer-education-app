import {Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectProps, TextField, TextFieldProps} from '@mui/material';
import {Controller, Control, Path} from 'react-hook-form';
import React from "react";

const FormSelect = <T = unknown>({ control, name, rules = {}, fullWidth=true, label, options, ...props }: {
    control: Control<T>;
    name: Path<T>;
    type?: string;
    rules?: any;
    options: { label: string, value: string }[];
} & SelectProps) => {
    return <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => (
            <FormControl fullWidth={fullWidth}>
                <InputLabel id={name} variant={props.variant} size={props.size == 'small' && 'small' || 'normal'}>{label}</InputLabel>
                <Select
                    labelId={name}
                    id={name+'_select'}
                    value={value}
                    onChange={onChange}
                    label={label}
                    {...props}
                >
                    {options.map(({label, value}) => <MenuItem key={value} value={value}>{label}</MenuItem>)}
                </Select>
            </FormControl>
        )}
    />      
};

export default FormSelect;