import { StoredComponent } from '../types/Component.type';
import { StateUpdate } from '../types/Light.type';
import Component from './Component'

interface Light {
    state: {
        [index:string]: any,
        isOn: boolean
    }
}
class Light extends Component implements Light {
    constructor ( data:StoredComponent ) {
        super( data );
        this.state = { isOn: false };
        this.getState( );
    }
    getState ( ) {
        return this.state;
    }
    setState ( update:StateUpdate ) {
        const keys = Object.keys( update );
        keys.forEach( ( key:string ) => {
            this.state[ key ] = update[ key ];
        } )
        return this.getState();
    }
}

export default Light;