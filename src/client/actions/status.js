import { START_UPDATE, END_UPDATE, UPDATE_CAM_STATUS } from '../ActionTypes.js'

export const startUpdate = () => {
  return { type: START_UPDATE }
}

export const endUpdate = () => {
  return { type: END_UPDATE }
}

export const updateCamStatus = (statusCam) => {
  return {
    type: UPDATE_CAM_STATUS,
    online: statusCam.online,
    onlineDate: statusCam.onlineDate,
    RTVstatus: statusCam.RTVstatus,
  }
}
