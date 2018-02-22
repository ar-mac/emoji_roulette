import * as types from './types';
import { Emojis } from '../../emojis';

const codepoints = Emojis.map(({ codepoint }) => codepoint);
const minCodepoint = Math.min(...codepoints);
const maxCodepoint = Math.max(...codepoints);

export const setupEmojis = () => dispatch => {
  fetch('http://localhost:3001/emojis').then((sth) => sth.json()).then(emojis => {
    const payload = {};
    emojis.forEach((emoji) => payload[emoji.codepoint] = emoji);
    dispatch({
      type: types.SETUP,
      payload
    })
  });
};

export const setNewEmoji = () => {
  const randomCodepoint = Math.floor(Math.random() * (maxCodepoint - minCodepoint) + minCodepoint);
  return {
    type: types.SET_NEW,
    payload: randomCodepoint
  }
};

export const setFirstEmoji = () => ({
  type: types.SET_NEW,
  payload: Emojis[0].codepoint
});
