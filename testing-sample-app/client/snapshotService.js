const { credentials } = require('grpc');
const memwatch = require('@airbnb/node-memwatch');
const { MemorySnapShotsMicroservice } = require('../proto/package.js');

const Stub = new MemorySnapShotsMicroservice(
  'localhost: 9000',
  credentials.createInsecure(),
);


const bidiClientEventEmitter = Stub.TakeSnapShot();
// Let’s initialize some mutable variables

const heapDataFunc = memwatch.on('stats', (heapData) => {
  // console.log('THE HEAP DATA IS', stats);
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
      total_physical_size: heapData.total_physical_size,
      total_available_size: heapData.total_available_size,
      used_heap_size: heapData.used_heap_size,
      heap_size_limit: heapData.heap_size_limit,
      malloced_memory: heapData.malloced_memory,
      peak_malloced_memory: heapData.peak_malloced_memory,
      gc_time: heapData.gc_time,
    },
  );
  // return stats;
});

// trigger the garbage collection
memwatch.gc();
// Client must write the first message to the server
// bidiClientEventEmitter.write({
//   gcScavengeCount: 1,
//   gcScavengeTime: 0,
//   gcMarkSweepCompactCount: 0,
//   gcMarkSweepCompactTime: 0,
//   gcIncrementalMarkingCount: 0,
//   gcIncrementalMarkingTime: 0,
//   gcProcessWeakCallbacksCount: 0,
//   gcProcessWeakCallbacksTime: 0,
//   totalheapsize: 0,
//   total_heap_size_executable: 0,
//   total_physical_size: 0,
//   total_available_size: 0,
//   used_heap_size: 0,
//   heap_size_limit: 0,
//   malloced_memory: 0,
//   peak_malloced_memory: 0,
//   gc_time: 0,
// });

// adds a listener for metadata - metadata is sent only once at the beginning of a channel
//   bidiClientEventEmitter.on( 'metadata', metadata => {
//     // console.log(metadata.getMap())
//   })
// adds a listener for errors
bidiClientEventEmitter.on('error', (err) => console.error(err));