import { combineReducers } from 'redux';
import nav from './navigation-reducer.js';
import user from './user-reducer.js';
import friend from './friend-reducer';
import menuStatus from './menu-status-reducer.js';
import notification from './notification-redux';

const MainReducer = combineReducers({
  nav,
  user,
  friend,
  menuStatus,
  notification
});

export default MainReducer;
