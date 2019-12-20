const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000;

app.use(express.static('/assets/'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
})

app.get('/build/bundle.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/bundle.js'))
})
app.get('/stylesheet.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../stylesheet.css'))
})