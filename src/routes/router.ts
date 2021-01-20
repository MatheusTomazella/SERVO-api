import express from 'express';

const router = express.Router( );

router.get( '/', ( request, response ) => {
    response.redirect( '/ping' );
}  )

router.get( '/ping', ( request, response ) => {
    response.status(200).json( { connection: true } );
} )

export default router;