
import * as UserActions from '../action-types/user-action-types';

const initialUserState = {
  user: {
    name: '',
    bib: ''
  },
  isLoggedIn: false,
  userID: null,
  url: 'https://vimeo.com/208591364/1b1e96dcc3'
}

export default function user(state = initialUserState, action) {
  switch (action.type) {

    case UserActions.SET_USER:
      return {
        user: action.user,
        userID: action.user._id,
        isLoggedIn: true
      }

    case 'SET_URL':
      return {
        ...state,
        url: action.url
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
