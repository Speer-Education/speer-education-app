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
    lastMessage: Message & {messageId: string},
    messageAmount: number,
    users: string[],
    roomName?: {
        [userId: string]: string;
    },
    name?: string, //Only group chats will have these
    picture?: string, //Only group chats will have these
}

export type MessageDocument = Message & InternalDoc
export type MessageRoomDocument = MessageRoom & InternalDoc
export type AttachmentDocument = Attachment & InternalDoc

/* Group chats will have:
1. Name
2. Picture (Use some default img first, and let picture be changeable)
3. roomName field is not mandatory for group chats, since we get the name from the name field. Maybe make roomName and optional field, and ensure it isn't created when room is created.
*/

//Group Chat creation function will require:
/*
1. A name for the group
2. A picture for the group
3. A list of members to add for the group.

Function will create a messageRoom, but not create a roomName field/
*/