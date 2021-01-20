import mongoose, { Mongoose } from 'mongoose';

type MongoConnectionInfo = {
    uri:string,
    options?:mongoose.ConnectOptions
}
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
}
class Database {
    constructor ( connInfo:MongoConnectionInfo ) {
        this.mongoose = mongoose;
        mongoose.connect( connInfo.uri )
        this.connection = mongoose.connection;

        this.connection.on( 'error', console.error.bind( console, 'Connection Error: ' ) );
        // this.connection.once( 'open', ( ) => { console.log( 'connected' ); } )

        return this;
    }
}

export default new Database( mongoConnInfo );