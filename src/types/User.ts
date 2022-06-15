import { Timestamp } from 'firebase/firestore';
import {InternalDoc} from './DocConverter';

export type CountryCode = string;

export type UserDetails = {
    name: string;
    dateOfBirth: Date;
    email: string;
    country: CountryCode;
    biography: string;
    organization?: string;
    education: {
        major: string;
        school: string;
        graduationDate: Date;
        country: CountryCode;
    }[],
    activeRooms?: {
        [roomId: string]: ActiveRoom
    }
    highlights: UserHighlight[],
    socials: {
        github: string;
        personal: string;
        youtube: string;
    },
    permissions: {
        isAdm: boolean;
        isMtr: boolean;
    },
    stats: {
        menteesCount: number;
        mentoryCount: number;
        profanities: number;
        followedCount: number;
        followerCount: number;
        connectedMentees: string[]
    },
    _firstLogin: Timestamp,
    _updatedOn: Timestamp
}

export type PublicUser = Omit<UserDetails, 'activeRooms'>;

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

export type MentorDetails = PublicUser

export type UserHighlight = {
    description: string;
    emoji: string;
}

export type UserClaims = {
    banned: boolean;
    finishSetup: boolean;
    isAdm: boolean;
    isMtr: boolean;
    organization?: string;
}

export type SimpleUserDetails = {
    id: string;
    name: string;
}

export type Relation = {
    createdAt: Timestamp;
    followerId: string;
    followedId: string;
    isMtr: boolean;
    roomId: string;
}

export type PublicUserDoc =  PublicUser & InternalDoc;
export type UserDetailsToken = UserDetails & UserClaims;
export type UserDetailsDocument = UserDetails & InternalDoc
export type MentorDetailsDocument = MentorDetails & InternalDoc;

export type UserID = string;