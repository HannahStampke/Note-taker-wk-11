const express = require('express');
const path = require('path');
const app = express();
const apiIndex = require('./routes/index.js');
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', apiIndex);
app.use(express.static('public'));

// GET request for note
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

// GET request for the html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, console.log(`Server listening on port ${PORT}`));