import axios from 'axios';

// Function to fetch CSRF token from Django
export const getCsrfToken = async () => {
    try {
        const response = await axios.get('http://localhost:8000/app/cssrf/', {
            withCredentials: true, // This ensures that cookies (including CSRF token) are sent in the request
        });
        console.log(response)
        return response.data;

    } catch (error) {
        console.error('Error fetching CSRF token:', error);
        return null;
    }
};

