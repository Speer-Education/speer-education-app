import { InternalDoc } from "./DocConverter";
import {UserID, PublicUserDoc} from './User';

export type Organization = {
    name: string;
}

export type OrganizationMember = {
    role: 'member' | 'owner' | 'admin';
    isMentor?: boolean;
}

export type OrgMergedUser = OrganizationMemberDocument & PublicUserDoc;

export type OrganizationDocument = Organization & InternalDoc;
export type OrganizationMemberDocument = OrganizationMember & InternalDoc;