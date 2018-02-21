import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import registration from './registration/reducer';
import emojis from './emojis/reducer';

const rootReducer = combineReducers({
  registration,
  emojis,
});

export default createStore(rootReducer, composeWithDevTools());
