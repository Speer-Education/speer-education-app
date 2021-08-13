import TimeAgo from 'react-timeago';

const AttachmentItem = ({ image, IconComponent, title, subtitle,date }) => (
    <div className="flex flex-row space-x-2 py-1 rounded-lg cursor-pointer hover:bg-gray-100 w-full">
        <div className="h-12 w-12 bg-red-200 grid place-items-center rounded-xl overflow-hidden">
            {image?<img className="h-full w-full object-cover" src={image}/>:<IconComponent />}
        </div>
        <div className="flex flex-col space-y-1 flex-1 overflow-hidden">
            <h4 className="overflow-hidden overflow-ellipsis whitespace-nowrap w-10/12">{title}</h4>
            <p className="overflow-hidden overflow-ellipsis whitespace-nowrap w-10/12 text-gray-500"><TimeAgo date={date} />{subtitle}</p>
        </div>
    </div>)

export default AttachmentItem