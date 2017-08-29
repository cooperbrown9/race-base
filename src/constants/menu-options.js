import * as NavActions from '../action-types/navigation-action-types.js';


export const options = [
  {name: 'Schedule', iconPath: require('../../assets/icons/navigation/calendar.png'), path: NavActions.GO_FORECAST},
  {name: 'Register', iconPath: require('../../assets/icons/navigation/list.png'), path: NavActions.GO_FORECAST},
  {name: 'FAQ', iconPath: require('../../assets/icons/navigation/faq.png'), path: NavActions.GO_FAQ},
  {name: 'Maps', iconPath: require('../../assets/icons/navigation/maps.png'), path: NavActions.GO_FORECAST},
  {name: 'Tracking & Results', iconPath: require('../../assets/icons/navigation/tracking-results.png'), path: NavActions.GO_TRACKING},
  {name: 'Weather', iconPath: require('../../assets/icons/navigation/weather.png'), path: NavActions.GO_FORECAST},
];
