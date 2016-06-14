import * as statusActions from './status'
import * as settingsActions from './settings'
import fetch from 'isomorphic-fetch'

export const saveSettings = (mode) => {
  return (dispatch, getState) => {
    dispatch(statusActions.startUpdate())
    fetch('/settings', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'mode',
        value: mode,
      })
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        dispatch(settingsActions.updateMode(mode))
        dispatch(statusActions.endUpdate());
      });


  }
}
