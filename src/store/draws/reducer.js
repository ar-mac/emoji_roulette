import { cloneDeep, filter } from 'lodash';
import * as types from './types';

const initialState = {
  byId: {},
  selectedDrawId: null,
  previousDrawIds: [null],
};

function drawReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_NEW: {
      const newState = cloneDeep(state);
      const previousDrawsIds = [
        action.payload.draw.id,
        ...state.previousDrawIds,
      ].slice(0, 9);
      newState.byId[action.payload.draw.id] = action.payload.draw;
      // newState.byId = filter(newState.byId, (draw, drawId) => {
      //   console.log(drawId);
      //   return previousDrawsIds.includes(drawId)
      // })
      newState.selectedDrawId = action.payload.draw.id;
      newState.previousDrawIds = previousDrawsIds;
      return newState;
    }
    default: {
      return state;
    }
  }
}

export default drawReducer;
