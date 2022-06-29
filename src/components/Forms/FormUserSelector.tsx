import { TextField, Autocomplete, Chip, AutocompleteProps } from '@mui/material';
import { Control, Controller, Path } from 'react-hook-form';
import ProfilePicture from '../User/ProfilePicture';
import React from 'react';
import {useState} from 'react';
import {UserHit} from '../../types/Algolia';
import {usersIndex} from '../../config/algolia';
const FormUserSelector = <T = unknown>({ control, name, rules = {}, filter = () => true, label, ...props }: {
    control: Control<T>;
    name: Path<T>;
    filter?: (user: UserHit) => boolean;
    rules?: any;
    label: string;
} & Partial<AutocompleteProps<UserHit, true, false, false, typeof Chip>>) => {
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = useState<UserHit[]>([]);
    const [open, setOpen] = useState(false);

    React.useEffect(() => {
        if(!open) {
            setOptions([]);
            return;
        }
        usersIndex.search<UserHit>(inputValue, {
            hitsPerPage: 10
        })
        .then((content) => {
            setOptions(content.hits.filter(hit => !!hit.name).filter(filter))
        });
    }, [inputValue, open]);

    return <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
            <Autocomplete
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                multiple
                autoComplete
                fullWidth
                {...props}
                value={value as UserHit[]}
                onChange={(event, newValue) => { onChange(newValue) }}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                        <Chip
                            label={option.name}
                            avatar={<ProfilePicture uid={option.objectID} className="rounded-full" />}
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
                        label={label}
                        placeholder="Add"
                        variant="filled"
                        {...params}
                    />
                )}
            />
        )}
        rules={{ required: true }}
    />
};

export default FormUserSelector;