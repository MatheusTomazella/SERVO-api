import jwtModule from 'jsonwebtoken';
import generateError from './factories/error.factory';

class JWT {
    constructor ( ) {
        return this;
    }
    sign ( payload:{_id:string} ) {
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
}

export default new JWT();