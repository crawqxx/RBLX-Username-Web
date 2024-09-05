const axios = require('axios');

exports.handler = async function(event, context) {
    const username = event.queryStringParameters.username;

    if (!username) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Username is required' })
        };
    }

    try {
        const url = `https://www.roblox.com/users/profile?username=${username}`;
        const response = await axios.get(url);
        
        // Simple check if profile exists
        const profilePageMarker = 'UserProfilePage';
        const exists = response.data.includes(profilePageMarker);

        return {
            statusCode: 200,
            body: JSON.stringify({ exists })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Network error' })
        };
    }
};
