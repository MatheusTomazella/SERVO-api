import request from 'supertest';

import app from '../src/App';
import errorFac from './../src/factories/error.factory'

describe('Routes (no token)', () => {
    it('should return a SUCCESS status for the / route', async () => {
        await request( app.express ).get( `/ping` )
        .expect( 200 )
    });
    it('should return a SUCCESS status for the ping route', async () => {
        await request( app.express ).get( `/ping` )
        .expect( 200 )
    });
    it('should return a confirmation of connection for the ping route', async () => {
        const response = await request( app.express ).get( '/ping' )
        expect( response.body ).toMatchObject( { connection: true } );
    });
});