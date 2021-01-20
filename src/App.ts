require( 'dotenv' ).config( );

import express  from 'express';
import bp       from 'body-parser'
import CORS     from 'cors';

import middleware from './routes/auth';
import router     from './routes/router';

interface App {
    express: Express.Application
}
class App implements App {
    constructor ( ) {
        const app = express( );

        app.use( CORS( ) );
        app.use( bp.json( ) );
        app.use( bp.urlencoded( { extended: false } ) )

        app.use( middleware );
        app.use( router );

        this.express = app;
        return this;
    }
}

export default new App( );