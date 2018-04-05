import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';
import ScheduleScreen from '../ScheduleScreen.js';
import Menu from '../Menu.js';
import * as NavActions from '../../action-types/navigation-action-types.js';

class ScheduleMenu extends Component {

  static navigationOptions = {
    header: null
  }

  _navigate(path) {
    this.props.dispatch({ type: 'CLOSE' });
    this.props.navigation.dispatch({ type: path });
  }

  render() {
    const menu = <Menu navigator={this.props.navigator} navigateFunc={this._navigate.bind(this)} />
    return(
      <SideMenu menu={menu} isOpen={this.props.menuOpen} >
        <ScheduleScreen />
      </SideMenu>

    )
  }
}

var mapStateToProps = (state) => {
  return {
    navigator: state.nav,
    menuOpen: state.menuStatus.isOpen
  }
}

export default connect(mapStateToProps)(ScheduleMenu);
