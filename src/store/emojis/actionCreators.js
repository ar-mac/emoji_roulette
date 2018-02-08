import * as types from './types';
import { Emojis } from '../../emojis';

export const setupEmojis = () => {
  const payload = {};
  Emojis.forEach((emoji) => payload[emoji.codepoint] = emoji);

  return {
    type: types.SETUP,
    payload
  }
};

export const setNewEmoji = () => {
  const index = Math.floor(Math.random() * 100);
  const randomEmoji = Emojis[index] || {};
  return {
    type: types.SET_NEW,
    payload: randomEmoji.codepoint
  }
};

export const setFirstEmoji = () => ({
  type: types.SET_NEW,
  payload: Emojis[0].codepoint
});
