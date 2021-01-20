import errorFac from './../src/factories/error.factory';

describe('Error Factory', () => {
    it('Should return a valid authentication error message', async () => {
        const error = errorFac( 'auth' );
        expect( error ).toMatchObject( { error: { code: 'AUTH_ERROR', info: "The authentication information couldn't be validated." } } );
    });
    it('should return a unknown error', async () => {
        const error1 = errorFac( );
        const error2 = errorFac( 'unknown' );

        expect( error1 ).toMatchObject( { error: { code: 'UNKNOWN_ERROR', info: "There was a unknown error. Sorry :(" } } );
        expect( error2 ).toMatchObject( { error: { code: 'UNKNOWN_ERROR', info: "There was a unknown error. Sorry :(" } } );
    });
});