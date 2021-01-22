import { StoredUser } from "./types/User.type";

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