import * as types from './actionTypes';

const updateStart = (state) => {
  return Object.assign({}, state, {
    loading: true,
    lastUpd: 'loading'
  });
}

const updateFinish = (state, data) => {
  return Object.assign({}, state, {
    fileList: data.fileList,
    sensors: data.sensors,
    loading: false,
    lastUpd: new Date().toISOString()
  });
}

const saveSettingsStart = (state, settingType, settingValue) => {
  let obj = Object.assign({}, state, {
    loading: true
  });
  obj.settings[settingType] = settingValue;
  return obj;
}

const saveSettingsFinish = (state) => {
  let obj = Object.assign({}, state, {
    loading: false
  });
  return obj;
}

export default function reducer (state, action) {
  if (state === undefined) {
    state = {
      fileList: [],
      sensors: {
        cpuTemp: null,
        pingTime: null,
      },
      loading: false,
      lastUpd: 'not yet',
      settings: {
        blocked: false,
        enablePhoto: false,
        enableVideo: true,
      }
    }
  }

  switch (action.type) {
    case types.UPDATE_START:
      return updateStart(state);
    case types.UPDATE_FINISH:
      return updateFinish(state, action.data);
    case types.SAVESETTINGS_START:
      return saveSettingsStart(state, action.typeSetting, action.valueSetting);
    case types.SAVESETTINGS_FINISH:
      return saveSettingsFinish(state);
    default:
      return state;
  }
}
