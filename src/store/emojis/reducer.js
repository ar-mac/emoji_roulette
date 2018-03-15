import * as types from './types';

const initialState = {
  byId: {},
  selectedEmojiId: 4,
  previousEmojisIds: [4],
};

function emojisReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_NEW: {
      return {
        ...state,
        selectedEmojiId: action.payload,
        previousEmojisIds: [action.payload, ...state.previousEmojisIds].slice(0, 9)
      };
    }
    case 'draws/SET_NEW': {
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
