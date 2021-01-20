import Component, { StoredComponent } from '../components/Component';
import Light from '../components/Light';
import User, { StoredUser } from '../User'
import typeClassMap from './typeClassMap';

interface ActiveElements {
    elements:{ [index: number]: any }
}
class ActiveElements {
    constructor ( ) {
        this.elements = { }
        return this;
    }
    remove ( elementId:number ) {
        delete this.elements[ elementId ];
    }
    get ( elementId:number ) {
        return this.elements[ elementId ];
    }
    clear ( ) {
        this.elements = { };
    }
}

interface ActiveUsers {
    elements: { [index: number]: User }
}
class ActiveUsers extends ActiveElements {
    add ( data:StoredUser ):User {
        const newUser = new User( data );
        this.elements[data.id] = newUser;
        return newUser;
    }
}

type AnyComponent = Component | Light | any;
interface ActiveComponents {
    elements: { [index: number]: AnyComponent }
}
class ActiveComponents extends ActiveElements {
    add ( data:StoredComponent ):AnyComponent {
        const newComponent = new typeClassMap[data.type](data);
        this.elements[ data.id ] = newComponent;
        return newComponent;
    }
}

export const activeComponents = new ActiveComponents( );
export const activeUsers      = new ActiveUsers( );