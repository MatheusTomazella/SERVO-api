import express from 'express';

import errorFac from '../factories/error.factory';
import JWT from '../JWT';
import { isBigBoyAdmin, noTokenNeeded } from '../token/tokenValidation';

const middleware = express.Router( );

middleware.use( ( request, response, next ) => {
    if ( isBigBoyAdmin( request ) ) { next(); return; }
    if ( noTokenNeeded( request.path ) ) {
        next();
        return;
    } 
    const token = request.query.token || request.body?.token;
    if ( JWT.verify( token ) ) { 
        next( );
    }
    else response.status(401).json( errorFac( 'auth', 'Invalid Token.' ) );
} )

middleware.get( '/authTest', ( request, response ) => {
    response.status(200).json( { connection: true } )
} )

export default middleware;