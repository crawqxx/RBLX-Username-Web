const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Enable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Route to check Roblox username
app.get('/check-username', async (req, res) => {
    const { username } = req.query;

    try {
        const response = await axios.get(`https://www.roblox.com/users/profile?username=${username}`);

        if (response.status === 200) {
            res.json({ taken: true });
        } else {
            res.json({ taken: false });
        }
    } catch (error) {
        console.error('Error fetching from Roblox:', error);
        res.status(500).json({ error: 'Failed to check username' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
