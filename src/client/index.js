import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducer';
import MainPanel from './MainPanel';

// import {UI} from './ui';
/*
ReactDOM.render(
  <UI />,
  document.getElementById('main')
);
*/

const store = createStore(reducer);

const render = () => {
  ReactDOM.render(
    <MainPanel
      values={store.getState()}
      onUpdate={
        () => store.dispatch({
          type: 'UPDATE'
        })
      }
    />,
    document.getElementById('main')
  );
}

store.subscribe(render);
render();
