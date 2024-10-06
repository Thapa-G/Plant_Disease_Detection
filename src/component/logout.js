import React from 'react';
import axios from 'axios';
import { getCSRFToken } from '../utils/csrf';  // Assuming you already have CSRF token utility

const LogoutButton = () => {

    const handleLogout = async () => {
        const csrfToken = getCSRFToken();

        try {
            await axios.post(
                'http://localhost:8000/app/logout/',  // Django logout URL
                {},
                {
                    headers: {
                        'X-CSRFToken': csrfToken,
                    },
                    withCredentials: true,  // This ensures session credentials (like cookies) are sent
                }
            );
            console.log('CSRF Token:', csrfToken);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;
