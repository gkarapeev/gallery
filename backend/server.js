const express = require('express');

const app = express();

// Middleware


// Routes
app.get('/', (req, res) => {
    console.log('The server was accessed.')
});

app.listen(3000);