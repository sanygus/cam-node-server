import { UPDATE_SENSORS } from '../ActionTypes';

export const updateSensors = (sensors) => {
  return { type: UPDATE_SENSORS, sensors }
}
