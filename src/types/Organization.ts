import { InternalDoc } from "./DocConverter";
import { UserID } from "./User";

export type Organization = {
    name: string;
    permissions: {
        [uid: UserID]: 'owner' | 'admin';
    }
}

export type OrganizationDocument = Organization & InternalDoc;