export const loadDataFromLocalStorage = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key));      
    } catch (err) {
        console.error('Can\'t load data', err);
    }
};

export const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
