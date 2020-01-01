const { Server, ServerCredentials } = require('grpc');
const { MemorySnapShotsMicroservice } = require('../proto/package.js');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

function SnapshotExecution(bidiServerEventEmitter) {

  bidiServerEventEmitter.on('data', (heapData) => {

    console.log('TESTING AETHER-FRONT END SERVER', heapData);

  });
}

function main() {
  const server = new Server();
  server.addService(
    MemorySnapShotsMicroservice.service,
    { TakeSnapShot: SnapshotExecution },
  );
  server.bind('0.0.0.0: 9000', ServerCredentials.createInsecure());
  server.start();
}

main();
