import * as types from './types';

export const getRandomJoke = () => dispatch => {
  fetch('https://api.chucknorris.io/jokes/random').then((response) => response.json()).then(({ id, value }) => {
    dispatch({
      type: types.SET_NEW,
      payload: {id, value}
    })
  });
};
