import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
// import {UI} from './ui';
/*
ReactDOM.render(
  <UI />,
  document.getElementById('main')
);
*/

const defaultState = {
  fileList: [],
  sensors: {
    cpuTemp: null,
    pingTime: null,
  }
}

const updateState = (state) => {
  return {
    fileList: [...state.fileList, '123', '321'],
    sensors: {
      cpuTemp: state.sensors.cpuTemp + 1,
      pingTime: state.sensors.pingTime + 1,
    }
  };
}

const data = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE':
      return updateState(state);
    default:
      return state;
  }
}

const store = createStore(data);

const MainPanel = ({ values, onUpdate }) => (
  <div>
    <h3>FileList</h3>
    {
      values.fileList.map( (value, key) => {
        return <li key={key}>{value}</li>;
      })
    }
    <h3>Sensors</h3>
    <p>cpu temperature {values.sensors.cpuTemp}</p>
    <p>ping time {values.sensors.pingTime}</p>
    <p><button onClick={onUpdate}>Update</button></p>
  </div>
);

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
