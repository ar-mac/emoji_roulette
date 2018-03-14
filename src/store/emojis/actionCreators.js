import * as types from './types';

export const setupEmojis = () => dispatch => {
  fetch('http://localhost:3001/emojis').then((response) => response.json()).then(emojis => {
    const payload = {};
    emojis.forEach((emoji) => payload[emoji.id] = emoji);
    dispatch({
      type: types.SETUP,
      payload
    })
  });
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
