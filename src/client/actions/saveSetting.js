import * as statusActions from './status'
import * as settingsActions from './settings'
import fetch from 'isomorphic-fetch'

export const saveSetting = (type, value) => {
  return (dispatch, getState) => {
    dispatch(statusActions.startUpdate());
    dispatch(settingsActions.updateSetting(type, value));
    fetch('/settings', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        value,
      })
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        dispatch(statusActions.endUpdate());
      });
  }
}
