import * as types from './types';

const initialState = {
  byId: {}
};

function jokesReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_NEW: {
      return {
        ...state
      };
    }
    case 'draws/SET_NEW': {
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
