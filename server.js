const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001; 

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

