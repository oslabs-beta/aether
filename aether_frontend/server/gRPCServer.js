const { Server, ServerCredentials } = require( 'grpc' );
const { MemorySnapShotsMicroservice } = require( '../proto/package.js' );

// RPC executions, is passed an RPC-specific EventEmitter automatically
function SnapshotExecution(bidiServerEventEmitter) {
    /* adds listener for message data, the benchmark message received is passed to the callback, 
    and the callback is run on every message received from Client */
    bidiServerEventEmitter.on('data', heapData => {
      // writes a message back to Client
      bidiServerEventEmitter.write(
        console.log("TESTING AETHER-FRONT END SERVER")
      );
    })
  }
  // creates a new instance of the Server Object
  const server = new Server();
  // adds a service as defined in the .proto, takes two Objects as arguments
  server.addService( 
    // the service Object is the package.ServiceName.service 
    MemorySnapShotsMicroservice.service,
    /* the rpc method and it's attached function for execution - effectively this Object 
    is how we handle server routing, each property is like an endpoint */
    { TakeSnapShot: SnapshotExecution }
  );
  // binds the server to a socket with a security level
  server.bind('0.0.0.0: 9000', ServerCredentials.createInsecure())
  // starts the server listening on the designated socket(s)
  server.start();
