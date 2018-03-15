import * as types from './types';
import { getRandomJoke } from '../jokes/actionCreators';
import { getRandomEmoji } from '../emojis/actionCreators';

export const setupDraws = () => dispatch => {
//  getDraws from local storage
//  for every draw call jokes/actionCreators getJoke to fetch jokes
//  for every emoji call emojis/actionCreators getEmoji to fetch emojis
//  when all promises resolve, emit draws/SETUP which contains all data to store
//  in reducers for emojis, jokes and draws implement handling for that action
};

export const setNewDraw = () => dispatch => {
  Promise.all([
    getRandomJoke(),
    getRandomEmoji(),
  ]).then((data) => {
    console.log(`data: `, data);
    dispatch({type: 'test', payload: data})
  })

//  fetch random joke
//  select random emoji id and fetch it unless already saved in store
//  emit draws/SET_NEW action containing all fetched data
//  in reducers for emojis, jokes and draws implement handling for that action
//  save new draw to history of draws stored in LS
};
