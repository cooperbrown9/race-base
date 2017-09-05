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
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({routeName: 'Home'}),
      state
    );
      break;

    case NavActions.GO_FORECAST:
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({routeName: 'Forecast'}),
      state
    );
    break;

    case NavActions.GO_FAQ:
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({routeName: 'Faq'}),
      state
    );
    break;

    case NavActions.GO_TRACKING:
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({routeName: 'Tracking'}),
      state
    );
    break;
    case NavActions.GO_HISTORICAL:
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({routeName: 'HistoricalWeather'}),
      state
    );
    break;
    case NavActions.GO_SCHEDULE:
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({routeName: 'Schedule'}),
      state
    );
      break;

    default:
      console.log('default switch');
      break;

  }
  return nextState || state;
}
