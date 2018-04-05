import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';
import HomeScreen from '../HomeScreen.js';
import Menu from '../Menu.js';
import * as NavActions from '../../action-types/navigation-action-types.js';

const MenuContainer = (props) => (
  <SideMenu >
    {props.screen}
  </SideMenu>
)



MenuContainer.propTypes = {
  screen: PropTypes.element,
  navigator: PropTypes.object,
  navigateFunc: PropTypes.func
}

var mapStateToProps = state => {
  return {
    navigator: state.nav
  }
}
