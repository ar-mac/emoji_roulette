import * as types from './types';

const initialState = {
  byId: {},
  selectedDrawId: null,
  previousDrawIds: [null],
};

function drawReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_NEW: {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.draw.id]: action.payload.draw,
        },
        selectedDrawId: action.payload.draw.id,
        previousDrawIds: [action.payload.draw.id, ...state.previousDrawIds].slice(0, 9)
      };
    }
    default: {
      return state;
    }
  }
}

export default drawReducer;
