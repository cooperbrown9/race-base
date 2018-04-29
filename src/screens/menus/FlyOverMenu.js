

import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';
import WebViewScreen from '../WebViewScreen.js';
import Menu from '../Menu.js';
import * as NavActions from '../../action-types/navigation-action-types.js';

const urlFlyOver = "https://vimeo.com/208591364/1b1e96dcc3";

class FlyOverMenu extends Component {

  static navigationOptions = {
    header: null

  }

  componentDidMount() {
    console.log("hello");

  }

  _navigate(path) {
    this.props.dispatch({type: 'CLOSE'  });
    this.props.dispatch({ type: 'SET_URL', url: 'https://www.google.com'})
    this.props.navigation.dispatch({ type: path });
  }

  render() {
    const menu = <Menu navigator={this.props.navigator} navigateFunc={this._navigate.bind(this)} />
    return(
      <SideMenu menu={menu} isOpen={this.props.menuOpen} >
        <WebViewScreen title={'Fly Over Video'} url={urlFlyOver}/>
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

export default connect(mapStateToProps)(FlyOverMenu);
