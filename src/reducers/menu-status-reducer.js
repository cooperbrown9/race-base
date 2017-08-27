import React from 'react';

const initialMenuState = { isOpen: false }

export default function menuStatus(state = initialMenuState, action) {
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
