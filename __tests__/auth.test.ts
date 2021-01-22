import request from 'supertest';

import app from '../src/App';
import errorFac from './../src/factories/error.factory'

describe('Login', () => {
    it('shouldnt login', async () => {
        request( app.express )
        .post( '/login' )
        .send( {
            corno: 'kkkk'
        } )
        .expect( 401 )
    });
    it('should login and receive token', async () => {
        const user = (await request( app.express ).get( '/randomUser' )).body;
        const response = await request( app.express )
        .post( '/login' )
        .send( {
            email: user.email,
            password: user.password
        } )
        .expect( 200 )
        expect( response.body.token ).toBeDefined()
    });
});

describe('Authentication middleware', () => {
    it('should return an error when a request without a token is sent', async ( ) => {
        const response = await request( app.express ).get( '/authTest' )
        expect( response.status ).toBe( 401 );
        expect( response.body.error?.code ).toEqual( errorFac( 'auth' ).error.code );
    });
    it('shouldnt return an error when a request with token is sent', async () => {
        const response = await request( app.express ).get( '/authTest?token=bzVXZeev9PIPzFPvJ13qWGsplRmuyb' );
        expect( response.status ).toBe( 200 );
    });
});