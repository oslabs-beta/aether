const path = require('path')
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static(path.resolve(__dirname, '../client')))

app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../index.html'))
})

app.get('/client/styles.css', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../client/styles.css'))
})

app.listen(PORT, console.log(`Listening servewr on ${PORT}`))