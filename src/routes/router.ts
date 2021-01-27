import express from 'express';
import JWT from '../JWT';
import database from './../Database';
import { componentRequestTokenIsValid, isBigBoyAdmin } from '../token/tokenValidation';
import respondError from '../token/respondError';

const router = express.Router( );

/* Ping */
    router.get( '/', ( request, response ) => {
        response.redirect( '/ping' );
    }  )
    router.get( '/ping', ( request, response ) => {
        response.status(200).json( { connection: true } );
    } )

/* GET */
    router.get( '/user/:id?', async ( request, response ) => {
        const id = request.params.id || request.query.id;
        response.json( await database.fetchUser( (id)?{ _id: id as string }:undefined ) );
    } )
    router.get( '/component/:id?', async ( request, response ) => {
        const token = JWT.decode(request.query.token as string);
        const id = request.params.id || request.query.id;
        if ( await componentRequestTokenIsValid( token, id as string ) === false && !isBigBoyAdmin( request ) ) {
            respondError( { status:401,type:'auth',message:'The owner of the token do not have access to this information.' }, response );
            return;
        }
        response.json( await database.fetchComponent( (id)?{_id:id as string}:{} ) );
    } )

/* POST */
    router.post( '/user', async ( request, response ) => {
        database.insertUser( {
            name: {
                first: request.body.name.first,
                last: request.body.name.last
            },
            email: request.body.email,
            password: request.body.password
        } )
        .then(  user  => { response.status(201).json( user );  } )
        .catch( error => { response.status(500).json( error ); } );
    } );
    router.post( '/component', async ( request, response ) => {
        database.insertComponent({
            type: request.body.type,
            name: request.body.name,
            userId: request.body.userId,
            password: request.body.password
        } )
        .then(  component => { response.status(201).json( component ); })
        .catch( error     => { response.status(500).json( error );     });
    } );

export default router;