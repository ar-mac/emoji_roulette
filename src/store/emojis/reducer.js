import * as types from './types';

const initialState = {
  byId: {},
  selectedEmojiId: 4,
  previousEmojisIds: [4],
};

function emojisReducer(state = initialState, action) {
  switch (action.type) {
    case types.SETUP: {
      return { ...state, byId: action.payload }
    }
    case types.SET_NEW: {
      return {
        ...state,
        selectedEmojiId: action.payload,
        previousEmojisIds: [action.payload, ...state.previousEmojisIds].slice(0, 9)
      };
    }
    default: {
      return state;
    }
  }
}

export default emojisReducer;
