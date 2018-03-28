export const getRandomJoke = () =>
  fetch('https://api.chucknorris.io/jokes/random').then((response) => response.json());
