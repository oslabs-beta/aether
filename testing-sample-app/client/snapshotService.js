const { credentials } = require( 'grpc' );
const { MemorySnapShotsMicroservice } = require( '../proto/package.js' );
const memwatch = require('@airbnb/node-memwatch');

const Stub = new MemorySnapShotsMicroservice(
    // binds it to the Server address
    'localhost: 9000',
    // defines the security level
    credentials.createInsecure(),
);

// RPC invocations
/* the Stub has every RPC method, each of which, when invoked, returns an EventEmitter 
with the ability to write messages to the server at the bound address - in this case, 
‘localhost: 3000’ - and listen for returned messages from that server. Also in this case, 
it is a bidirectional EventEmitter, able to both listen and write continuously. */
const bidiClientEventEmitter = Stub.TakeSnapShot();
// Let’s initialize some mutable variables

const heapData = memwatch.on('stats', function(stats) {
    console.log("THE HEAP DATA IS", stats)
    return stats;
})
//trigger the garbage collection
memwatch.gc()
  // Client must write the first message to the server
  bidiClientEventEmitter.write(heapData)
  // adds a listener for metadata - metadata is sent only once at the beginning of a channel
//   bidiClientEventEmitter.on( 'metadata', metadata => {
//     // highly accurate Node.process nanosecond timer converted to an integer with Number()
//     // start = Number(process.hrtime.bigint());
//     // returns the special metadata object as an Object
//     // console.log(metadata.getMap())
//   })
  // adds a listener for errors
  bidiClientEventEmitter.on( 'error', (err) => console.error(err))
  /* adds listener for message data, the benchmark message received is passed to the callback, 
  and the callback is run on every message received */
  bidiClientEventEmitter.on( 'data', heapData => {
    // writes a message to Server
    bidiClientEventEmitter.write(
      // properties match the message fields for benchmark
      {
            gcScavengeCount: heapData.gcScavengeCount,
             gcScavengeTime: heapData.gcScavengeTime,
             gcMarkSweepCompactCount: heapData.gcMarkSweepCompactCount,
             gcMarkSweepCompactTime: heapData.gcMarkSweepCompactTime, 
             gcIncrementalMarkingCount: heapData.gcIncrementalMarkingCount,
             gcIncrementalMarkingTime: heapData.gcIncrementalMarkingTime,
             gcProcessWeakCallbacksCount: heapData.gcProcessWeakCallbacksCount,
             gcProcessWeakCallbacksTime: heapData.gcProcessWeakCallbacksTime,
             total_heap_size: heapData.total_heap_size,
             total_heap_size_executable: heapData.total_heap_size_executable,
             total_physical_size : heapData.total_physical_size,
             total_available_size : heapData.total_available_size,
             used_heap_size : heapData.used_heap_size,
             heap_size_limit : heapData.heap_size_limit,
             malloced_memory : heapData.malloced_memory,
             peak_malloced_memory : heapData.peak_malloced_memory,
             gc_time : heapData.gc_time
      }
    )
  });


