const heapdump = require('heapdump');
const fs = require('fs');
const path = require('path');
const parser = require('heapsnapshot-parser');
const io = require('socket.io-client');
const socket = io.connect('http://localhost:9000/', {
  reconnection: true,
});

/* Use the WebSocket to establish a connection at the specific port, connecting to Aether. 
The Testing-Sample-App starts listens for an event called 'clientEvent.' The client event then gets triggered from Aether. 
this takes in a callback function and now that it's begun to listen it can respond via the next event. 
The Testing Sample App provides snapshot data via the 'serverEvent.' 
We use the emit function to broadcast new data at the specific event. */

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
        
        for (let i = 0; i < snapshotArray.length; i += 1) {
                let totalDependentObjSize = 0;
                const node = snapshot.nodes[i];
                if (node.self_size >= 500) {
                    // array of edges
                    for (let j = 0; j < node.references.length; j += 1) {
                        if (node.references[j].toNode.edge_count === 1) {
                            // add the dependent sizes
                            totalDependentObjSize += node.references[j].toNode.self_size;
                        }
                    }
                    // the current node size plus its retained size --- this is what we want to return
                    // This is the size of memory that is freed
                    // once the object itself is deleted along with its dependent objects that were made unreachable from GC roots.
                    totalDependentObjSize += node.self_size;
                    selfSizeTotal += node.self_size;
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
           /*The function takes in a parameter, which is an object called input. We are using an object, 
           because we can pass it by reference. If we didn't do this, then the object wouldn't exist outside of the functions lexical scope. */
            input.input = JSON.stringify({
                total: selfSizeTotal,
                bubbles: bubblesArr,
                retainedSize: retainedArr
            });
            //deletes the local snapshot files
            fs.unlink(filename, (err) => {
                if (err) throw err;
            });
        });
    }
    
    
    function start() {
        
        socket.on('connect', () => {
          let newData = {};
          takeSnapShot(newData);
          socket.on('clientEvent', (data) => {
            newData = {};
            takeSnapShot(newData);
            socket.emit('serverEvent', newData.input);
          });
        });
    }    


    module.exports = {
        takeSnapShot,
        start
    }