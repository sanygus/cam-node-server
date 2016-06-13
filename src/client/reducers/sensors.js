import { UPDATE_SENSORS } from '../ActionTypes.js'

const initState = {
  date: null,
  cputemp: null,
  voltage: null,
  capacity: null,
  amperage: null,
  power: null,
  ost: null,
  powers: [],
}

export default function sensors(state = initState, action) {
  switch (action.type) {
    case UPDATE_SENSORS:
      return {
        date: action.sensors.date,
        cputemp: action.sensors.cputemp,
        voltage: action.sensors.voltage,
        capacity: action.sensors.capacity,
        amperage: action.sensors.amperage,
        power: action.sensors.power,
        ost: action.sensors.ost,
        powers: action.sensors.powers,
      }
    default: return state
  }

}
