require( 'dotenv' ).config( { path: './.env.test' } )
import { ServoError } from '../src/factories/error.factory';
import { StoredComponent } from '../src/types/Component.type';
import { StoredUser } from '../src/types/User.type';
import database from './../src/Database';
import { generateFakeComponentToInsert } from './helper/component.factory';
import { generateFakeUserToInsert } from './helper/user.factory';

const insertedUsers:StoredUser[] = [ ];
const insertedComponents:StoredComponent[] = [ ];

beforeAll( done => {
    database.clearDatabaseMonkaW( done );
} )

describe('Database connection', () => {
    it('should be connected to local database', () => {
        database.connection.once( 'open', ( ) => {
            expect( database.connectionInfo.uri ).toBe( 'mongodb+srv://node:node@servo.i4zwa.mongodb.net/SERVO-tests?retryWrites=true&w=majority' );
        } )
    });
});

describe('Document creation', () => {
    it('should be able to create a user', () => {
        const userToInsert = generateFakeUserToInsert();
        database.insertUser( userToInsert )
        .then( ( user:StoredUser ) => {
            expect( user ).toMatchObject( userToInsert );
        } )
        .catch( ( error:ServoError ) => {
            throw error;
        } )
    });
    it('should be able to create a component (component)', () => {
        const componentToInsert = generateFakeComponentToInsert( 'component' );
        database.insertComponent( componentToInsert )
        .then( ( component:StoredComponent ) => {
            expect( component ).toMatchObject( componentToInsert );
        } )
        .catch( ( error:ServoError ) => {
            throw error;
        } )
    });
    it('should be able to create a component (light)', () => {
        const componentToInsert = generateFakeComponentToInsert( 'light' );
        database.insertComponent( componentToInsert )
        .then( ( component:StoredComponent ) => {
            expect( component ).toMatchObject( componentToInsert );
        } )
        .catch( ( error:ServoError ) => {
            throw error;
        } )
    });
});

describe('Document fetching', () => {
    it('should be able to fetch an user', async () => {
        const result = await database.fetchUser(  )
        .catch( error => {
            throw error;
        } )
        expect( result ).toMatchObject( insertedUsers );
    });
    it('should be able to fetch components', async () => {
        const result = await database.fetchComponent(  )
        .catch( error => {
            throw error;
        } )
        expect( result ).toMatchObject( insertedComponents );
    });
});


afterAll( done => {
    database.clearDatabaseMonkaW();
    database.connection.close();
    done();
} )