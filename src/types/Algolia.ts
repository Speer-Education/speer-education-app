import { PublicUser } from "./User"

export type Hit<T = any> = T & { 
    objectID: string, 
    _highlightResult?: { 
        [key: string]: { 
            matchLevel: string, 
            matchedWords: string[], 
            value: any 
        } 
    } 
}

export type UserHit = Hit<PublicUser>