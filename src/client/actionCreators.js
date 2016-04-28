import * as types from './actionTypes';
import fetch from 'isomorphic-fetch';

export function update() {
  return function(dispatch) {
    dispatch({
      type: types.UPDATE_START
    })
    fetch('/data')
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('not valid response');
        }
        return response.json()
      })
      .then((data) => {
        dispatch({
          type: types.UPDATE_FINISH,
          data
        })
      });
  }
}

export function save() {
  return function(dispatch) {
    dispatch({
      type: types.SAVESETTINGS_START
    });
    fetch('/settings', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        param: 'value'
      })
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('not valid response');
        }
        return response.json()
      })
      .then((data) => {
        console.log(data);
        dispatch({
          type: types.SAVESETTINGS_FINISH,
        })
      });
  }
}
