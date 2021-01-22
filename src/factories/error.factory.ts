type ErrorCodes = { [index: string]: { code:string, defaultInfo:string } };
export const errorCodes:ErrorCodes = {
    unknown: { code: 'UNKNOWN_ERROR', defaultInfo: "There was an unknown error. Sorry :(" },
    auth: { code: 'AUTH_ERROR', defaultInfo: "The authentication information couldn't be validated." },
    query: { code: 'QUERY_ERROR', defaultInfo: "There was an error while processing the query." }
}

type ErrorType = 'unknown' | 'auth' | 'query';
export type ServoError = {
    error: {
        code:string,
        info:any
    }
}
export default function generateError ( type?:ErrorType, info?:any ):ServoError {
    if ( !type ) type = 'unknown';
    const desc = info || errorCodes[type].defaultInfo;
    return { error: { code: errorCodes[type].code, info: desc } }
}