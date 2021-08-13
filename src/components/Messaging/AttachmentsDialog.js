import { Dialog } from '@headlessui/react';
import { FolderOpenOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import DialogBase from '../Dialog/DialogBase';
import AttachmentItem from './AttachmentItem';

const AttachmentsDialog = ({open, onClose, roomId}) => {
    const [attachments, setAttachments] = useState([]);
    
    useEffect(() => {
        return db.collection(`rooms/${roomId}/attachments`).orderBy('uploadedOn','desc').onSnapshot(snap => {
            let attachments = snap.docs.map(docSnap => ({
                id: docSnap.id,
                ...docSnap.data()
            }))
            setAttachments(attachments)
        })
    },[roomId])

    return (
        <DialogBase open={open} onClose={onClose}>
            <div className="inline-block w-full max-w-md p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg max-h-screen overflow-y-auto">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Shared Files and Links
                </Dialog.Title>
                <div className="mt-2 h-full">
                {attachments.map(({ attachmentType, url, title, image, downloadUrl, filename, filetype, uploadedOn }) => {
                    return (attachmentType == 'url') ?  <AttachmentItem 
                            image={image}
                            IconComponent={FolderOpenOutlined}
                            title={title || url}
                            subtitle={url}
                            key={`${uploadedOn} and  ${url}`}
                        /> : <AttachmentItem 
                            IconComponent={FolderOpenOutlined}
                            title={filename}
                            date={uploadedOn.toDate().toISOString()}
                            key={`${uploadedOn} and  ${url}`}
                        />
                })}
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 float-right text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </div>
        </DialogBase>
    );
}

export default AttachmentsDialog;
