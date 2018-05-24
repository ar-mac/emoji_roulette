import * as types from './types';
import { getRandomJoke } from '../jokes/actionCreators';
import { getRandomEmoji } from '../emojis/actionCreators';
import { saveToLocalStorage ,loadDataFromLocalStorage } from '../../utils/localStorage';
import drawsReducer from './reducer';


export const setupDraws = () => dispatch => {
  const data = loadDataFromLocalStorage('draws');
  console.log(data);
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
