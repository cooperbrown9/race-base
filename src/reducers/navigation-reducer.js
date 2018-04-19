import { React } from 'react';
import { NavigationActions } from 'react-navigation';
import * as NavActions from '../action-types/navigation-action-types.js';
import { AppNavigator } from '../navigation/navigator.js';

const firstAction = AppNavigator.router.getActionForPathAndParams('Load');
const firstState = AppNavigator.router.getStateForAction(firstAction);

export default function nav(state = firstState, action) {
  let nextState;

  switch (action.type) {

    case 'START_HOME':
      nextAction = AppNavigator.router.getActionForPathAndParams('Home');
      nextState = AppNavigator.router.getStateForAction(nextAction);

    case NavActions.START_CREATE_ACCOUNT:
      nextAction = AppNavigator.router.getActionForPathAndParams('CreateUser');
      nextState = AppNavigator.router.getStateForAction(nextAction);

    case NavActions.GO_HOME:
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({routeName: 'Home'}),
      state
    );
    // for(let i = 0; i < nextState.routes.length; i++) {
    //   if(nextState.routes[i].routeName === 'FlyOver') {
    //     nextState.routes.splice(i, 1);
    //     break;
    //   }
    // }
      break;

    case NavActions.GO_FORECAST:
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({routeName: 'Forecast'}),
      state
    );
    // for(let i = 0; i < nextState.routes.length; i++) {
    //   if(nextState.routes[i].routeName != null && nextState.routes[i].routeName === 'FlyOver') {
    //     // delete nextState.routes[i];
    //     nextState.routes.splice(i, 1);
    //     break;
    //   }
    // }
    break;

    case NavActions.GO_FAQ:
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({routeName: 'Faq'}),
      state
    );
    // for(let i = 0; i < nextState.routes.length; i++) {
    //   if(nextState.routes[i].routeName != null && nextState.routes[i].routeName === 'FlyOver') {
    //     nextState.routes.splice(i, 1);
    //     break;
    //   }
    // }
    break;

    case NavActions.GO_TRACKING:
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({routeName: 'Tracking'}),
      state
    );

    case NavActions.GO_RACEMAP:
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({routeName: 'RaceMap'}),
      state
    );

    // for(let i = 0;i < nextState.routes.length; i++) {
    //   if(nextState.routes[i].routeName != null && nextState.routes[i].routeName === 'FlyOver') {
    //     nextState.routes.splice(i, 1);
    //     break;
    //   }
    // }
    break;
    case NavActions.GO_RESOURCE_MAPS:
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({routeName: 'ResourceMaps'}),
      state
    );
    // for(let i = 0;i < nextState.routes.length; i++) {
    //   if(nextState.routes[i].routeName != null && nextState.routes[i].routeName === 'FlyOver') {
    //     nextState.routes.splice(i, 1);
    //     break;
    //   }
    // }
    break;
    case NavActions.GO_SCHEDULE:
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({routeName: 'Schedule'}),
      state
    );
    // for(let i = 0;i < nextState.routes.length; i++) {
    //   if(nextState.routes[i].routeName != null && nextState.routes[i].routeName === 'FlyOver') {
    //     nextState.routes.splice(i, 1);
    //     break;
    //   }
    // }
    break;
    case NavActions.GO_RESULTS:
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({routeName: 'Results'}),
      state
    );
    // for(let i = 0;i < nextState.routes.length; i++) {
    //   if(nextState.routes[i].routeName != null && nextState.routes[i].routeName === 'FlyOver') {
    //     nextState.routes.splice(i, 1);
    //     break;
    //   }
    // }
    break;

    case NavActions.GO_SOCIAL:
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({routeName: 'Social'}),
      state
    );
    // for(let i = 0;i < nextState.routes.length; i++) {
    //   if(nextState.routes[i].routeName != null && nextState.routes[i].routeName === 'FlyOver') {
    //     nextState.routes.splice(i, 1);
    //     break;
    //   }
    // }
    break;

    case NavActions.GO_FLYOVER:
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({routeName: 'FlyOver'}),
      state
    );

    break;

    case NavActions.GO_AROUNDTOWN:
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({routeName: 'AroundTown'}),
      state
    );
    // for(let i = 0;i < nextState.routes.length; i++) {
    //   if(nextState.routes[i].routeName != null && nextState.routes[i].routeName === 'FlyOver') {
    //     nextState.routes.splice(i, 1);
    //     break;
    //   }
    // }
    break;

    case NavActions.GO_SPONSOR:
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({routeName: 'Sponsors'}),
      state
    );
    // for(let i = 0;i < nextState.routes.length; i++) {
    //   if(nextState.routes[i].routeName != null && nextState.routes[i].routeName === 'FlyOver') {
    //     nextState.routes.splice(i, 1);
    //     break;
    //   }
    // }
    break;

    default:
      console.log('default switch');
      break;

  }
  //
  // try{
  //   for(let i = 0; i < nextState.routes.length-1; i++) {
  //     if(nextState.routes[i].routeName != null && nextState.routes[i].routeName === 'FlyOver') {
  //       // delete nextState.routes[i];
  //       debugger;
  //       nextState.routes.splice(i, 1);
  //       break;
  //     }
  //   }
  // } catch(e) {
  //   console.log(e);
  // }
  return nextState || state;
}
