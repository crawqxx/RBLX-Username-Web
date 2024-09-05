const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/check-username', (req, res) => {
    const { username } = req.query;

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    // Simulate username check
    const exists = Math.random() < 0.5;
    res.json({ exists });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
