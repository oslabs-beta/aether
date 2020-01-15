const path = require('path');
const aether = require('aether_memory');
const express = require('express');

const app = express();
const PORT = 3000;

aether.start();


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
