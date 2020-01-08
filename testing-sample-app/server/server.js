const heapdump = require('heapdump');
const fs = require('fs');
const path = require('path');
const parser = require('heapsnapshot-parser');
const io = require('socket.io-client');
// REQUIRE THE DEPENDENCY AND CONNEC AT THE SPECIFIED PORT, 
// IF THE CONNECTION IS LOST ATTEMPT TO RECONNECT
const socket = io.connect('http://localhost:3000/', {
  reconnection: true
});

function takeSnapShot(input) {
  const filename = `../snapshot/${Date.now()}.heapsnapshot`;
  console.log('Filename: ', filename);
  heapdump.writeSnapshot(path.resolve(__dirname, filename), function(
    err,
    filename
  ) {
    const snapshotFile = fs.readFileSync(filename, { encoding: 'utf-8' });
    const snapshot = parser.parse(snapshotFile);
    const parsedSnapShot = [];

    for (let i = 0; i < 5; i++) {
      const node = snapshot.nodes[i];
      parsedSnapShot.push({
        Type: node.type,
        Name: node.name,
        ID: node.id,
        self_size: node.self_size,
        edge_count: node.edge_count
      });
    }
    console.log(parsedSnapShot);
    // GIVE THE INPUT OBJECT WE PASSED IN A PROPERTY CALLED INPUT
    // THAT INPUT PROPERTY GETS JSON STRINGIFIED AS THE RESULT OF WHAT PARNSEDSNAPSHOT SPITS OUT
    input.input = JSON.stringify(parsedSnapShot);

  });
}

//ESTABLISHES A CONNECTION 
socket.on('connect', function() {
  //CREATE EMPTY CONTAINER OBJECT
  const newData = {};
  takeSnapShot(newData);
  console.log('connected to localhost:3000');
  socket.on('clientEvent', function(data) {
    console.log('message from the server:', data);
    // Emits an event to all connected clients. The following two are equivalent:
    // Emits an event to the socket identified by the string name. Any other parameters can be included. All serializable datastructures are supported, including Buffer.
    socket.emit('serverEvent', `thanks server! for sending ${newData.input}`);
  });
});
