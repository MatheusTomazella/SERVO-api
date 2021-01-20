import request from 'supertest';

import app from '../src/App';
import errorFac from './../src/factories/error.factory'

describe('Authentication middleware', () => {
    it('should return an error when a request without a token is sent', async ( ) => {
        const response = await request( app.express ).get( '/authTest' )
        expect( response.status ).toBe( 401 );
        expect( response.body.error?.code ).toEqual( errorFac( 'auth' ).error.code );
    });
});