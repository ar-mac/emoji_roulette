import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './App';
import './index.css';
import appStore from './store/configureStore';

render(
  <Provider store={appStore}>
    <App />
  </Provider>,
  document.getElementById('root')
)
