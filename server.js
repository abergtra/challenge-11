//call PORT and specify number
const PORT = process.env.PORT || 3001;

//Dependencies from package-lock.json
const fs = require('fs');
const path = require('path');
const express = require('express');

const allNotes = require('./db/db.json')

//Set up Express App
