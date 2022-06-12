const express = require('express');

const app = express();

// Middleware


// Routes
app.get('/', (req, res) => {
    console.log('The server was accessed.');
});

// TODO: sort the files to ensure consistent order every time

app.listen(3000);