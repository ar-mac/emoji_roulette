import * as types from './types';
import { getRandomJoke } from '../jokes/actionCreators';
import { getRandomEmoji } from '../emojis/actionCreators';
import { saveToLocalStorage } from '../../utils/localStorage';
import drawsReducer from './reducer';
export const setupDraws = () => dispatch => {
//  getDraws from local storage
//  for every draw call jokes/actionCreators getJoke to fetch jokes
//  for every emoji call emojis/actionCreators getEmoji to fetch emojis
//  when all promises resolve, emit draws/SETUP which contains all data to store
//  in reducers for emojis, jokes and draws implement handling for that action
};

export const setNewDraw = () => (dispatch, getState) => {
  Promise.all([
    getRandomJoke(),
    getRandomEmoji(),
  ]).then(([joke, emoji]) => {
    const draw = {
      id: Date.now(),
      jokeId: joke.id,
      emojiId: emoji.id,
    };

    // not the best possible solution, but with redux-thunk
    // we do not have possibility to react after state changes
    const action = { type: types.SET_NEW, payload: { draw, joke, emoji } };
    const newDrawsState = drawsReducer(getState().draws, action);
    saveToLocalStorage('draws', newDrawsState);

    dispatch(action)
  });
};
