import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import registration from './registration/reducer';

const rootReducer = combineReducers({
  registration,
});

export default createStore(rootReducer, composeWithDevTools());
