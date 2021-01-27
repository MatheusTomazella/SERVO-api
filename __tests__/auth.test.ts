require( 'dotenv' ).config( { path: './.env.test' } )
import database from './../src/Database'
import request from 'supertest';

import app from '../src/App';
import errorFac from './../src/factories/error.factory'

let loggedUser:{_id:string,name:{first:string,last:string},email:string,password:string,token:string};
let loggedComp:any;

describe('Login User', () => {
    it('should not login', async () => {
        request( app.express )
        .post( '/login' )
        .send( {
            corno: 'kkkk'
        } )
        .expect( 401 )
    });
    it('should login and receive token', async () => {
        const user = (await request( app.express ).get( '/debug/random/user' )).body;
        const response = await request( app.express )
        .post( '/login' )
        .send( {
            email: user.email,
            password: user.password
        } )
        .expect( 200 );
        expect( response.body.token ).toBeDefined();
        loggedUser = response.body;
    });
});

describe('Authentication middleware (user)', () => {
    it('should return an error when a request without a token is sent', async ( ) => {
        const response = await request( app.express ).get( '/authTest' )
        expect( response.status ).toBe( 401 );
        expect( response.body.error?.code ).toEqual( errorFac( 'auth' ).error.code );
    });
    it('shouldnt return an error when a request with token is sent', async () => {
        const response = await request( app.express )
        .get( `/authTest?token=${loggedUser.token}` );
        expect( response.status ).toBe( 200 );
    });
})

describe('Login Component', () => {
    it('should not login', async () => {
        const component = (await request( app.express ).get( '/debug/random/component' )).body;
        request( app.express )
        .post( `/login/component/${component.type}/${component._id}` )
        .send( {
            corno: 'kkkk'
        } )
        .expect( 401 )
    });
    it('should login and receive token', async () => {
        const component = (await request( app.express ).get( '/debug/random/component' )).body;
        const response = await request( app.express )
        .post( `/login/component/${component.type}/${component._id}` )
        .send( {
            password: component.password
        } )
        .expect( 200 );
        expect( response.body.token ).toBeDefined();
        loggedComp = response.body;
    });
});

describe('Authentication middleware (component)', () => {
    it('should return an error when a request without a token is sent', async ( ) => {
        const response = await request( app.express ).get( '/authTest' )
        expect( response.status ).toBe( 401 );
        expect( response.body.error?.code ).toEqual( errorFac( 'auth' ).error.code );
    });
    it('shouldnt return an error when a request with token is sent', async () => {
        const response = await request( app.express )
        .get( `/authTest?token=${loggedComp.token}` );
        expect( response.status ).toBe( 200 );
    });
})

afterAll( () => {
    database.clearDatabaseMonkaW();
} )