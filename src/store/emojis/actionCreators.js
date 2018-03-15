import * as types from './types';

export const setupEmojis = () => dispatch => {
  fetch('http://localhost:3001/emojis').then((response) => response.json()).then(emojis => {
    dispatch({
      type: types.SETUP,
      payload: emojis
    })
  });
};

export const getRandomEmoji = () => {
  const randomId = Math.floor(Math.random() * 90);
  return fetch(`http://localhost:3001/emojis/${randomId}`).then((response) => response.json())
};

export const setNewEmoji = () => {
  const randomId = Math.floor(Math.random() * 90);
  return {
    type: types.SET_NEW,
    payload: randomId
  }
};

export const setFirstEmoji = () => ({
  type: types.SET_NEW,
  payload: 4
});
