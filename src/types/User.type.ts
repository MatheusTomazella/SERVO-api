import { DatabaseIndex } from "./Database.type";

export type StoredUser = { 
    _id:DatabaseIndex,
    name: {
        first: string,
        last: string
    },
    email:string,
}