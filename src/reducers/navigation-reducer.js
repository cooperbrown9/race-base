import { React } from 'react';
import { NavigationActions } from 'react-navigation';
import * as NavActions from '../action-types/navigation-action-types.js';
import { AppNavigator } from '../navigation/navigator.js';

const firstAction = AppNavigator.router.getActionForPathAndParams('Home');
const firstState = AppNavigator.router.getStateForAction(firstAction);

export default function nav(state = firstState, action) {
  let nextState;

  switch (action.type) {
    case NavActions.GO_HOME:
      console.log('bruuuuh');
      break;
    default:
      console.log('default switch');
      break;

  }
  return nextState || state;
}
