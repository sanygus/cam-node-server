import { UPDATE_MODE } from '../ActionTypes';

const initState = {
  mode: [],
}

export default function settings(state = initState, action) {
  switch (action.type) {
    case UPDATE_MODE:
      return {
        mode: action.mode
      }
    default: return state;
  }

}
