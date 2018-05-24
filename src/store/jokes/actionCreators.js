export const getRandomJoke = () =>
  fetch('https://api.chucknorris.io/jokes/random').then((response) => response.json());

export const getJoke = () => {
//  implement action creator for fetching specific joke by ID
//  it's needed for `setupDraws` action creator
};
