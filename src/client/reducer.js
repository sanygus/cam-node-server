import * as types from './actionTypes';
import fetch from 'isomorphic-fetch'

const updateState = (state) => {
  return {
    fileList: [...state.fileList, '123', '321'],
    sensors: {
      cpuTemp: state.sensors.cpuTemp + 1,
      pingTime: state.sensors.pingTime + 1,
    }
  };
}

export default function reducer (state, action) {
  if (state === undefined) {
    state = {
      fileList: [],
      sensors: {
        cpuTemp: null,
        pingTime: null,
      }
    }
  }

  switch (action.type) {
    case types.UPDATE:
      return updateState(state);
    default:
      return state;
  }
}
