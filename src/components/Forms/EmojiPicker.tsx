import {Button, Popover} from '@mui/material';
import Picker, { IEmojiData } from 'emoji-picker-react';
import React, { FC } from 'react';
import { Control, Controller, Path } from 'react-hook-form';

const EmojiPicker: FC<{value: string, onChange: (e: any) => void}> = ({value, onChange}) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const handleEmojiSelected = (e: React.MouseEvent<Element, MouseEvent>, emoji: IEmojiData) => {
        onChange(emoji.emoji);
        handleClose();
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    
    return <div className="px-3">
        <Button variant="outlined" id={id} onClick={handleClick}>{value || "Emoji"}</Button>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            >
            <Picker
                onEmojiClick={handleEmojiSelected}/>
        </Popover>
    </div>
}

export default EmojiPicker;

export const FormEmojiPicker = <T = unknown>({ control, name, rules, ...props }: {control: Control<T, any>, name: Path<T>, rules?: any}) => {
    return <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => (
            <EmojiPicker value={value as string} onChange={onChange} {...props} />
        )}
    />
}
