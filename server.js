const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use(express.static('public')); // Serve static files from the 'public' directory

app.get('/check-username', async (req, res) => {
    const username = req.query.username;
    if (!username) {
        return res.status(400).send('Username query parameter is required');
    }

    const url = `https://www.roblox.com/users/profile?username=${username}`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            res.status(200).send('taken');
        } else {
            res.status(200).send('available');
        }
    } catch (error) {
        console.error('Error fetching username:', error);
        res.status(500).send('error');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
