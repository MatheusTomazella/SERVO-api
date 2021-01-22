import express from 'express';

import errorFac from '../factories/error.factory';

const middleware = express.Router( );

middleware.use( ( request, response, next ) => {
    if ( [ '/ping', '/' ].indexOf( request.path ) !== -1 ) {
        next();
        return;
    } 
    const token = request.query?.token || request.body?.token;
    if ( token === process.env.TOKEN ) { 
        delete request.query.token;
        delete request.body.token;
        next( );
    }
    else response.status(401).json( errorFac( 'auth' ) );
} )

export default middleware;