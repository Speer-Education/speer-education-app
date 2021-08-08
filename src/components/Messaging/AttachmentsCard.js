import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { db } from "../../config/firebase";
import ProfilePicture from "../User/ProfilePicture";
import { FolderOpenOutlined } from "@material-ui/icons";

const AttachmentItem = ({ image, IconComponent, title, subtitle }) => (
    <div className="flex flex-row space-x-2 py-1 rounded-lg cursor-pointer hover:bg-gray-100 w-full">
        <div className="h-12 w-12 bg-red-200 grid place-items-center rounded-xl overflow-hidden">
            {image?<img className="h-full w-full object-cover" src={image}/>:<IconComponent />}
        </div>
        <div className="flex flex-col space-y-1 flex-1 overflow-hidden">
            <h4 className="overflow-hidden overflow-ellipsis whitespace-nowrap w-10/12">{title}</h4>
            <p className="overflow-hidden overflow-ellipsis whitespace-nowrap w-10/12 text-gray-500">{subtitle}</p>
        </div>
    </div>)

const AttachmentsCard = ({ attachments = [] }) => {
    return <div className="p-3 m-2 shadow-lg rounded-md bg-white space-y-3">
        <div className="w-full flex flex-row justify-between">
            <p className="font-medium">Shared Files and Links</p>
        </div>
        <div className="flex flex-col">
            {attachments.sort(({uploadedOn: x},{uploadedOn: y}) => y-x).map(({ attachmentType, url, title, image, downloadUrl, filename, filetype, uploadedOn }) => {
                return (attachmentType == 'url') ?  <AttachmentItem 
                        image={image}
                        IconComponent={FolderOpenOutlined}
                        title={title || url}
                        subtitle={url}
                        key={`${uploadedOn} and  ${url}`}
                    /> : <AttachmentItem 
                        IconComponent={FolderOpenOutlined}
                        title={filename}
                        subtitle={uploadedOn.toDate().toISOString()}
                        key={`${uploadedOn} and  ${url}`}
                    />
            })}
        </div>
    </div>
}

export default AttachmentsCard