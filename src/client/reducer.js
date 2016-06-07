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
    statusCam: data.statusCam,
    loading: false,
    lastUpd: new Date().toISOString().replace('T', ' ').replace('Z', ''),
    settings: Object.assign({}, state.settings, { mode: data.mode }),
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
      sensors: { powers: [] },
      statusCam: { online: false, onlineDate: null },
      loading: false,
      lastUpd: 'not yet',
      online: false,
      lastChange: 'not yet',
      settings: {
        mode: [],
        blocked: true,
        enablePhoto: false,
        qualityPhoto: 70,
        enableVideo: true,
        qualityVideo: 100,
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
