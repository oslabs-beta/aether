const express = require('express');

const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const port = 3000;
// const memwatch = require('@airbnb/node-memwatch')


app.use(express.static('/assets/'));

// app.get('/getdata', (req, res) => {
//     // console.log('Getting stats');
//     let statsToSend = [];
//     memwatch.on('stats', function(stats) {
//         statsToSend.push(stats);
//         // console.log('Inside', statsToSend)})
//     memwatch.gc()
//     // ! This console log is printing before the 'Inside' console logs
//     // ! Need to break these out into controllers to deal with possible async problems?
//     // console.log("Locals", statsToSend);
//     res.status(200).send(statsToSend)
//     })
// })

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/build/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/bundle.js'));
});
app.get('/stylesheet.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../stylesheet.css'));
});


app.listen(port, () => console.log('Listening on port:', port));
