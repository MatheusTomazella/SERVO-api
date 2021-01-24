import mongoose from 'mongoose';
import { ComponentType } from "./Component.type";
import { UserName } from './User.type';

export type DatabaseIndex = string;

export type UserToInsert = {
    name: {
        first:string,
        last:string
    },
    email:string,
    password:string
}
export type UserQuery = {
    _id?:DatabaseIndex,
    name?:UserName,
    email?:string,
    password?:string
}
export type ComponentToInsert = {
    name:string,
    type:ComponentType,
    userId:DatabaseIndex,
    password:string
} 
export type ComponentQuery = {
    _id?:DatabaseIndex,
    type?:ComponentType,
    name?:string,
    userId?:DatabaseIndex,
    password?:string
}


export type MongoConnectionInfo = {
    uri:string,
    options?:mongoose.ConnectOptions
}

export type ServoDatabaseTable = 'User' | 'Component';