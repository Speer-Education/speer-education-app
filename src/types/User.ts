import { Timestamp } from 'firebase/firestore';
import {InternalDoc} from './DocConverter';
export type UserDetails = {
    bio: string;
    country: string;
    dateOfBirth: string;
    email: string;
    finishSetup: boolean;
    highlight1: UserHighlight;
    highlight2: UserHighlight;
    activeRooms: {
        [roomId: string]: ActiveRoom
    }
    hsGradYear: string;
    isAdm: boolean;
    isMtr: boolean;
    major: string;
    name: string;
    school: string;
    socials: {
        github: string;
        personal: string;
        youtube: string;
    },
    menteesCount: number;
    mentoryCount: number;
    profanities: number;
    followedCount: number;
    followerCount: number;
    connectedMentees: string[]
}

export type ActiveRoom = {
    date: Timestamp;
    files: any[],
    message: string,
    messageId: string,
    messageType: 'text',
    read: {
        [userId: string]: boolean;
    },
    recipientIds: string[],
    roomId: string,
    roomName: {
        [userId: string]: string;
    },
    senderId: string,
    senderUsername: string,
}

export type MentorDetails = Omit<UserDetails, 'activeRooms'>

export type UserHighlight = {
    description: string;
    emoji: string;
}

export type UserClaims = {
    banned: boolean;
    finishSetup: boolean;
    isAdm: boolean;
    isMtr: boolean;
    _lastCommitted: Timestamp;
}
export type UserDetailsDocument = UserDetails & InternalDoc
export type MentorDetailsDocument = MentorDetails & InternalDoc;