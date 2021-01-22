require( 'dotenv' ).config( )
import JWT from './../src/JWT';
import jwtModule from 'jsonwebtoken'
import { generateFakeUserAsDatabaseReturn } from './helper/user.factory';

describe('Token creation and validation', () => {
    it('should create a token', () => {
        const user = generateFakeUserAsDatabaseReturn();
        const token = JWT.sign( user );
        expect( token ).toBeDefined();
        try {
            if ( !token ) return;
            const decoded = jwtModule.verify( token, process.env.JWT_HASH || '' )
            expect( decoded ).toMatchObject( { _id: user._id } );
        }
        catch (error) { throw error }
    });
    it('should verify a token', async () => {
        const user = generateFakeUserAsDatabaseReturn();
        if ( !process.env.JWT_HASH ) return;
        const token = jwtModule.sign( { _id: user._id }, process.env.JWT_HASH );
        expect( JWT.verify( token ) ).toBe( true );
    });
    it('should not verify the token', async () => {
        const user = generateFakeUserAsDatabaseReturn();
        if ( !process.env.JWT_HASH ) return;
        const token = jwtModule.sign( { _id: user._id }, 'kkkkOlhaOcorno' );
        expect( JWT.verify( token ) ).toBe( false );
    });
});