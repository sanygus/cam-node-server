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
