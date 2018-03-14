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
    default: {
      return state;
    }
  }
}

export default jokesReducer;
