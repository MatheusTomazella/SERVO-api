import { DatabaseIndex } from "./types/Database.type";
import { StoredUser, UserName } from "./types/User.type";
import database from './Database'

interface User {
    data: {
        _id:DatabaseIndex,
        name?:UserName,
        email:string,
    }
}
class User {
    constructor ( data:StoredUser ) {
        this.data = data;
        return this;
    }
    async fetchFromDatabase ( password:string ) {
        return this.data = await database.fetchUser( { email: this.data.email, password: password } )
        .catch( error => {
            return error;
        } )
    }
}

export default User;