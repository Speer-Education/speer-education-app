import { useState } from "react";
import Select from 'react-select';

const InputField = ({ className, label, id, required = false, onChange, autoWidth, ...props }) => {
    const [empty, setEmpty] = useState(false);

    const handleInputChange = e => {
        onChange(e)
        if (required) setEmpty(e.target.value.length === 0)
    }

    return <div className={`${autoWidth ? "" : "w-full"} px-3 ${className}`}>
        {label && <label className="block titlecase tracking-wide text-xs font-bold mb-2" style={{color: "#2596be"}} for={id}>
            {label} {required ? <span className="text-red-600">*</span> : ""}
        </label>}
        <input className={`appearance-none block w-full ${empty && required ? "bg-red-100" : "bg-gray-200"} text-gray-700 border-0 focus:border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-300 focus:border-gray-500`}
            id={id}
            onChange={handleInputChange}
            {...props} />
    </div>
}

const InputAreaField = ({ className, label, id, required = false, ...props }) => {
    return <div className={`w-full px-3 ${className}`}>
        {label && <label className="block titlecase tracking-wide text-gray-700 text-xs font-bold mb-2" style={{color: "#2596be"}} for={id}>
            {label} {required ? <span className="text-red-600">*</span> : ""}
        </label>}
        <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border-0 focus:border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id={id}
            {...props} />
    </div>
}

const InputSelect = ({ className, label, id, required = false, ...props }) => {
    return <div className={`w-full px-3 ${className}`}>
        <label className="block titlecase tracking-wide text-gray-700 text-xs font-bold mb-2" style={{color: "#2596be"}} for={id}>
            {label} {required ? <span className="text-red-600">*</span> : ""}
        </label>
        <Select className="user-details__custom-select" id={id} {...props} />
    </div>
}

export { InputField, InputAreaField, InputSelect }