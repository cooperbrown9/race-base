
const initialUserState = { name: 'user' }

export default function user(state = initialUserState, action) {
  switch (action.type) {
    case 'GET_USER':
      return { id: '', name: 'dude'};
      break;
    default:
      console.log('user reducer');
      return state;
      break;
  }
}
