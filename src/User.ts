import { StoredUser, UserLoginInfo } from "./types/User.type";
import database from './Database'

interface User {
    email:string,
    data:StoredUser
}
class User {
    constructor ( data:any ) {
        this.email = data.email;
        this.data = data;
        return this;
    }
    async fetchFromDatabase ( password:string ):Promise<StoredUser> {
        return this.data = await database.fetchUser( { email: this.email, password: password } )
        .catch( error => {
            throw error;
        } )
    }
}

export default User;