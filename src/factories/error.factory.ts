type ErrorCodes = { [index: string]: { code:string, defaultInfo:string } };
const errorCodes:ErrorCodes = {
    unknown: { code: 'UNKNOWN_ERROR', defaultInfo: "There was a unknown error. Sorry :(" },
    auth: { code: 'AUTH_ERROR', defaultInfo: "The authentication information couldn't be validated." }
}

type ErrorType = 'unknown' | 'auth';
export default function generateError ( type?:ErrorType, info?:any ) {
    if ( !type ) type = 'unknown';
    const desc = info || errorCodes[type].defaultInfo;
    return { error: { code: errorCodes[type].code, info: desc } }
}