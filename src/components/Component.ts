import { StoredComponent } from '../types/Component.type';
import realTime from './../RealTime'

interface Component {
    data:StoredComponent
}
class Component {
    constructor ( data:StoredComponent ) {
        this.data = data;
        return this;
    }

    emitEventToUser ( event:string, payload:any ) {
    
    }
}

export default Component;