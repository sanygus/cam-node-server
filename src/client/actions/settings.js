import { UPDATE_SETTINGS, UPDATE_SETTING } from '../ActionTypes';

export const updateSettings = (settings) => {
  return { type: UPDATE_SETTINGS, settings }
}

export const updateSetting = (type, value) => {
  return { type: UPDATE_SETTING, typeSetting: type, valueSetting: value }
}
