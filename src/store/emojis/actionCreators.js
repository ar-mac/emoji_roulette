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

export const setNewEmoji = () => ({
  type: types.SET_NEW,
});
