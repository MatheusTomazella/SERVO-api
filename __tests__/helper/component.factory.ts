import faker from "faker";
import { ComponentType, StoredComponent } from "../../src/types/Component.type";
import { ComponentToInsert } from "../../src/types/Database.type";

export function generateFakeComponentAsDatabaseReturn ( type:ComponentType ):StoredComponent {
    return {
        id: faker.random.alphaNumeric(15),
        name: faker.name.title(),
        type: type,
        userId: faker.random.alphaNumeric(15)
    }
}

export function generateFakeComponentToInsert ( type:ComponentType ):ComponentToInsert {
    return {
        name: faker.name.title(),
        type,
        userId: faker.random.alphaNumeric(15),
        password: faker.internet.password()
    }
}