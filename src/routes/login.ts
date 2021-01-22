import express from 'express'
import JWT from '../JWT';
import database from './../Database'
import errorFac from './../factories/error.factory'
const loginRoutes = express.Router();

loginRoutes.post( '/login', ( request, response ) => {
    if ( !request.body.email ) { 
        response.status( 401 ).json( errorFac( 'auth', 'Email missing' ) );
        return;
    }
    if ( !request.body.password ) { 
        response.status( 401 ).json( errorFac( 'auth', 'Password missing' ) );
        return;
    }
    response.status(200).json( { token: JWT.sign( {_id: 'web845brb84ebe6e55w4g'} ) } )
} )

export default loginRoutes;