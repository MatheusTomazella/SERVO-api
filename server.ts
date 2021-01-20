import app from './src/App'
const server = require('http').Server( app.express );

import realTime from './src/RealTime';

server.listen( process.env.PORT || 3305, ( error:any ) => {
    if ( error ) throw error;
    console.log( 'API Running',  );
} )

realTime.startServer( server );