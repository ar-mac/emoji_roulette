import { getEmojiById } from '../emojis/selectors';
import { getJokeById } from '../jokes/selectors';

const buildDraw = (state, drawId) => {
  const selectedDraw = state.draws.byId[drawId] || {};
  return {
    ...selectedDraw,
    emoji: getEmojiById(state, selectedDraw.emojiId),
    joke: getJokeById(state, selectedDraw.jokeId),
  }
};

export const getSelectedDraw = (state) => buildDraw(state, state.draws.selectedDrawId);

export const getPreviousDraws = (state) => state.draws.previousDrawIds.map((drawId) => buildDraw(state, drawId));
