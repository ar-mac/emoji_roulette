import * as types from './types';
import { Emojis } from '../../emojis';

const codepoints = Emojis.map(({ codepoint }) => codepoint);
const minCodepoint = Math.min(...codepoints);
const maxCodepoint = Math.max(...codepoints);

export const setupEmojis = () => {
  const payload = {};
  Emojis.forEach((emoji) => payload[emoji.codepoint] = emoji);

  return {
    type: types.SETUP,
    payload
  }
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
