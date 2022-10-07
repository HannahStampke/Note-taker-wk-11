const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { readFromFile, readAndAppend, writeToFile, } = require("../public/assets/js/fsUtils");

// GET request to get notes from database
notes.get("/", (req, res) => {
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST request to save new notes to database
notes.post("/", (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
        readAndAppend(newNote, "./db/db.json");
        res.json("Your note arrived!");
    } else {
        res.error("Oops! There was an error saving your note.");
    }
});

// DELETE request to remove notes from database
notes.delete("/:id", (req, res) => {
    const noteId = req.params.id;
    readFromFile("./db/db.json")
        .then((data) => JSON.parse(data))
        .then((json) => {
            const results = json.filter((note) => note.id !== noteId);
            writeToFile("./db/db.json", results);
            // Respond to the DELETE request
            res.json(`Note ${noteId} has been deleted`);
        });
});

// // function to make the note array and database connect (hopefully!)
// const writeDatabase = (noteArr, response) => {
//     fs.writeFile("./db/db.json", JSON.stringify(noteArr), (err) => {
//         if (err) {
//             console.error(err);
//         } else {
//             response.json(noteArr);
//             console.log("Success! Bravo.")
//         }
//     });
// };

// Exporting note
module.exports = notes;