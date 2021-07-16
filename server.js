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

