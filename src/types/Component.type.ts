import { DatabaseIndex } from "./Database.type";

export type ComponentType = 'light' | 'component';

export type StoredComponent = {
    id:DatabaseIndex,
    name:string,
    type:ComponentType,
    userId:DatabaseIndex
}