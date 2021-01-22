import express from 'express';
import database from './../Database';

const router = express.Router( );

/* Ping */
    router.get( '/', ( request, response ) => {
        response.redirect( '/ping' );
    }  )
    router.get( '/ping', ( request, response ) => {
        response.status(200).json( { connection: true } );
    } )

/* GET */
    router.get( '/user', async ( request, response ) => {
        response.json( await database.fetchUser() );
    } )
    router.get( '/component', async ( request, response ) => {
        response.json( await database.fetchComponent() );
    } )

export default router;