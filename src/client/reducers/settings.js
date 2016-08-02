import { UPDATE_SETTINGS, UPDATE_SETTING } from '../ActionTypes';

const initState = {
  mode: [],
  RTV: false
}

export default function settings(state = initState, action) {
  switch (action.type) {
    case UPDATE_SETTINGS:
      return {
        mode: action.settings.mode,
        RTV: action.settings.RTV
      }
    case UPDATE_SETTING:
      return Object.assign({}, state, {
        [action.typeSetting]: action.valueSetting
      })
    default: return state;
  }

}
