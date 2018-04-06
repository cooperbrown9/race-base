import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

// import ForecastScreen from '../screens/ForecastScreen.js';
// import ResultsScreen from '../screens/ResultsScreen.js';
// import FaqScreen from '../screens/FaqScreen.js';
// import ScheduleScreen from '../screens/ScheduleScreen.js';
// import TrackingScreen from '../screens/TrackingScreen.js';
import HistoricalWeatherScreen from '../screens/HistoricalWeatherScreen.js';
// import FlyOverScreen from '../screens/FlyOverScreen.js';
// import SponsorsScreen from '../screens/SponsorsScreen.js';

import SideMenu from 'react-native-side-menu';
import HomeMenu from '../screens/menus/HomeMenu.js';
import ForecastMenu from '../screens/menus/ForecastMenu.js';
import FaqMenu from '../screens/menus/FaqMenu.js';
import ScheduleMenu from '../screens/menus/ScheduleMenu.js';
import TrackingMenu from '../screens/menus/TrackingMenu.js';
import ResultsMenu from '../screens/menus/ResultsMenu.js';
import SocialMenu from '../screens/menus/SocialMenu.js';
import FlyOverMenu from '../screens/menus/FlyOverMenu.js';
import SponsorsMenu from '../screens/menus/SponsorsMenu.js';
import CreateUserForm from '../screens/CreateUserForm';

import { addListener } from './store';

import LoadScreen from '../screens/LoadScreen';

export const AppNavigator = StackNavigator({
  Load: { screen: LoadScreen },
  Home: { screen: HomeMenu },
  Forecast: {screen: ForecastMenu},
  Tracking: {screen: TrackingMenu},
  Faq: {screen: FaqMenu},
  // HistoricalWeather: {screen: HistoricalWeatherScreen},
  Schedule: {screen: ScheduleMenu},
  Results: {screen: ResultsMenu},
  Social: {screen: SocialMenu},
  FlyOver: {screen: FlyOverMenu},
  Sponsors: {screen: SponsorsMenu},
  CreateUser: { screen: CreateUserForm }
});
// const middleware = createReactNavigationReduxMiddleware(
//   "root",
//   state => state.nav,
// );
// const addListener = createReduxBoundAddListener('root');

const AppNavigatorWithState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({dispatch: dispatch, state: nav, addListener})} />
);


AppNavigatorWithState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
  nav: state.nav,
});

// export default connect(mapStateToProps)(Menu);
export default connect(mapStateToProps)(AppNavigatorWithState);
