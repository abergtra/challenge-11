//call PORT and specify number
const PORT = process.env.PORT || 3001;

//Dependencies from package-lock.json
const fs = require('fs');
const path = require('path');
const express = require('express');

//Dependencies from database folder
const allNotes = require('./db/db.json')

//Set up Express App
const app = express();

//Parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//Parse incoming JSON data
app.use(express.json());
//Serve static files from "public" directory
app.use(express.static('public'));

//Get user input in json format
    app.get('/api/notes', (req, res) => {
        res.json(allNotes.slice(1));
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


//Function for New Notes
    function newNote (notesBody, notesArray) {
        const body = notesBody;
        
    }

//App Listener to connect to port
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}!`);
    })