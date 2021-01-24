import database from './../Database';
import { StoredComponent } from '../types/Component.type';
import { DatabaseIndex } from '../types/Database.type';

interface Component {
    id:DatabaseIndex,
    data:StoredComponent
}
class Component {
    constructor ( data:any ) {
        this.id = data._id;
        this.data = data;
        return this;
    }
    async fetchFromDatabase ( password:string ) {
        return this.data = await database.fetchComponent( { _id: this.id, password } )
        .catch( error => {
            throw error;
        } )
    }

    emitEventToUser ( event:string, payload:any ) {
    
    }
}

export default Component;