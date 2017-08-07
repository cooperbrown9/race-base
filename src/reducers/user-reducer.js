
function user(state = initialUserState, action) {

  switch (action.type) {
    case 'GET_USER':
      return { id: '', name: 'dude'};
      break;
    default:
      console.log('user reducer');
      break;
  }
}

export default user;
