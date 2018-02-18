import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import ForecastScreen from '../screens/ForecastScreen.js';
import ResultsScreen from '../screens/ResultsScreen.js';
import FaqScreen from '../screens/FaqScreen.js';
import ScheduleScreen from '../screens/ScheduleScreen.js';
import TrackingScreen from '../screens/TrackingScreen.js';
import HistoricalWeatherScreen from '../screens/HistoricalWeatherScreen.js';

import SideMenu from 'react-native-side-menu';
import HomeMenu from '../screens/menus/HomeMenu.js';
import ForecastMenu from '../screens/menus/ForecastMenu.js';
import FaqMenu from '../screens/menus/FaqMenu.js';
import ScheduleMenu from '../screens/menus/ScheduleMenu.js';
import TrackingMenu from '../screens/menus/TrackingMenu.js';
import ResultsMenu from '../screens/menus/ResultsMenu.js';

import LoadScreen from '../screens/LoadScreen';

export const AppNavigator = StackNavigator({
  Load: { screen: LoadScreen },
  Home: { screen: HomeMenu },
  Forecast: {screen: ForecastMenu},
  Tracking: {screen: TrackingMenu},
  Faq: {screen: FaqMenu},
  HistoricalWeather: {screen: HistoricalWeatherScreen},
  Schedule: {screen: ScheduleMenu},
  Results: {screen: ResultsMenu}
});

const AppNavigatorWithState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({dispatch, state: nav})} />
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
