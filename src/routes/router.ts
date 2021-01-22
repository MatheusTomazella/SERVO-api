import express from 'express';
import database from './../Database';

const router = express.Router( );

router.get( '/', ( request, response ) => {
    response.redirect( '/ping' );
}  )

router.get( '/ping', ( request, response ) => {
    response.status(200).json( { connection: true } );
} )

router.get( '/user', async ( request, response ) => {
    response.json( await database.fetchUser() );
} )

export default router;