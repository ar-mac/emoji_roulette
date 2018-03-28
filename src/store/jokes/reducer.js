import * as types from './types';
import * as drawTypes from '../draws/types';

const initialState = {
  byId: {}
};

function jokesReducer(state = initialState, action) {
  switch (action.type) {
    case drawTypes.SET_NEW: {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.joke.id]: action.payload.joke,
        }
      }
    }
    default: {
      return state;
    }
  }
}

export default jokesReducer;
