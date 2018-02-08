import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
//  here be reducers
});

export default createStore(rootReducer, composeWithDevTools());
