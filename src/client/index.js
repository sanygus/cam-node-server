import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import MainPanel from './MainPanel';

ReactDOM.render(
  <Provider store={createStore(reducer)}>
    <MainPanel />
  </Provider>,
  document.getElementById('main')
);
