import { lazy, useState } from "react";
import { FolderOpenOutlined } from "@material-ui/icons";
import AttachmentItem from "./AttachmentItem";

const LazyAttachmentsDialog = lazy(() => import('./AttachmentsDialog'))

const AttachmentsCard = ({ roomId, attachments = []}) => {
    const [open, setOpen] = useState(false);
    
    return <>
        {open ?<LazyAttachmentsDialog open={open} onClose={_ => setOpen(false)} roomId={roomId}/> : null}
        <div className="p-3 m-2 shadow-lg rounded-md bg-white space-y-3 flex-1 max-h-full overflow-auto">
            <div className="w-full flex flex-row justify-between">
                <p className="font-medium">Shared Files and Links</p>
                {attachments.length !== 0 ? <div className="mt-auto text-blue-700 underline text-xs cursor-pointer" onClick={_ => setOpen(true)}>See All</div> : null}
            </div> 
            <div className="flex flex-col">
                {attachments.length === 0? <p className="text-gray-500 text-center py-5">No Shared Files And Links</p> : null}
                {attachments.sort(({uploadedOn: x},{uploadedOn: y}) => y-x).map(({ attachmentType, url, title, image, downloadUrl, filename, filetype, uploadedOn }) => {
                    return (attachmentType === 'url') ?  <AttachmentItem 
                            image={image}
                            IconComponent={FolderOpenOutlined}
                            title={title || url}
                            subtitle={url}
                            key={`${uploadedOn} and  ${url}`}
                            onClick={() => window.open(url, "_blank")}
                        /> : <AttachmentItem 
                            IconComponent={FolderOpenOutlined}
                            title={filename}
                            date={uploadedOn.toDate().toISOString()}
                            key={`${uploadedOn} and  ${downloadUrl}`}
                            onClick={() => window.open(downloadUrl, "_blank")}
                        />
                })}
            </div>
        </div>
    </>
}

export default AttachmentsCard