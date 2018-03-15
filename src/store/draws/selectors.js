import { getEmojiById } from '../emojis/selectors';
import { getJokeById } from '../jokes/selectors';

export const getSelectedDraw = (state) => {
  const selectedDraw = state.draws.byId[state.draws.selectedDrawId] || {};
  return {
    ...selectedDraw,
    emoji: getEmojiById(state, selectedDraw.emojiId),
    joke: getJokeById(state, selectedDraw.jokeId),
  }
};
