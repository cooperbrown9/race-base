
import * as UserActions from '../action-types/user-action-types';

const initialUserState = { user: null, isLoggedIn: false, userID: null }

export default function user(state = initialUserState, action) {
  switch (action.type) {

    case UserActions.SET_USER:
      return {
        user: action.user,
        userID: action.user._id,
        isLoggedIn: true
      }

    case 'GET_USER':
      return { id: '', name: 'dude'};
      break;
    default:
      console.log('user reducer');
      return state;
      break;
  }
}
