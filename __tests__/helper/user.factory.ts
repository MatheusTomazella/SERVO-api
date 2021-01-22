import faker from "faker";
import { UserToInsert } from "../../src/types/Database.type";
import { StoredUser } from "../../src/types/User.type";

export function generateFakeUserAsDatabaseReturn ( ):StoredUser {
    return {
        id: faker.random.alphaNumeric(15),
        name: faker.name.findName(),
        email: faker.internet.email()
    }
}

export function generateFakeUserToInsert ( ):UserToInsert {
    return {
        name: {
            first: faker.name.firstName(),
            last: faker.name.lastName(),
        },
        email: faker.internet.email(),
        password: faker.internet.password()
    }
}