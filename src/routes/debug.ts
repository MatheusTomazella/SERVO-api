import express from 'express';
import database from './../Database';
import { generateFakeComponentToInsert } from '../../__tests__/helper/component.factory';
import { generateFakeUserToInsert } from '../../__tests__/helper/user.factory';
import { ServoError } from '../factories/error.factory';
import { ComponentType, StoredComponent } from '../types/Component.type';
import { StoredUser } from '../types/User.type';
import typeClassMap from '../data/typeClassMap';
const router = express.Router();

router.get( '/random/user', async ( request, response ) => {
    const generated = generateFakeUserToInsert();
    database.insertUser( generated )
    .then( (element:StoredUser) => {
        element.password = generated.password;
        response.status(201).json( element );
    } )
    .catch( (error:ServoError) => { response.status(500).json( error ) } );
} )
router.get( '/random/component', async ( request, response ) => {
    const typeOptions = Object.keys(typeClassMap);
    const type = typeOptions[Math.floor(Math.random()*typeOptions.length)]
    const generated = generateFakeComponentToInsert( type as ComponentType )
    database.insertComponent( generated )
    .then( (element:StoredComponent) => {
        element.password = generated.password;
        response.status(201).json( element );
    } )
    .catch( (error:ServoError) => { response.status(500).json( error ) } );
} )

router.get( '/clearDatabaseMonkaW', async ( request, response ) => {
    database.clearDatabaseMonkaW();
    response.end()
} )

export default router;