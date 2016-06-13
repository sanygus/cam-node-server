import { START_UPDATE, END_UPDATE, UPDATE_CAM_STATUS } from '../ActionTypes.js'

const initState = {
  loading: false,
  statusCam: { online: false, onlineDate: null }
}

export default function status(state = initState, action) {
  switch (action.type) {
    case START_UPDATE:
      return Object.assign({}, state, {
        loading: true
      });
    case END_UPDATE:
      return Object.assign({}, state, {
        loading: false
      });
    case UPDATE_CAM_STATUS:
      return Object.assign({}, state, {
        statusCam: { online: action.online, onlineDate: action.onlineDate }
      });
    default: return state
  }

}
