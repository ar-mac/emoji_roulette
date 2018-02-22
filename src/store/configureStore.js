import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import registration from './registration/reducer';
import emojis from './emojis/reducer';

const rootReducer = combineReducers({
  registration,
  emojis,
});

export default createStore(rootReducer, 
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);
