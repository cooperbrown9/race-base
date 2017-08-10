import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen.js';
import ForecastScreen from '../screens/ForecastScreen.js';
import SideMenuScreen from '../screens/SideMenuScreen.js';

export const AppNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  Forecast: {screen: ForecastScreen},
  SideMenu: {screen: SideMenuScreen},
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

export default connect(mapStateToProps)(AppNavigatorWithState);
