// checkUsername.js
const axios = require('axios');

exports.handler = async function(event, context) {
    const username = event.queryStringParameters.username;

    if (!username) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Username is required' }),
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        };
    }

    try {
        const url = `https://www.roblox.com/users/profile?username=${username}`;
        const response = await axios.get(url);
        
        const profilePageMarker = 'UserProfilePage'; // Adjust this as needed
        const exists = response.data.includes(profilePageMarker);

        return {
            statusCode: 200,
            body: JSON.stringify({ exists }),
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Network error' }),
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        };
    }
};
