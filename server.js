//call PORT and specify number
const PORT = process.env.PORT || 3003;

//Dependencies from package-lock.json
const fs = require('fs');
const path = require('path');
const express = require('express');

//Set up Express App
const app = express();

//Dependencies from database folder
const allNotes = require('./db/db.json');



//Parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//Parse incoming JSON data
app.use(express.json());
//Serve static files from "public" directory
app.use(express.static('public'));

//Get user input in json format
    app.get('/api/notes', (req, res) => {
        res.json(allNotes);
    });

//Create routes
    //GET the index.html file
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, './public/index.html'));
    });
    //GET the notes.html file
    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, './public/notes.html'));
    });
    //route handler for all GET requests
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './public/index.html'));
    });


//Function to make New Notes
    function createNewNote (body, notesArray) {
        const newNote = body;
        if (!Array.isArray(notesArray))
            notesArray = [];
        if (notesArray.length === 0)
            body.id = 1;
        else   
        body.id = notesArray[notesArray.length - 1].id + 1;
        
        
        notesArray.push(newNote);
        console.log(notesArray);
        fs.writeFileSync(
            path.join(__dirname, './db/db.json'),
            JSON.stringify(notesArray)
        );
        return newNote;
    }

//Post funtion for new notes
    app.post('/api/notes', (req, res) => {
        const newNote = createNewNote(req.body, allNotes);
        res.json(newNote);
    });

    function deleteNote(id, notesArray) {
        for (let i = 0; i < notesArray.length; i++) {
            let note = notesArray[i];
    
            if (note.id == id) {
                notesArray.splice(i, 1);
                fs.writeFileSync(
                    path.join(__dirname, './db/db.json'),
                    JSON.stringify(notesArray, null, 2)
                );
    
                break;
            }
        }
    }
    
    app.delete('/api/notes/:id', (req, res) => {
        deleteNote(req.params.id, allNotes);
        res.json(true);
    });

//App Listener to connect to port
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}!`);
    });