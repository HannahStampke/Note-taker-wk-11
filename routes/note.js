const note = require("express").Router().get("note");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

var noteArray = [];

// GET request to get notes from database
noteArray.get("/", (req, res) => {
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

// POST request to save new notes to database
note.post("/", (req, res) => {
    const {title, text} = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
        noteArray.push(newNote);
        writeDatabase(noteArray, res);
    } else {
        res.error("Oops! There was an error saving your note.");
    }
});
