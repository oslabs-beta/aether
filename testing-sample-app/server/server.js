const heapdump = require('heapdump');
const fs = require('fs');
const path = require('path');
const parser = require('heapsnapshot-parser');

function takeSnapShot(input) {
  // snapshot folder must ALREADY EXIST in order to save snapshots there
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
    // res.locals.parsedSnapShot = parsedSnapShot;
    console.log(parsedSnapShot);
    input.input = JSON.stringify(parsedSnapShot);

    // next();
  });
}
const io = require('socket.io-client');

const socket = io.connect('http://localhost:3000/', {
  reconnection: true
});

socket.on('connect', function() {
  const newData = {};
  takeSnapShot(newData);
  console.log('connected to localhost:3000');
  socket.on('clientEvent', function(data) {
    console.log('message from the server:', data);
    socket.emit('serverEvent', `thanks server! for sending ${newData.input}`);
  });
});
