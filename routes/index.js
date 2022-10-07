// retrieving express and note.js
const express = require('express');
const noteRouter = require('./notes');

// linking app to express and note.js
const app = express();
app.use('/notes', noteRouter)

// exporting app
module.exports = app