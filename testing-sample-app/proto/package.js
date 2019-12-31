const { loadSync } = require('@grpc/proto-loader');
const { loadPackageDefinition } = require( 'grpc' );
 
const PROTO_PATH = __dirname + '/snapshot.proto'

const CONFIG_OBJECT = {
  longs: Number, 
  /* compiles the potentially enormous `double`s for our Benchmark 
  into a Number rather than a String */
}
// synchronously compiles and loads the .proto file into a definition
const definition = loadSync(PROTO_PATH, CONFIG_OBJECT);
// generates a descriptor Object from the loaded API definition
const descriptor = loadPackageDefinition(definition);
// descriptor Object contains a lot of data, all we need is the package
const package = descriptor.snapshot 
 
// export the package we named in the .proto file
module.exports = package;