
import * as FriendActions from '../action-types/friend-action-types';

const initialState = {
  friends: []
}

export default function friend(state = initialState, action) {

  switch(action.type) {
    case FriendActions.UPDATE_ALL_LOCATIONS:
      return {
        ...state,
        friends: action.friends
      }

    case FriendActions.SET_FRIENDS_RAW:
      return {
        ...state,
        friends: action.friends
      }

    case FriendActions.SET_FRIENDS:
      return {
        ...state,
        friends: action.friends
      }

    default:
      return state;
  }
}
