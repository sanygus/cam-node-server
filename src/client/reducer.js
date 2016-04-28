import * as types from './actionTypes';

const updateStart = (state) => {
  return Object.assign({}, state, {
    lastUpd: 'loading'
  });
}

const updateFinish = (state, data) => {
  return Object.assign({}, state, {
    fileList: data.fileList,
    sensors: data.sensors,
    lastUpd: new Date().toISOString()
  });
}

const saveSettingsStart = (state, settingType, settingValue) => {
  let obj = Object.assign({}, state);
  obj.settings.saving = true;
  obj.settings.enablePhoto = !obj.settings.enablePhoto;
  return obj;
}

const saveSettingsFinish = (state) => {
  let obj = Object.assign({}, state);
  obj.settings.saving = false;
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
      lastUpd: 'not yet',
      settings: {
        blocked: false,
        saving: false,
        enablePhoto: false,
      }
    }
  }

  switch (action.type) {
    case types.UPDATE_START:
      return updateStart(state);
    case types.UPDATE_FINISH:
      return updateFinish(state, action.data);
    case types.SAVESETTINGS_START:
      return saveSettingsStart(state);
    case types.SAVESETTINGS_FINISH:
      return saveSettingsFinish(state);
    default:
      return state;
  }
}
