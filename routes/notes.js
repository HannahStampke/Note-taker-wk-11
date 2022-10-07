const notes = require("express").Router().get("notes");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

var noteArray = [];

// GET request to get notes from database
notes.get("/", (req, res) => {
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
notes.post("/", (req, res) => {
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

// DELETE request to remove notes from database
notes.delete("/:id", (req, res) => {
    const noteID = req.params.id;
    fs.readFile("./db/db.json", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            noteArray = JSON.parse(data);
            noteArray.forEach((note, idx) => {
                if (note.id === noteID) {
                    noteArray.splice(idx, 1);
                }
            });
            writeDatabase(noteArray, res);
        }
    });
});

// function to make the note array and database connect (hopefully!)
const writeDatabase = (noteArr, response) => {
    fs.writeFile("./db/db.json", JSON.stringify(noteArr), (err) => {
        if (err) {
            console.error(err);
        } else {
            response.json(noteArr);
            console.log("Success! Bravo.")
        }
    });
};

// Exporting note
module.exports = notes;