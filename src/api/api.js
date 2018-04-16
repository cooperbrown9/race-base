import axios from 'axios';

const BASE = 'https://racebaseapi.herokuapp.com/api';

const SCHEDULE_ID = '5a8a2a876379700014073825';

const CREATE_USER = '/create-user';

const GET_USER = '/get-user/';
const GET_USER_TRACKING = '/get-user-tracking';
const GET_USER_LOCATION = '/get-user-location/';
const GET_SCHEDULE = '/get-schedule/';

const UPDATE_USER = '/update-user';
const UPDATE_LOCATION = '/update-location';

const SEARCH = '/search/';
const SEARCH_BIB ='/search-bib/';
const SEARCH_NAME = '/search-name/';

const FOLLOW_USER = '/follow-user';
const UNFOLLOW_USER = '/unfollow-user';

const CHRONOTRACK_URL = 'https://api.chronotrack.com/api/results/37865/bib/4?format=json&client_id=727dae7f&user_id=matt%40ransdellbrown.com&user_pass=cf5d3438ea8d630cb91e3d89fc8e9021cbd00b5f';

function ConstructChronoUrl(bib){
  return 'https://api.chronotrack.com/api/results/37865/bib/' + bib + '?format=json&client_id=727dae7f&user_id=matt%40ransdellbrown.com&user_pass=cf5d3438ea8d630cb91e3d89fc8e9021cbd00b5f';
}

export function getBibInfo(bib, callback) {
  var url = ConstructChronoUrl(bib);
  axios.get(url)
    .then((response) => {
      debugger;
      callback(null, response)
    })
    .catch(e => callback(e))
}

export function getSchedule(scheduleID, callback) {
  axios.get(BASE + GET_SCHEDULE + SCHEDULE_ID)
    .then(response => callback(null, response.data.events))
    .catch(e => callback(e))
}

export function getUser(userID, callback) {
  axios.get(BASE + GET_USER + userID)
    .then(response => callback(null, response.data))
    .catch(e => callback(e))
}

export function getUserTracking(data, callback) {
  axios.post(BASE + GET_USER_TRACKING, data)
    .then(response => callback(null, response.data))
    .catch(e => callback(e))
}

export function getUserLocation(userID, callback) {
  axios.get(BASE + GET_USER_LOCATION + userID)
    .then(response => callback(null, response.data))
    .catch(e => callback(e))
}

export function createUser(data, callback) {
  axios.post(BASE + CREATE_USER, data)
    .then(response => callback(null, response.data))
    .catch(e => callback(e))
}

export function updateUser(data, callback) {
  axios.post(BASE + UPDATE_USER, data)
    .then(response => callback(null, response.data))
    .catch(e => callback(e))
}

export function updateLocation(data, callback) {
  axios.post(BASE + UPDATE_LOCATION, data)
    .then(response => callback(null, response.data))
    .catch(e => callback(e))
}

export function searchUsers(bib, callback) {
  axios.get(BASE + SEARCH + bib)
    .then(response => callback(null, response.data))
    .catch(e => callback(e))
}

export function searchBib(bib, callback) {
  axios.get(BASE + SEARCH_BIB + bib)
    .then(response => callback(null, response.data))
    .catch(e => callback(e))
}

export function searchName(text, callback) {
  axios.get(BASE + SEARCH_NAME + text)
    .then(response => callback(null, response.data))
    .catch(e => callback(e))
}

export function searchResultsByName(name, callback) {
  
}

export function followUser(data, callback) {
  axios.post(BASE + FOLLOW_USER, data)
    .then(response => callback(null, response.data))
    .catch(e => callback(e))
}

// unfollowID, userID
export function unfollowUser(data, callback) {
  axios.post(BASE + UNFOLLOW_USER, data)
    .then(response => callback(null, response.data))
    .catch(e => callback(e))
}
