export type StoredUser = { 
    id:number,
    name:string,
    email:string,
}
interface User {
    data:StoredUser
}
class User {
    constructor ( data:StoredUser ) {
        this.data = data;
        return this;
    }
}

export default User;