import faker from "faker";
import mongoose from 'mongoose'
import { ComponentType, StoredComponent } from "../../src/types/Component.type";
import { ComponentToInsert } from "../../src/types/Database.type";

export function generateFakeComponentAsDatabaseReturn ( type:ComponentType ):StoredComponent {
    return {
        _id: new mongoose.Types.ObjectId().toHexString(),
        name: faker.name.title(),
        type: type,
        userId: new mongoose.Types.ObjectId().toHexString()
    }
}

export function generateFakeComponentToInsert ( type:ComponentType ):ComponentToInsert {
    return {
        name: faker.name.title(),
        type,
        userId: new mongoose.Types.ObjectId().toHexString(),
        password: faker.internet.password()
    }
}