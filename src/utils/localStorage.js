export const loadRegistrationStatus = () => {
    try {
        return localStorage.getItem('isRegistered');      
    } catch (err) {
        console.error('Can\'t load registration status', err);
    }
}

export const saveRegistrationStatus = (isRegistered) => {
    localStorage.setItem('isRegistered', isRegistered);
}

