export const getCSRFToken = () => {
    const csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken'))
        ?.split('=')[1];

        console.log('CSRF Token:', csrfToken);
    return csrfToken;
};
