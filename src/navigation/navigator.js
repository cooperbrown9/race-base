import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import ForecastScreen from '../screens/ForecastScreen.js';
import SideMenu from 'react-native-side-menu';
import HomeMenu from '../screens/menus/HomeMenu.js';
import FaqScreen from '../screens/FaqScreen.js';
import TrackingScreen from '../screens/TrackingScreen.js';
import HistoricalWeatherScreen from '../screens/HistoricalWeatherScreen.js';
import ScheduleScreen from '../screens/ScheduleScreen.js';


export const AppNavigator = StackNavigator({
  Home: { screen: HomeMenu },
  Forecast: {screen: ForecastScreen},
  Tracking: {screen: TrackingScreen},
  Faq: {screen: FaqScreen},
  HistoricalWeather: {screen: HistoricalWeatherScreen},
  Schedule: {screen: ScheduleScreen}

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
