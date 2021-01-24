import Component from '../components/Component';
import Light from '../components/Light';
import { StoredComponent } from '../types/Component.type';
import { DatabaseIndex } from '../types/Database.type';
import { StoredUser } from '../types/User.type';
import User from '../User'
import typeClassMap from './typeClassMap';

interface ActiveElements {
    elements:{ [index: string]: any }
}
class ActiveElements {
    constructor ( ) {
        this.elements = { }
        return this;
    }
    remove ( elementId:DatabaseIndex ) {
        delete this.elements[ elementId ];
    }
    get ( elementId:DatabaseIndex ) {
        return this.elements[ elementId ];
    }
    clear ( ) {
        this.elements = { };
    }
}

interface ActiveUsers {
    elements: { [index: string]: User }
}
class ActiveUsers extends ActiveElements {
    add ( data:StoredUser | User ):User {
        if ( data instanceof User ) return this.elements[data.data._id] = data;
        const newUser = new User( data );
        this.elements[data._id] = newUser;
        return newUser;
    }
}

type AnyComponent = Component | Light | any;
interface ActiveComponents {
    elements: { [index: string]: AnyComponent }
}
class ActiveComponents extends ActiveElements {
    add ( data:StoredComponent | AnyComponent ):AnyComponent {
        if ( data instanceof Component ) return this.elements[data.data._id] = data;
        const newComponent = new typeClassMap[data.type](data);
        this.elements[ data._id ] = newComponent;
        return newComponent;
    }
}

export const activeComponents = new ActiveComponents( );
export const activeUsers      = new ActiveUsers( );