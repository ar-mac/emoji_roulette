import * as types from './types';

const initialState = {
  isRegistered: false,
};

function registrationReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN: {
      return { isRegistered: true }
    }
    case types.LOGOUT: {
      return { isRegistered: false }
    }
    default: {
      return state;
    }
  }
}

export default registrationReducer()
