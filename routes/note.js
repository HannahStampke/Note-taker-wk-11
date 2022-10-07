const note = require("express").Router().get("note");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

var noteArray = [];

// GET request to get notes from database
notesArray.get("/", (req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            if (data.length > 0) {
                noteArray = JSON.parse(data);
            }
            res.json(noteArray);
        }
    });
});