require( 'dotenv' ).config( );
import express  from 'express';
import bp       from 'body-parser'
import CORS     from 'cors';

import router     from './routes/router';
import login      from './routes/login';
import debug      from './routes/debug';
import middleware from './routes/auth';

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
        app.use( '/debug', debug );
        app.use( '/login', login );

        this.express = app;
        return this;
    }
}

export default new App( );