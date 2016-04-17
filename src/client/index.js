import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducer';
import { update } from './actionCreators'
import MainPanel from './MainPanel';

const store = createStore(reducer);

const render = () => {
  ReactDOM.render(
    <MainPanel
      values={store.getState()}
      onUpdate={
        () => store.dispatch(update())
      }
    />,
    document.getElementById('main')
  );
}

store.subscribe(render);
render();
