import { Timestamp } from "firebase/firestore"
import { InternalDoc } from "./DocConverter"

export type Attachment = {
    title?: string,
    attachmentType: 'file' | 'url',
    bucketPath: string,
    downloadUrl?: string,
    url?: string,
    fileSize: number,
    fileType: 'file', 'image',
    filename: string,
    uploadedOn: Timestamp
}

export type AttachmentDocument = Attachment & InternalDoc