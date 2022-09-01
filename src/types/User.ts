import { Timestamp } from 'firebase/firestore';
import {InternalDoc} from './DocConverter';
import { RoomID } from './Messaging';

export type CountryCode = any;

export type UserDetails = {
    name: string;
    dateOfBirth: Timestamp;
    email: string;
    country: CountryCode;
    biography: string;
    organization?: string;
    education: {
        major: string;
        school: string;
        graduationDate: Timestamp;
    }[],
    resumeURL?: string;
    activeRooms?: {
        [roomId: string]: ActiveRoom
    }
    highlights: UserHighlight[],
    socials: {
        github: string;
        personal: string;
        youtube: string;
        linkedin: string;
        dribbble: string;
        pinterest: string;
    },
    stats: {
        menteesCount: number;
        mentoryCount: number;
        profanities: number;
        followedCount: number;
        followerCount: number;
        connectedMentees: string[],
        views: number;
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
    id: UserID;
    name: string;
}

export type Relation = {
    createdAt: Timestamp;
    followerId: string;
    followedId: string;
    isMtr: boolean;
    roomId: RoomID;
}

export type PublicUserDoc =  PublicUser & InternalDoc;
export type UserDetailsToken = UserDetails & UserClaims;
export type UserDetailsDocument = UserDetails & InternalDoc
export type MentorDetailsDocument = MentorDetails & InternalDoc;

export type UserID = string;