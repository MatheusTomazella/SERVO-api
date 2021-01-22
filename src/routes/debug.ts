import express from 'express';
import database from './../Database';
import { generateFakeComponentToInsert } from '../../__tests__/helper/component.factory';
import { generateFakeUserToInsert } from '../../__tests__/helper/user.factory';
import { ServoError } from '../factories/error.factory';
import { StoredComponent } from '../types/Component.type';
import { StoredUser } from '../types/User.type';
const router = express.Router();

router.get( '/randomUser', async ( request, response ) => {
    database.insertUser( generateFakeUserToInsert() )
    .then( (element:StoredUser) => {
        response.status(201).json( element );
    } )
    .catch( (error:ServoError) => { response.status(500).json( error ) } );
} )
router.get( '/randomComponent', async ( request, response ) => {
    database.insertComponent( generateFakeComponentToInsert( 'component' ) )
    .then( (element:StoredComponent) => {
        response.status(201).json( element );
    } )
    .catch( (error:ServoError) => { response.status(500).json( error ) } );
} )

export default router;