import React from 'react';
import { connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';
import HomeScreen from './HomeScreen.js';
import Menu from './Menu.js';
import * as NavActions from '../action-types/navigation-action-types.js';

class HomeScreenMenu extends React.Component {

  static navigationOptions = {
    header: null
  }

  _navigateDisB(path) {
    this.props.navigation.dispatch({ type: path });
  }

  render() {
    const menu = <Menu navigator={this.props.navigator} navigateFunc={this._navigateDisB.bind(this)} />
    return(
      <SideMenu menu={menu}>
        <HomeScreen />
      </SideMenu>

    )
  }
}

var mapStateToProps = state => {

  return {
    navigator: state.nav
  }
}

export default connect(mapStateToProps)(HomeScreenMenu);
