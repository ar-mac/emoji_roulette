import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import registration from './registration/reducer';
import emojis from './emojis/reducer';
import { loadRegistrationStatus } from '../utils/localStorage';

const rootReducer = combineReducers({
  registration,
  emojis,
});

const initialState = {
  registration: {
    isRegistered: loadRegistrationStatus(),
  }
}

export default createStore(rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);
