import { combineReducers } from 'redux';
import nav from './navigation-reducer.js';
import user from './user-reducer.js';
import menuStatus from './menu-status-reducer.js';

const MainReducer = combineReducers({
  nav,
  user,
  menuStatus
});

export default MainReducer;
