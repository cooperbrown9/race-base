export const NOTIFICATION_SIGNUP = 'notification/signup';
export const NOTIFICATION_SIGNUP_SUCCESS = 'notification/success';
export const NOTIFICATION_SIGNUP_ERROR = 'notification/error';

const initialState = {};

export default function notification(state = initialState, action) {
  switch(action.type) {
    case NOTIFICATION_SIGNUP:
      return {

      }

    case NOTIFICATION_SIGNUP_SUCCESS:
      return {

      }

    case NOTIFICATION_SIGNUP_ERROR:
      return {

      }

    default:
      return state;
  }
}
