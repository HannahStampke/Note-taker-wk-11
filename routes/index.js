// retrieving express and note.js
const express = require('express');
const app = express();
const notes = require('./notes');

app.use('/notes', notes);

// exporting app
module.exports = app