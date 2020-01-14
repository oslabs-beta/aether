const express = require('express');
const app = express();
const path = require('path');
const port = 9000;
const server = require('http').Server(app);
server.listen(port);
const io = require('socket.io')(server);
let socketConnection;

// Initiating a global variable to be stored and passed into front-end
let heapData;

/* Aether established a WebSocket connection and anyone else that has a sockt can join at the specific port.
It's an open channell of communication where you can listen and emit based on the two specified events.
We then held a reference to the specific socket connection via the variable socketConnection. 
Aether starts listening for an event called "serverEvent." If there is data emitted from the "serverEvent", 
we take that data and assign it to heapData. We then begin to see our first real event happening, 'clientEvent', 
this is the event used to transmit the heap snapshots from our client. The Testing Sample App responds on clientEvent with
the heap data. */

io.on('connection', (socket) => {
  socketConnection = socket;
  socket.on('serverEvent', (data) => {
    heapData = data;
  });
    socket.emit('clientEvent', 'update snapshot request');
});

app.use(express.static('/assets/'));

app.get('/getdata', (req, res) => {
  if (socketConnection) {
    socketConnection.emit('clientEvent')
  }
  res.status(200).send(heapData);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/build/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/bundle.js'));
});
app.get('/stylesheet.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../stylesheet.css'));
});

app.get('/assets/AetherLogo01.png', (req, res) => {
  res.sendFile(path.join(__dirname, '../assets/AetherLogo01.png'));
});