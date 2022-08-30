import React, { FC, forwardRef, useState } from "react";
import Select from 'react-select';
import InputBase from '@mui/material/InputBase'
import { InputBaseProps } from '@mui/material'
type Props = {
    label: string,
    required?: boolean,
    autoWidth?: boolean,
    type?: string,
    name?: string
}
const InputField = forwardRef<InputBaseProps, ( Props & InputBaseProps)>(({ className, label, id, required = false, onChange, autoWidth, ...props }, ref) => {
    const [empty, setEmpty] = useState(false);

    const handleInputChange = e => {
        if(onChange) onChange(e)
        if (required) setEmpty(e.target.value.length === 0)
    }

    return <div className={`${autoWidth ? "" : "w-full"} ${className}`}>
        {label && <label className="block titlecase tracking-wide text-xs font-bold mb-2" style={{color: "#2596be"}} htmlFor={id}>
            {label} {required ? <span className="text-red-600">*</span> : ""}
        </label>}
        <InputBase ref={ref} 
            className={`appearance-none block w-full ${empty && required ? "bg-red-100" : "bg-gray-200"} text-gray-700 placeholder-gray-400 border-0 focus:border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-300 focus:border-gray-500`}
            id={id}
            onChange={handleInputChange}
            size="small"
            {...props} />
    </div>
})

type InputAreaProps = { 
    required?: boolean,  
    label: string
 }

const InputAreaField = forwardRef<HTMLTextAreaElement, (InputAreaProps & React.HTMLAttributes<HTMLTextAreaElement>)>(({ className, label, id, required = false, ...props }, ref) => {
    return <div className={`w-full ${className}`}>
        {label && <label className="block titlecase tracking-wide text-gray-700 text-xs font-bold mb-2" style={{color: "#2596be"}} htmlFor={id}>
            {label} {required ? <span className="text-red-600">*</span> : ""}
        </label>}
        <textarea ref={ref} className="appearance-none block w-full bg-gray-200 text-gray-700 border-0 focus:border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id={id}
            {...props} />
    </div>
})

const selectStyle = {
    option: (provided, state) => ({
      ...provided,
    }),
    control: (provided, { isFocused }) => ({
        ...provided,
        width: "100%",
        backgroundColor: 'rgb(229, 231, 235)',
        border: isFocused?'1px solid rgb(107, 114, 128)':0,
        borderColor: isFocused?'rgb(107, 114, 128)':'rgb(229, 231, 235)',
        outline: "none",
        borderRadius: "4px"
    }),
    valueContainer: (provided, state) => ({
        ...provided,
        color: 'rgb(55, 65, 81)',
        padding: "8px 16px",
        fontSize: "14px",
        appearance: "none",
        display:"block",
    }),
    indicatorsContainer: (provided, state) => ({
        ...provided,
    }),
    menuPortal: base => ({ ...base, zIndex: 9999 })
  }
  

const InputSelect: FC<({
    required?: boolean,
    className?: string,
    label?: string,
    id: string
} & React.ComponentProps<typeof Select>)> = ({ className="", label="", id, required = false, ...props } ) => {
    return <div className={`w-full ${className}`}>
        <label className="block titlecase tracking-wide text-gray-700 text-xs font-bold mb-2" style={{color: "#2596be"}} htmlFor={id}>
            {label} {required ? <span className="text-red-600">*</span> : ""}
        </label>
        <Select className="user-details__custom-select" styles={selectStyle} id={id} {...props} />
    </div>
}

export { InputField, InputAreaField, InputSelect }