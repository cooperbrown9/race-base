import React from 'react';
import { connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';
import FaqScreen from '../FaqScreen.js';
import Menu from '../Menu.js';
import * as NavActions from '../../action-types/navigation-action-types.js';

class FaqMenu extends React.Component {

  static navigationOptions = {
    header: null
  }

  _navigate(path) {
    this.props.navigation.dispatch({ type: path });
  }

  render() {
    const menu = <Menu navigator={this.props.navigator} navigateFunc={this._navigate.bind(this)} />
    return(
      <SideMenu menu={menu} isOpen={this.props.menuOpen} >
        <FaqScreen />
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

export default connect(mapStateToProps)(FaqMenu);
