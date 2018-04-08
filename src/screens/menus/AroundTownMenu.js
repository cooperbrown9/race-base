import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';
import WebViewScreen from '../WebViewScreen.js';
import Menu from '../Menu.js';
import * as NavActions from '../../action-types/navigation-action-types.js';

const urlAroundTown = "http://www.visitspokane.com/bloomsday";

class AroundTownMenu extends Component {

  static navigationOptions = {
    header: null
  }

  _navigate(path) {
    this.props.dispatch({type: 'CLOSE'  });
    this.props.navigation.dispatch({ type: path });
  }

  render() {
    const menu = <Menu navigator={this.props.navigator} navigateFunc={this._navigate.bind(this)} />
    return(
      <SideMenu menu={menu} isOpen={this.props.menuOpen} >
        <WebViewScreen title={'Around Town'} url={urlAroundTown}/>
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

export default connect(mapStateToProps)(AroundTownMenu);
