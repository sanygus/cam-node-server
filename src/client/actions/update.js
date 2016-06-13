import * as statusActions from './status'
import * as sensorsActions from './sensors'
import * as filesActions from './files'
import fetch from 'isomorphic-fetch'

export const update = () => {
  return (dispatch, getState) => {
    dispatch(statusActions.startUpdate())
    fetch('/data')
      .then(response => response.json())
      .then(data => {
        dispatch(statusActions.endUpdate());
        //console.log(data);
        dispatch(statusActions.updateCamStatus(data.statusCam));
        dispatch(sensorsActions.updateSensors(data.sensors))
        dispatch(filesActions.updateFiles(data.fileList));
        setTimeout(() => {
          dispatch(update());
        }, 2000);
      })
  }
}
