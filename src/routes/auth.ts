import express from 'express';

import errorFac from '../factories/error.factory';
import JWT from '../JWT';

const middleware = express.Router( );

middleware.use( ( request, response, next ) => {
    if ( [ '/ping', '/', '/login', '/loginComponent', '/randomUser', '/randomComponent' ].indexOf( request.path ) !== -1 ) {
        next();
        return;
    } 
    const token = request.query.token || request.body?.token;
    if ( JWT.verify( token ) ) { 
        delete request.query.token;
        delete request.body.token;
        next( );
    }
    else response.status(401).json( errorFac( 'auth', 'Invalid Token.' ) );
} )

middleware.get( '/authTest', ( request, response ) => {
    response.status(200).json( { connection: true } )
} )

export default middleware;