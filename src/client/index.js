import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import MainPanel from './MainPanel';

ReactDOM.render(
  <Provider store={
    createStore(
      reducer,
      applyMiddleware(thunk)
    )
  }>
    <MainPanel />
  </Provider>,
  document.getElementById('main')
);
