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
  /* THE ORIGINAL FUCNTION'S MIDDLEWARE AHS BEEN REFACTORED TO NOW TAKE IN AN INPUT THAT IS AN OBJECT
  IF WE PASS IN INPUT AS AN OBJECT AND GIVE IT A PROPERTY 
  WE PASS IT BY REFERENCE AND HENCE IT EXISTS OUTSIDE OF THE FUNCTION
  OTHERWISE IT WOULD NOT PERSIST AND BE UNDEFINED
  */

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

// ESTABLISHES AND CONNECT ON YOUR SOCKET CONNECTION
// JUST BEFORE THE CONNECTION IS ESTABLISHED HERE, IO.ON HAS BEEN TRIGGERED ON AETHER'S SERVER -- 33
socket.on('connect', function() {
  /*
  WE CREATED AN EMPTY CONTAINER OBJECT THAT WILL HOLD OUR PARSEDSNAPSHOT DATA.
  IF WE SIMPLY USED A VARIABLE -- THEN THE VARIABLE WOULD NOT EXIST OUTSIDE THE FUNCTION'S EXECUTION CONTEXT
  BY USING AN OBJECT, IT LIVES IN THE HEAP AND PERSISTS THE DATA ON BY ASSIGNING A PROPERTY ONTO THAT OBJECT
  */

  const newData = {};
  takeSnapShot(newData);
  console.log('connected to localhost:3000');
  //NEED TO KNOW WHAT PARTICULAR EVENT TO LISTEN TO 

  //TESTING SAMPLE GETS THE EVENT LISTENER CLIENTEVENT TRIGGERED FROM AETHER-FRONTEND
  // AND THIS EVENT LISTENER HAS A CALLBACK FUNCTION
  socket.on('clientEvent', function(data) {
    console.log('message from the server:', data);
    // AN EVENT IS EMITTED TO ALL CONNECTED CLIENTS -- CLIENTS CAN IDENTIFY THE EVENT BY THE INPUT STRING

    // ONCE WE'VE FOUND THE PARTICULAR EVENT WE WANTED TO CONNECT WE BROADCAST THAT EVENBT TO ANYONE ELSE 
    // USING OUR SOCKET CONNECTION AND LISTENING TO THE SAME EVENT
    socket.emit('serverEvent', newData.input);
  });
});
