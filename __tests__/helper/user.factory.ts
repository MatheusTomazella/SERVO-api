import faker from "faker";
import mongoose from 'mongoose'
import { UserToInsert } from "../../src/types/Database.type";
import { StoredUser } from "../../src/types/User.type";

export function generateFakeUserAsDatabaseReturn ( ):StoredUser {
    return {
        _id: new mongoose.Types.ObjectId().toHexString(),
        name: {
            first: faker.name.firstName(),
            last: faker.name.lastName()
        },
        email: faker.internet.email()
    }
}

export function generateFakeUserToInsert ( ):UserToInsert {
    return {
        name: {
            first: faker.name.firstName(),
            last: faker.name.lastName()
        },
        email: faker.internet.email(),
        password: faker.internet.password()
    }
}