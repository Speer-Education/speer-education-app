import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { DatePickerProps } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField"
import {Controller, Control, Path} from 'react-hook-form';
import {TextFieldProps} from '@mui/material';

const FormDatePicker = <T = unknown>({name, control, rules = {}, label, size, ...props}: {
    control: Control<T>;
    name: Path<T>;
    rules?: any;
    size?: TextFieldProps['size']
    variant?: TextFieldProps['variant']
} & Partial<DatePickerProps<Date>>) => {
    return <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value } }) => 
            <DatePicker
                label={label}
                renderInput={(params) =>  
                    <TextField 
                        variant="filled"
                        size={size}
                        {...params}/> 
                    }
                onChange={onChange}
                value={value}
            />
        }
        {...props}
    />
}

export default FormDatePicker;
