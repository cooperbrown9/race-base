import { combineReducers } from 'redux';
import nav from './navigation-reducer.js';
import user from './user-reducer.js';
import friend from './friend-reducer';
import menuStatus from './menu-status-reducer.js';

const MainReducer = combineReducers({
  nav,
  user,
  friend,
  menuStatus
});

export default MainReducer;
