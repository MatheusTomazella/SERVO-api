import { DatabaseIndex } from "./Database.type";

export type StoredUser = { 
    id:DatabaseIndex,
    name:string,
    email:string,
}