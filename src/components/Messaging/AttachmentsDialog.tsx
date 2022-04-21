import { Dialog } from '@headlessui/react';
import { FolderOpenOutlined } from '@mui/icons-material';
import { collection, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db, docConverter } from '../../config/firebase';
import DialogBase from '../Dialog/DialogBase';
import AttachmentItem from './AttachmentItem';
import {AttachmentDocument} from '../../types/Messaging';

const AttachmentsDialog = ({open, onClose, roomId}) => {
  const [attachments = [], loading, error] = useCollectionData<AttachmentDocument>(query(collection(db,'rooms',roomId, 'attachments').withConverter(docConverter), orderBy('uploadedOn','desc')))

  return (
      <DialogBase open={open} onClose={onClose}>
          <div className="inline-block w-full max-w-md p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg overflow-y-auto" style={{maxHeight: "30rem"}}>
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Shared Files and Links
              </Dialog.Title>
              <div className="mt-2 h-full">
              {attachments.length === 0 ? "Loading..." : null}
              {attachments.map(({ attachmentType, url, title, image, downloadUrl, filename, fileType, uploadedOn }) => {
                  return (attachmentType === 'url') ?  <AttachmentItem 
                          image={image}
                          IconComponent={FolderOpenOutlined}
                          title={title || url!}
                          subtitle={url!}
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

              <div className="mt-2 min-h-8">
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
