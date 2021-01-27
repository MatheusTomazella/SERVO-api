import jwtModule from 'jsonwebtoken';
import generateError from './factories/error.factory';
import { ComponentType } from './types/Component.type';
import { TokenPayload } from './token/JWT.type';

class JWT {
    constructor ( ) {
        return this;
    }
    sign ( payload:TokenPayload ) {
        if ( !process.env.JWT_HASH ) return;
        return jwtModule.sign( payload, process.env.JWT_HASH );
    }
    verify ( token:string ) {
        try {
            jwtModule.verify( token, process.env.JWT_HASH || '' );
            return true; 
        }
        catch {
            return false;
        }
    }
    decode ( token:string ):boolean|TokenPayload {
        if ( this.verify(token) ) return jwtModule.decode( token ) as TokenPayload;
        else return false;
    }
}

export default new JWT();