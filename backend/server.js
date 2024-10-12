// server.js or your main backend file
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let users = []; // For demonstration purposes, use a database in a real application

// Register endpoint
app.post('/api/register', (req, res) => {
    const { username, email } = req.body;

    // Generate a unique ID for each user
    const id = users.length + 1;
    const newUser = { id, username, email };

    // Store the new user
    users.push(newUser);

    res.status(201).json(newUser); // Send back the registered user data
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
