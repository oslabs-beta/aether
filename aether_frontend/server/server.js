const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000;
const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(port);

let heapData;

/* THE AETHER FRONT-END SERVER IS BOTH AN EXPRESS AND WBESOCKET SERVER
THE FIRST THING ONE MUST TO DO IS ESTABLISH THE SOCKET CONNECTION
ONCE YOU'VE TRIGGERED THE ON METHOD -- YOU'VE BEGIN LISTENING FOR A NEW CONNECTION

THE ON KEYWORD JUST DOES THAT -- LISTENS FOR A SPECIFIC EVENT
ON REQUIRES 2 ARGUMENTS: A STRING CONTAINING THE TITLE OF THE EVENT EMITTED,
ANMD A FUNCTION WITH WHICH THE DATA IS PASSED THROUGH.

IN THE CASE OF OUR CONNECTION LISTENER, 
WE USE SOCKET TO DEFINE THE DATA IN THE SECOND ARGUMENT.

  WHAT IS THE SOCKET? -- THE INDIVIDUAL CLIENT WHO IS CONNECTED
  WEBSOCKETS USE EVENT EMITTERS -- THE RECEIVING END IS LOOKING FOR A STRING
  IF BOTH/HOWEVER MANY PARTIES HAVE ACCESS TO THE SAME EVENT LISTENER 
  THEY CAN LISTEN FOR AND BROADCAST MESSAGES 

*/



// AETHER'S WEBSOCKET SERVER ASSERTS THAT IT HAS A WEBSOCKET CONNECTION 
// ANYONE ELSE THAT ALSO HAS A WEBSOCKET CONNECTION CAN NOW JOIN ON THAT SPECIFIC PORT
io.on('connection', function(socket) {
  // console.log('connected:', socket.client.id);
  //REMEMBER THERE COULD BE MULTIPLE SOCKETS
  // WE'RE LISTENING FOR A RESPONSE FROM TESTING SAMPLE APP
  // AETHER BEGINS LISTENS FOR A ONE PARTICULAR EVENT CALLED SERVEREVENT
  // IF DATA GETS EMITTED AT SERVEREVENT WE REASSIGN HEAP DATA CONTINOUSLY
  socket.on('serverEvent', function(data) {
    // console.log('new message from client:', data);
    heapData = data;
  });
  // SETINTERVAL CONTAINS TRIGGERS THE CLIENT-EVENT
  // THIS IS THE FIRST REAL EVENT THAT IS HAPPENING, OTHERWISE
  // IT'S JUST AN OPEN CONNECTION THAT DOES NOTHING
  setInterval(function() { //TRIGGERS THE CLIENT- EVENT,

    // EMIT IS BROADCASTING SAYING I HAVE A CLIENTEVENT!
    // TESTING SAMPLE APP IS SAYING HEY! I AM CLIENT EVENT AND I HAVE SOMETHING TO SAY
    socket.emit('clientEvent', 'update snapshot request');
    // console.log('message sent to the clients');
  }, 3000);
});


app.use(express.static('/assets/'));

app.get('/getdata', (req, res) => {
  console.log("AT /GETDATA ENDPOINT", heapData);
  res.status(200).send(heapData);
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/build/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/bundle.js'));
});
app.get('/stylesheet.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../stylesheet.css'));
});
