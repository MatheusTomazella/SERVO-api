import database from "./../Database";
import { StoredComponent } from "../types/Component.type";
import { TokenPayload } from "./JWT.type";

export function componentRequestTokenIsValid ( token:TokenPayload|boolean, id:string ) {
    if ( token === false ) return false;
    token = token as TokenPayload;
    if ( token._id === id ) return true;
    database.fetchComponent( { userId: token._id } )
    .then( userComponents => {
        userComponents.forEach( (component:StoredComponent) => {
            if ( String(component._id) === String(id) ) return true;
        } )
        return false;
    } )
    .catch( error => { console.log(error); return false; } );
}

export function noTokenNeeded ( path:string ) {
    if ( [ '/ping', '/', '/login', '/debug/random/component', '/debug/random/user' ]
        .indexOf( path ) !== -1 ) return true;
    if ( path.startsWith( '/login/component/' ) ) return true;
    return false;
}

export function isBigBoyAdmin ( request:any ) {
    const adminPass = request.body.adminPass || request.query.adminPass;
    if ( adminPass === process.env.ADMIN_PASS?.trim() ) return true;
    return false;
}