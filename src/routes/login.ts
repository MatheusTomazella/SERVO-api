import express from 'express'
import { activeUsers } from '../data/ActiveElements';
import JWT from '../JWT';
import User from '../User';
import errorFac from './../factories/error.factory'
const loginRoutes = express.Router();

loginRoutes.post( '/login', async ( request, response ) => {
    if ( !request.body.email ) { 
        response.status( 401 ).json( errorFac( 'auth', 'Email missing' ) );
        return;
    }
    if ( !request.body.password ) { 
        response.status( 401 ).json( errorFac( 'auth', 'Password missing' ) );
        return;
    }
    const user = new User( request.body.email );
    if ( (await user.fetchFromDatabase( request.body.password ))._id ) {
        activeUsers.add( user );
        response.status(200).json( { token: JWT.sign( { _id: user.data._id } ) } );
    }
} )

export default loginRoutes;