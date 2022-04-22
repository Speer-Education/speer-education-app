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

export type Message = {
    date: Timestamp;
    files: any[],
    message: string,
    messageType: 'text',
    read: {
        [userId: string]: boolean;
    },
    recipientIds: string[],
    roomName: {
        [userId: string]: string;
    },
    senderId: string,
    senderUsername: string,
}

export type MessageRoom = {
    _createdOn: Timestamp,
    attachments: Attachment[],
    attachmentsAmount: number,
    lastMessage: Message,
    messageAmount: number,
    roomName: {
        [userId: string]: string;
    },
    users: string[],
    name?: string,
    picture?: string,
}

export type MessageDocument = Message & InternalDoc
export type MessageRoomDocument = MessageRoom & InternalDoc
export type AttachmentDocument = Attachment & InternalDoc