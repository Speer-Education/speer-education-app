import { SvgIconComponent } from '@mui/icons-material';
import React from 'react';
import TimeAgo from 'react-timeago';

const AttachmentItem = ({ image, IconComponent, title, hoverClass="hover:bg-gray-100", subtitle,date, onClick } : {
    image?: string,
    IconComponent?: SvgIconComponent,
    title: string,
    hoverClass?: string,
    subtitle?: string,
    date?: Date | string,
    onClick?: React.MouseEventHandler<HTMLDivElement>
}) => (
    <div className={`flex flex-row space-x-2 py-1 rounded-lg cursor-pointer ${hoverClass} w-full`} onClick={onClick}>
        <div className="h-12 w-12 bg-red-200 grid place-items-center rounded-xl overflow-hidden">
            {image?<img className="h-full w-full object-cover" src={image}/>: (IconComponent && <IconComponent />)}
        </div>
        <div className="flex flex-col space-y-1 flex-1 overflow-hidden">
            <div className="overflow-hidden overflow-ellipsis whitespace-nowrap w-10/12 font-bold">{title}</div>
            <div className="overflow-hidden overflow-ellipsis whitespace-nowrap w-10/12 text-gray-500">{date && <TimeAgo date={date} />}{subtitle}</div >
        </div>
    </div>)

export default AttachmentItem