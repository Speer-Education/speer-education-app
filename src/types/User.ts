import { Timestamp } from 'firebase/firestore';
import {InternalDoc} from './DocConverter';

export type UserDetails = {
    name: string;
    major: string;
    school: string;
    bio: string;
    country: string;
    dateOfBirth: string;
    email: string;
    finishSetup: boolean;
    highlight1: UserHighlight;
    highlight2: UserHighlight;
    activeRooms?: {
        [roomId: string]: ActiveRoom
    }
    hsGradYear: string;
    isAdm: boolean;
    isMtr: boolean;
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

export type CountryCode = string;

export type NewUserDetails = {
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
        country: string;
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

export type PublicUser = {
    name: string;
    dateOfBirth: Date;
    email: string;
    country: string;
    organization?: string;
    biography: string;
    education: {
        major: string;
        school: string;
        graduationDate: Date;
        country: string;
    }[],
    highlights: UserHighlight[],
    socials: {
        github: string;
        personal: string;
        youtube: string;
    },
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

export type UserDetailsToken = UserDetails & UserClaims;
export type UserDetailsDocument = UserDetails & InternalDoc
export type MentorDetailsDocument = MentorDetails & InternalDoc;