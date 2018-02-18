import axios from 'axios';

const BASE = 'https://racebaseapi.herokuapp.com/api';

const CREATE_USER = '/create-user';

const GET_USER = '/get-user/';
const GET_SCHEDULE = '/get-schedule/';

export function getSchedule(scheduleID, callback) {
  axios.get(BASE + GET_SCHEDULE + scheduleID)
    .then(response => callback(null, response.data))
    .catch(e => callback(e))
}

export function getUser(userID, callback) {
  axios.get(BASE + GET_USER + userID)
    .then(response => callback(null, response.data))
    .catch(e => callback(e))
}

export function createUser(data, callback) {
  axios.post(BASE + CREATE_USER, data)
    .then(response => callback(null, response.data))
    .catch(e => callback(e))
}
