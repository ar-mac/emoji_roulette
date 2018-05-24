export const getRandomJoke = () =>
  fetch('https://api.chucknorris.io/jokes/random').then((response) => response.json());

export const getJokes = (ids) => {
  const requests = ids.map(id => getJoke(id))
  return Promise.all(requests)
};

export const getJoke = id => fetch(`https://api.chucknorris.io/jokes/random`).then(joke => joke.json())