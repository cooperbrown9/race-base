import axios from 'axios';

const BASE = 'https://racebaseapi.herokuapp.com/api/';
const GET_SCHEDULE = '/get-schedule/';

export function getSchedule(scheduleID, callback) {
  axios.get(BASE + GET_SCHEDULE + scheduleID)
    .then(response => callback(null, response.data))
    .catch(e => callback(e))
}
