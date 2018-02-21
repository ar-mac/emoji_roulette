import * as types from './types';

const initialState = {
  byId: {},
  selectedEmojiCP: 0x1F600,
  previousEmojisCPs: [0x1F600],
};

function emojisReducer(state = initialState, action) {
  switch (action.type) {
    case types.SETUP: {
      return { ...state, byId: action.payload }
    }
    case types.SET_NEW: {
      return {
        ...state,
        selectedEmojiCP: action.payload,
        previousEmojisCPs: [action.payload, ...state.previousEmojisCPs].slice(0, 9)
      };
    }
    default: {
      return state;
    }
  }
}

export default emojisReducer;
