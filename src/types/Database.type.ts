import mongoose from 'mongoose';
import { ComponentType } from "./Component.type";

export type DatabaseIndex = string;

export type UserToInsert = {
    name: {
        first:string,
        last:string
    },
    email:string,
    password:string
}
export type ComponentToInsert = {
    name:string,
    type:ComponentType,
    userId:DatabaseIndex,
    password:string
} 


export type MongoConnectionInfo = {
    uri:string,
    options?:mongoose.ConnectOptions
}

export type ServoDatabaseTable = 'User' | 'Component';