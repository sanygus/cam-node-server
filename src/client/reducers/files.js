import { UPDATE_FILES, DELETE_FILE } from '../ActionTypes.js'

export default function files(state = [], action) {
  switch (action.type) {
    case UPDATE_FILES:
      return action.files
    case DELETE_FILE:
      return state.filter(file => file.name !== action.name)
    default: return state
  }

}
