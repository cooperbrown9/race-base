import { combineReducers } from 'redux';
import { nav } from './navigation-reducer.js';
import { user } from './user-reducer.js';

const MainReducer = combineReducers({
  nav,
  user
});

export default MainReducer;
