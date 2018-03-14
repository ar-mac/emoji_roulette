export const loadRegistrationStatus = () => {
    try {
        return JSON.parse(localStorage.getItem('isRegistered'));      
    } catch (err) {
        console.error('Can\'t load registration status', err);
    }
}

export const saveRegistrationStatus = (isRegistered) => {
    localStorage.setItem('isRegistered', isRegistered);
}