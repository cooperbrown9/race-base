
import * as ScreenTypes from '../constants/screen-types.js';
const initialMenuState = { isOpen: false, openedFrom: ScreenTypes.HOME }

function menuStatus(state = initialMenuState, action) {
  switch(action.type) {
    case 'OPEN':
      return {
        ...state,
        isOpen: true,
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
