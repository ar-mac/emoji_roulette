import * as drawTypes from '../draws/types';

const initialState = {
  byId: {},
};

function emojisReducer(state = initialState, action) {
  switch (action.type) {
    case drawTypes.SET_NEW: {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.emoji.id]: action.payload.emoji,
        }
      }
    }
    default: {
      return state;
    }
  }
}

export default emojisReducer;
