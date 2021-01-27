import mongoose, { FilterQuery, Mongoose } from 'mongoose';
import { StoredComponent } from './types/Component.type';
import { ComponentQuery, ComponentToInsert, MongoConnectionInfo, ServoDatabaseTable, UserQuery, UserToInsert } from './types/Database.type';
import { StoredUser } from './types/User.type';
import UserModel from './mongo/UserModel'
import ComponentModel from './mongo/ComponentModel';
import generateError, { ServoError } from './factories/error.factory';

const mongoConnInfo:MongoConnectionInfo = {
    uri: process.env.MONGO_URI || '',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
}

interface Database {
    mongoose:Mongoose,
    connection:mongoose.Connection
    connectionInfo:MongoConnectionInfo
    models: {
        User:mongoose.Model<any>,
        Component:mongoose.Model<any>
    }
}
class Database {
    constructor ( connInfo:MongoConnectionInfo ) {
        this.connectionInfo = connInfo;
        this.mongoose = mongoose;

        this.models = {
            User: UserModel,
            Component: ComponentModel
        }
        
        mongoose.connect( connInfo.uri, connInfo.options )
        this.connection = mongoose.connection;
        this.connection.on( 'error', console.error.bind( console, 'Connection Error: ' ) );
        this.connection.once( 'open', ( ) => { 
            // console.log( 'connected' );
        } )
        return this;
    }

    fetch ( table:ServoDatabaseTable, query:FilterQuery<any>|undefined = {} ):Promise<any> {
        return new Promise ( ( resolve, reject ) => {
            this.models[table].find( query ).lean().exec( ( error, result ) => {
                if ( error ) reject( generateError( 'query', error ) );
                result.forEach( element => { 
                    element.password = undefined; 
                    if ( element.userId?.toHexString ) element.userId = element.userId.toHexString(); 
                } );
                resolve( ( query._id || query.email ) ? result[0] : result )
            } )
        } )
    }
    fetchUser ( query?:UserQuery ):Promise<any> {
        return this.fetch( 'User', query );
    }
    fetchComponent ( query?:ComponentQuery ):Promise<any> {
        return this.fetch( 'Component', query );
    }

    insert ( table:ServoDatabaseTable, element:ComponentToInsert | UserToInsert ):Promise<any> {
        return new Promise ( ( resolve, reject ) => {
            this.models[table].create( element )
            .then( instance => {
                resolve( this.fetch( table, { _id: instance._id } )
                .catch( error => {
                    reject( generateError( 'query', error ) );
                } ) );
            } )
            .catch( ( error ) => {
                if ( error ) reject( generateError( 'query', error ) );
            } )
        } )
    }
    insertUser ( user:UserToInsert ):Promise<StoredUser> {
        return this.insert( 'User', user as UserToInsert );
    }
    insertComponent ( component:ComponentToInsert ):Promise<StoredComponent> {
        return this.insert( 'Component', component as ComponentToInsert );
    }

    
    clearDatabaseMonkaW ( ) {
        //if ( process.env.NODE_ENV?.trim() !== 'TEST' ) return 'Ta loco meu, wtf'
        Object.values(this.models).forEach( model => {
            model.deleteMany( {} ).exec( ).then( result => {
                return true;
            } )
            .catch( (error) => {
                throw error
            } )
        } )
    }
}

export default new Database( mongoConnInfo );