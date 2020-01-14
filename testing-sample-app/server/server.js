const heapdump = require('heapdump');
const fs = require('fs');
const path = require('path');
const parser = require('heapsnapshot-parser');
const io = require('socket.io-client');
// REQUIRE THE DEPENDENCY AND CONNEC AT THE SPECIFIED PORT,
// IF THE CONNECTION IS LOST ATTEMPT TO RECONNECT
const socket = io.connect('http://localhost:9000/', {
  reconnection: true,
});

const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/build/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/bundle.js'));
});
app.get('/styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/styles.css'));
});

app.listen(PORT);

/* */

function takeSnapShot(input) {

  const filename = `../snapshot/${Date.now()}.heapsnapshot`;
  heapdump.writeSnapshot(path.resolve(__dirname, filename), (err, filename) => {
    const snapshotFile = fs.readFileSync(filename, { encoding: 'utf-8' });
    const snapshot = parser.parse(snapshotFile);
    // total for total memory size
    let selfSizeTotal = 0;
    // array for bubble chart
    const bubblesArr = [];
    const retainedArr = [];
    const snapshotArray = Object.keys(snapshot.nodes);

    // return selfSizeTotal;
    // snapshot is a big object
    // access each node.self_size
    // we need to grab self-size
    // add all of the self-sizes to a total
    // return the total

    for (let i = 0; i < snapshotArray.length; i += 1) {
    // for (let i = 0; i < 11; i += 1) {
      let totalDependentObjSize = 0;
      const node = snapshot.nodes[i];
      // console.log(node.references);
      // for every node of self size that is greater than 500
      if (node.self_size >= 500) {
      // array of edges
        for (let j = 0; j < node.references.length; j += 1) {
          if (node.references[j].toNode.edge_count === 1) {
          // add the dependent sizes
            // console.log('SELF SIZE OF EDGE IS', node.references[j].toNode.self_size);
            totalDependentObjSize += node.references[j].toNode.self_size;
          }
        }
        // add the size of the node itself to the dependent sizes
        // the current node size plus its retained size --- this is what we want to return
        totalDependentObjSize += node.self_size;
        selfSizeTotal += node.self_size;
        // This is the size of memory that is freed
        // once the object itself is deleted along with its dependent objects that were made unreachable from GC roots.
      }
      
      if (node.self_size >= 500) {
        bubblesArr.push({
          label: node.type,
          value: node.self_size,
          retained_size: totalDependentObjSize,
        });
        retainedArr.push({
          label: node.type,
          value: totalDependentObjSize,
          color: "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);})
        })
      }
    }
    input.input = JSON.stringify({
      total: selfSizeTotal,
      bubbles: bubblesArr,
      retainedSize: retainedArr
    });
    // GIVE THE INPUT OBJECT WE PASSED IN A PROPERTY CALLED INPUT
    // THAT INPUT PROPERTY GETS JSON STRINGIFIED AS THE RESULT OF WHAT PARNSEDSNAPSHOT RETURNS
    fs.unlink(filename, (err) => {
      if (err) throw err;
    });
  });
}


/* Use the WebSocket to establish a connection at the specific port, connecting to Aether. 
The Testing-Sample-App starts listens for an event called 'clientEvent.' The client event then gets triggered from Aether. 
this takes in a callback function and now that it's begun to listen it can respond via the next event. 
The Testing Sample App provides snapshot data via the 'serverEvent.' 
We use the emit function to broadcast new data at the specific event. */

socket.on('connect', () => {
  let newData = {};
  takeSnapShot(newData);
  socket.on('clientEvent', (data) => {
    newData = {};
    takeSnapShot(newData);
    socket.emit('serverEvent', newData.input);
  });
});
