import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';
import HomeScreen from '../HomeScreen.js';
import Menu from '../Menu.js';
import * as NavActions from '../../action-types/navigation-action-types.js';

class HomeMenu extends Component {

  static navigationOptions = {
    header: null
  }

  _navigate(path) {
    this.props.dispatch({ type: 'CLOSE' });
    this.props.dispatch({ type: path });
  }

  render() {
    const menu = <Menu navigator={this.props.nav} navigateFunc={this._navigate.bind(this)} />
    return(
      <SideMenu menu={menu} isOpen={this.props.menuOpen} >
        <HomeScreen />
      </SideMenu>

    )
  }
}

var mapStateToProps = (state) => {
  return {
    nav: state.nav,
    menuOpen: state.menuStatus.isOpen
  }
}

export default connect(mapStateToProps)(HomeMenu);
