import { UPDATE_FILES, DELETE_FILE } from '../ActionTypes';

export const updateFiles = (files) => {
  return { type: UPDATE_FILES, files }
}

export const deleteFile = (name) => {
  return { type: DELETE_FILE, name }
}
