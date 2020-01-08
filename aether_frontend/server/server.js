const path = require('path');
const bodyParser = require('body-parser');
//ESTABLISH THE PORT NUMBER DYNAMICALLY TO COMMUNICATE AT 3000 
const port = 3000;
//Add Socket.IO as a dependency and require/instantiate it in your server 
//defined as 'io' with the port  as an argument. 
const io = require('socket.io').listen(port);

/* The first thing needing to be handled is listening for a new connection from the client. 
  The on keyword does just that- listen for a specific event. 
  It requires 2 arguments: a string containing the title of the event thats emitted, and a function with which the data is passed though. 
  In the case of our connection listener, we use socket to define the data in the second argument. 
  A socket is an individual client who is connected.
  For listening for connections on our server
*/

io.on('connection', socket => {
  console.log('connected:', socket.client.id);
  socket.on('serverEvent', function(data) {
    console.log('new message from client:', data);
  });
  //
  setInterval(function() {
    //EMIT THE MESSAGE BEING SENT TO THE SERVER 
    //Emits an event to the socket identified by the string name. Any other parameters can be included. All serializable datastructures are supported, including Buffer.
    socket.emit('clientEvent', Math.random());
    console.log('message sent to the clients');
  }, 3000);
});

