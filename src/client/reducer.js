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

export default function reducer (state = defaultState, action) {
  switch (action.type) {
    case 'UPDATE':
      return updateState(state);
    default:
      return state;
  }
}
