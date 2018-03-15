import * as types from './types';

const initialState = {
  byId: {},
};

function drawReducer(state = initialState, action) {
  switch (action.type) {
    case 'draws/SET_NEW': {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.draw.id]: action.payload.draw,
        }
      }
    }
    default: {
      return state;
    }
  }
}

export default drawReducer;
