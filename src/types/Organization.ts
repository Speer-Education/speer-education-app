import { InternalDoc } from "./DocConverter";

export type Organization = {
    name: string;
}

export type OrganizationDocument = Organization & InternalDoc;