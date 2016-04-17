import * as types from './actionTypes';

const updateStart = (state) => {
  return {
    fileList: state.fileList,
    sensors: state.sensors,
    lastUpd: 'loading',
  };
}

const updateFinish = (state, data) => {
  return {
    fileList: data.fileList,
    sensors: data.sensors,
    lastUpd: new Date().toISOString(),
  };
}

export default function reducer (state, action) {
  if (state === undefined) {
    state = {
      fileList: [],
      sensors: {
        cpuTemp: null,
        pingTime: null,
      },
      lastUpd: 'not yet',
    }
  }

  switch (action.type) {
    case types.UPDATE_START:
      return updateStart(state);
    case types.UPDATE_FINISH:
      return updateFinish(state, action.data);
    default:
      return state;
  }
}
