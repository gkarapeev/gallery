const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');



const app = express();

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Read files
const imagesDirectory = path.join(__dirname, 'public', 'img', 'downsized');
let urlList;

fs.readdir(imagesDirectory, (err, files) => {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    const sorted = files.sort(); // Ensure images always arrive in the same order

    urlList = sorted.map(filename => 'img/downsized/' + filename);
});

// Routes
app.get('/images', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    return res.json({
        total: files.length,
        results: urlList
    })
});

app.get('/image/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    return res.json(urlList[req.params.id]);
});

app.get('/image-count', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    return res.json(urlList.length);
});

app.listen(3000);
console.log('Server running');