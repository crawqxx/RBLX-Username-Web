const express = require('express');
const axios = require('axios'); // Ensure axios is installed
const app = express();
const PORT = process.env.PORT || 3000; // Use environment variable for PORT

app.use(express.static('public'));

app.get('/check-username', async (req, res) => {
    const { username } = req.query;

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    try {
        // Make request to Roblox profile URL
        const url = `https://www.roblox.com/users/profile?username=${username}`;
        const response = await axios.get(url);

        // Check response to determine if username is taken
        if (response.status === 200 && response.data.includes('UserProfilePage')) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        console.error('Failed to fetch username data:', error);
        res.status(500).json({ error: 'Network error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
