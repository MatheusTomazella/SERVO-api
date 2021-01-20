import realTime from './../RealTime'

export type ComponentType = 'light' | 'component';
export type StoredComponent = {
    id:number,
    type:ComponentType,
    userId:number
}
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