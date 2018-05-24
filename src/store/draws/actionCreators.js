import * as types from './types';
import { getRandomJoke, getJokes } from '../jokes/actionCreators';
import { getRandomEmoji, getEmojis } from '../emojis/actionCreators';
import { saveToLocalStorage, loadDataFromLocalStorage } from '../../utils/localStorage';
import drawsReducer from './reducer';
import { filter } from 'lodash';


export const setupDraws = () => dispatch => {
  const data = loadDataFromLocalStorage('draws');
  //  getDraws from local storage
  //  for every draw call jokes/actionCreators getJoke to fetch jokes
  //  for emojis call emojis/actionCreators getEmojis to fetch all emojis at once
  //  when all promises resolve, emit draws/SETUP which contains all data to store
  //  in reducers for emojis, jokes and draws implement handling for that action
  if(data) {
    const emojiIds = Object.values(data.byId).map(({ emojiId }) => emojiId);
    const jokeIds = Object.values(data.byId).map(({ jokeId }) => jokeId);
    
    Promise.all([
      getEmojis(emojiIds),
      getJokes(jokeIds)
    ]).then(([ emojisResponses, jokesResponses ]) => console.log(emojisResponses, jokesResponses))
  }
}

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
    newDrawsState.byId = filter(newDrawsState.byId, draw => newDrawsState.previousDrawIds.includes(draw.id))
    saveToLocalStorage('draws', newDrawsState);
    dispatch(action)
  });
};
