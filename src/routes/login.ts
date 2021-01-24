import express, { Response } from 'express'
import { activeComponents, activeUsers } from '../data/ActiveElements';
import typeClassMap from '../data/typeClassMap';
import JWT from '../JWT';
import User from '../User';
import generateError, { ErrorType, ServoError } from './../factories/error.factory';
import errorFac from './../factories/error.factory'
const loginRoutes = express.Router();

loginRoutes.post( '/', async ( request, response ) => {
    if ( !request.body.email || request.body.email.trim() === '' ) { 
        response.status( 401 ).json( errorFac( 'auth', 'Email missing' ) );
        return;
    }
    if ( !request.body.password || request.body.password.trim() === '' ) { 
        response.status( 401 ).json( errorFac( 'auth', 'Password missing' ) );
        return;
    }
    const user = new User( { email: request.body.email } );
    const userData = await user.fetchFromDatabase( request.body.password )
        .catch( error => {
            response.status(500).json( error );
            return;
        } )
    if ( !userData || !userData._id ) {
        response.status(500).json( generateError( 'auth', "User and password combination don't match any user" ) );
        return;
    }
    activeUsers.add( user );
    response.status(200).json( { token: JWT.sign( { _id: user.data._id || '' } ), ...userData } );
} )

loginRoutes.post( '/component/:type?/:id?', async ( request, response ) => {
    const id = request.params.id || request.body.id;
    const type = request.params.type || request.body.type;
    const password = request.body.password;
    
    if ( ifUndefinedRespondError( id, {status:401,type:'auth',message:'Missing component Id.'}, response ) )return;
    if ( ifUndefinedRespondError( type, {status:401,type:'auth',message:'Missing component Type.'}, response ) )return;
    if ( ifUndefinedRespondError( password, {status:401,type:'auth',message:'Missing Password.'}, response ) )return;

    const componentClass = typeClassMap[type];

    if ( ifUndefinedRespondError( componentClass, {status:406,type:'auth',message:'Invalid component type.'}, response ) )return;

    const component = new componentClass( { _id: id } );
    const componentData = await component.fetchFromDatabase( password )
        .catch( ( error:ServoError ) => {
            respondError( {status:500,message:error}, response );
            return;
        } )
    if ( ifTrueRespondError( !componentData || !componentData.name, 
    {status:401,type:'auth',message:'Id-Password pair invalid.'}, response ) )return;

    activeComponents.add( component );
    response.status(200).json( { token: JWT.sign( { _id: componentData._id, type:component.data.type } ), ...componentData } );
} )

export default loginRoutes;


function respondError ( error:{status:number,type?:ErrorType,message:any}, response:Response ) {
    if ( error.type ) error.message = generateError( error.type, error.message );
    response.status(error.status).json( error.message );
}
function ifUndefinedRespondError ( value:any, error:{status:number,type:ErrorType,message:any}, response:Response ) {
    if ( !value ) {
        respondError( error, response );
        return true;
    }
    return false;
}
function ifTrueRespondError ( value:any, error:{status:number,type:ErrorType,message:any}, response:Response ) {
    if ( value ) {
        respondError( error, response );
        return true;
    }
    return false;
}