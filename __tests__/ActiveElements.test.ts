import faker from 'faker'
import Component, { ComponentType, StoredComponent } from '../src/components/Component';
import Light from '../src/components/Light';
import typeClassMap from '../src/data/typeClassMap';
import User, { StoredUser } from '../src/User';

import { activeComponents, activeUsers } from './../src/data/ActiveElements';

describe('Active Users', () => {
    let localState:Array<StoredUser> = [];

    beforeAll( done => {
        activeUsers.clear( );
        done();
    } )
    it('should add a user', () => {
        localState.push( generateFakeUser() )
        activeUsers.add( localState[0] );
        expect( Object.keys( activeUsers.elements ).length ).toBe( 1 );
    });
    it('should return the same user stored', () => {
        expect( activeUsers.get(localState[0].id) ).toMatchObject( new User( localState[0] ) );
    });
    it('should delete the user and be empty', () => {
        activeUsers.remove( localState[0].id );
        localState = [ ];
        expect( activeUsers.elements ).toMatchObject( { } );
    });
    it('should be able to add more than one user correctly', () => {
        for ( let i = 0; i < 10; i++ ) {
            localState[i] = generateFakeUser( );
            activeUsers.add( localState[i] );
        }
        for ( let i = 0; i < 10; i++ ) {
            expect( activeUsers.get( localState[i].id ) ).toMatchObject( new User( localState[i] ) );
        }
    });
    it('should be able to remove one of the users', () => {
        const number = Math.floor( Math.random() * 10 );
        activeUsers.remove( localState[number].id );
        localState.splice( number, 1 );
        localState.forEach ( user => {
            expect( activeUsers.get( user.id ) ).toMatchObject( new User( user ) );
        } )
    });
    it('should clear the data', () => {
        activeUsers.clear();
        expect( activeUsers.elements ).toMatchObject( { } );
    });
});

function generateFakeUser ( ):StoredUser {
    return {
        id: faker.random.number(),
        name: faker.name.findName(),
        email: faker.internet.email()
    }
}

describe('Active Components', () => {
    let localState:Array<StoredComponent> = [];

    beforeAll( done => {
        activeComponents.clear( );
        done();
    } )

    it('should add a component (component)', () => {
        localState.push( generateFakeComponent( 'component' ) )
        activeComponents.add( localState[0] );
        expect( Object.keys( activeComponents.elements ).length ).toBe( 1 );
    });
    it('should return the same component (component) stored', () => {
        expect( activeComponents.get(localState[0].id) ).toMatchObject( new Component( localState[0] ) );
    });
    it('should delete the component (component) and be empty', () => {
        activeComponents.remove( localState[0].id );
        localState = [ ];
        expect( activeComponents.elements ).toMatchObject( { } );
    });
    it('should add a component (light)', () => {
        localState.push( generateFakeComponent( 'light' ) )
        activeComponents.add( localState[0] );
        expect( Object.keys( activeComponents.elements ).length ).toBe( 1 );
    });
    it('should return the same component (light) stored', () => {
        expect( activeComponents.get(localState[0].id) ).toMatchObject( new Light( localState[0] ) );
    });
    it('should delete the component (light) and be empty', () => {
        activeComponents.remove( localState[0].id );
        localState = [ ];
        expect( activeComponents.elements ).toMatchObject( { } );
    });
    it('should be able to add more than one component (both) correctly', () => {
        for ( let i = 0; i < 10; i++ ) {
            localState[i] = generateFakeComponent( (i%2===0) ? 'light' : 'component' );
            activeComponents.add( localState[i] );
        }
        for ( let i = 0; i < 10; i++ ) {
            expect( activeComponents.get( localState[i].id ) ).toMatchObject( new ((i%2===0)?Light:Component)( localState[i] ) );
        }
    });
    it('should be able to remove one of the components', () => {
        const number = Math.floor( Math.random() * 10 );
        activeComponents.remove( localState[number].id );
        localState.splice( number, 1 );
        localState.forEach ( component => {
            expect( activeComponents.get( component.id ) ).toMatchObject( new typeClassMap[component.type]( component ) );
        } )
    });
    it('should clear the data', () => {
        activeComponents.clear();
        expect( activeComponents.elements ).toMatchObject( { } );
    });
});

function generateFakeComponent ( type:ComponentType ):StoredComponent {
    return {
        id: faker.random.number(),
        type: type,
        userId: faker.random.number()
    }
}