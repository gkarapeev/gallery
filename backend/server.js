const express = require('express');
const fs = require('fs');
const path = require('path');

const cors = require('cors');


const app = express();

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', () => {
    
});
app.get('/images', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const imagesDirectory = path.join(__dirname, 'public', 'img', 'downsized');


    fs.readdir(imagesDirectory, (err, files) => {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        const sorted = files.sort();

        const urlList = sorted.map(filename => 'img/downsized/' + filename);

        return res.json({
            total: files.length,
            results: urlList
        })
    });
});

// TODO: sort the files to ensure consistent order every time

app.listen(3000);
console.log('Server running');