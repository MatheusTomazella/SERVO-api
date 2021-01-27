import generateError, { ErrorType } from "../factories/error.factory";

export default function respondError ( error:{status:number,type?:ErrorType,message:any}, response:any ) {
    if ( error.type ) error.message = generateError( error.type, error.message );
    response.status(error.status).json( error.message );
}

export function ifUndefinedRespondError ( value:any, error:{status:number,type:ErrorType,message:any}, response:any ) {
    if ( !value ) {
        respondError( error, response );
        return true;
    }
    return false;
}

export function ifTrueRespondError ( value:any, error:{status:number,type:ErrorType,message:any}, response:any ) {
    if ( value ) {
        respondError( error, response );
        return true;
    }
    return false;
}