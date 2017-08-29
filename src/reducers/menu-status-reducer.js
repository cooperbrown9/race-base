
const initialMenuState = { isOpen: false }

function menuStatus(state = initialMenuState, action) {
  switch(action.type) {
    case 'OPEN':
      return {
        ...state,
        isOpen: true
      }
    case 'CLOSE':
      return {
        ...state,
        isOpen: false
      }
    default:
      return state;
  }
}

export default menuStatus;
