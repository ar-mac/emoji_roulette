export const loadRegistrationStatus = () => {
    try {
        return JSON.parse(localStorage.getItem('isRegistered'));      
    } catch (err) {
        console.error('Can\'t load registration status', err);
    }
};

export const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
