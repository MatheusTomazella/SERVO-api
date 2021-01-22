require( 'dotenv' ).config( )
import errorFac, { errorCodes } from './../src/factories/error.factory';

describe('Error Factory', () => {
    it('should return a unknown error', async () => {
        const error1 = errorFac( );
        const error2 = errorFac( 'unknown' );
        const error3 = errorFac( 'unknown', 'corno kkk' );

        expect( error1 ).toMatchObject( { error: { code: errorCodes.unknown.code, info: errorCodes.unknown.defaultInfo } } );
        expect( error2 ).toMatchObject( { error: { code: errorCodes.unknown.code, info: errorCodes.unknown.defaultInfo } } );
        expect( error3 ).toMatchObject( { error: { code: errorCodes.unknown.code, info: "corno kkk" } } )
    });
    it('should return a query error', async () => {
        const error1 = errorFac( 'query' );
        const error2 = errorFac( 'query', 'corno kkk' );

        expect( error1 ).toMatchObject( { error: { code: errorCodes.query.code, info: errorCodes.query.defaultInfo } } );
        expect( error2 ).toMatchObject( { error: { code: errorCodes.query.code, info: "corno kkk" } } )
    });
    it('should return a auth error', async () => {
        const error1 = errorFac( 'auth' );
        const error2 = errorFac( 'auth', 'corno kkk' );

        expect( error1 ).toMatchObject( { error: { code: errorCodes.auth.code, info: errorCodes.auth.defaultInfo } } );
        expect( error2 ).toMatchObject( { error: { code: errorCodes.auth.code, info: "corno kkk" } } )
    });
});