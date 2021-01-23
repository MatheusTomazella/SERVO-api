import { DatabaseIndex } from "./Database.type";

export type UserName = {
    first: string,
    last: string
}
export type StoredUser = { 
    _id:DatabaseIndex,
    name: UserName,
    email:string,
}