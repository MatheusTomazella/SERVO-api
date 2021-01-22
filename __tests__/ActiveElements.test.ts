require( 'dotenv' ).config( )
import Component from '../src/components/Component';
import Light from '../src/components/Light';
import typeClassMap from '../src/data/typeClassMap';
import { StoredComponent } from '../src/types/Component.type';
import { StoredUser } from '../src/types/User.type';
import User from '../src/User';

import { activeComponents, activeUsers } from './../src/data/ActiveElements';
import { generateFakeComponentAsDatabaseReturn } from './helper/component.factory';
import { generateFakeUserAsDatabaseReturn } from './helper/user.factory';

describe('Active Users', () => {
    let localState:Array<StoredUser> = [];

    beforeAll( done => {
        activeUsers.clear( );
        done();
    } )
    it('should add a user', () => {
        localState.push( generateFakeUserAsDatabaseReturn() )
        activeUsers.add( localState[0] );
        expect( Object.keys( activeUsers.elements ).length ).toBe( 1 );
    });
    it('should return the same user stored', () => {
        expect( activeUsers.get(localState[0]._id) ).toMatchObject( new User( localState[0] ) );
    });
    it('should delete the user and be empty', () => {
        activeUsers.remove( localState[0]._id );
        localState = [ ];
        expect( activeUsers.elements ).toMatchObject( { } );
    });
    it('should be able to add more than one user correctly', () => {
        for ( let i = 0; i < 10; i++ ) {
            localState[i] = generateFakeUserAsDatabaseReturn( );
            activeUsers.add( localState[i] );
        }
        for ( let i = 0; i < 10; i++ ) {
            expect( activeUsers.get( localState[i]._id ) ).toMatchObject( new User( localState[i] ) );
        }
    });
    it('should be able to remove one of the users', () => {
        const number = Math.floor( Math.random() * 10 );
        activeUsers.remove( localState[number]._id );
        localState.splice( number, 1 );
        localState.forEach ( user => {
            expect( activeUsers.get( user._id ) ).toMatchObject( new User( user ) );
        } )
    });
    it('should clear the data', () => {
        activeUsers.clear();
        expect( activeUsers.elements ).toMatchObject( { } );
    });
});

describe('Active Components', () => {
    let localState:Array<StoredComponent> = [];

    beforeAll( done => {
        activeComponents.clear( );
        done();
    } )

    it('should add a component (component)', () => {
        localState.push( generateFakeComponentAsDatabaseReturn( 'component' ) )
        activeComponents.add( localState[0] );
        expect( Object.keys( activeComponents.elements ).length ).toBe( 1 );
    });
    it('should return the same component (component) stored', () => {
        expect( activeComponents.get(localState[0]._id) ).toMatchObject( new Component( localState[0] ) );
    });
    it('should delete the component (component) and be empty', () => {
        activeComponents.remove( localState[0]._id );
        localState = [ ];
        expect( activeComponents.elements ).toMatchObject( { } );
    });
    it('should add a component (light)', () => {
        localState.push( generateFakeComponentAsDatabaseReturn( 'light' ) )
        activeComponents.add( localState[0] );
        expect( Object.keys( activeComponents.elements ).length ).toBe( 1 );
    });
    it('should return the same component (light) stored', () => {
        expect( activeComponents.get(localState[0]._id) ).toMatchObject( new Light( localState[0] ) );
    });
    it('should delete the component (light) and be empty', () => {
        activeComponents.remove( localState[0]._id );
        localState = [ ];
        expect( activeComponents.elements ).toMatchObject( { } );
    });
    it('should be able to add more than one component (both) correctly', () => {
        for ( let i = 0; i < 10; i++ ) {
            localState[i] = generateFakeComponentAsDatabaseReturn( (i%2===0) ? 'light' : 'component' );
            activeComponents.add( localState[i] );
        }
        for ( let i = 0; i < 10; i++ ) {
            expect( activeComponents.get( localState[i]._id ) ).toMatchObject( new ((i%2===0)?Light:Component)( localState[i] ) );
        }
    });
    it('should be able to remove one of the components', () => {
        const number = Math.floor( Math.random() * 10 );
        activeComponents.remove( localState[number]._id );
        localState.splice( number, 1 );
        localState.forEach ( component => {
            expect( activeComponents.get( component._id ) ).toMatchObject( new typeClassMap[component.type]( component ) );
        } )
    });
    it('should clear the data', () => {
        activeComponents.clear();
        expect( activeComponents.elements ).toMatchObject( { } );
    });
});