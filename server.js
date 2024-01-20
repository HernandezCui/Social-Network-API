const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001; 

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Database connection 
const dbUri = process.env.MONGODB_URI || "mongodb://localhost/social-network-api";
mongoose.connect(dbUri, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
mongoose.set('debug', true);

// Routes
app.use(require('./routes'));

// Server Start
app.listen(PORT, () => console.log(`🌍 Server is running on localhost:${PORT}`));