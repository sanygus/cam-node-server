import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import status from './reducers/status';
import sensors from './reducers/sensors';
import settings from './reducers/settings';
import files from './reducers/files';
import App from './App'

render(
  <Provider store={
    createStore(
      combineReducers({
        status,
        sensors,
        settings,
        files
      }),
      applyMiddleware(thunk)
    )
  }>
    <App />
  </Provider>,
  document.getElementById('main')
)
