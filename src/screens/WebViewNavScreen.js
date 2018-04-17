import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View,
         Text,
         Image,
         StyleSheet,
         Dimensions, WebView
} from 'react-native';
import { connect } from 'react-redux';
import NavBarWebNav from '../ui-elements/nav-bar-web-nav.js';
// import Menu from './menus/main-menu.js';

import Menu from './Menu.js';
import SideMenu from 'react-native-side-menu';

class WebViewNavScreen extends Component {

  constructor() {
    super();

    this.state = {
      menuOpen: false,
      webviewPresented: false,
      url: "https://www.google.com",
      title: "",
      canGoBack: false,
      canGoForward: false,
    }
  }

  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    title: PropTypes.string,
    url: PropTypes.string,
  }

  componentDidMount() {

  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen }, () => {
      this.props.dispatch({ type: (this.state.menuOpen) ? 'OPEN' : 'CLOSE' });
    })
  }

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack,
      canGoForward : navState.canGoForward
    });
  }

  onBack() {
    this.WEBVIEW_REF.goBack();
  }

  onForward() {
    this.WEBVIEW_REF.goForward();
  }

  render(){
    const barsIcon = require('../../assets/icons/bars.png');
    const closeIcon = require('../../assets/icons/close.png');
    var icon = (this.props.dismiss != null) ? closeIcon : barsIcon;
    return(
      <View style={{flex:1, backgroundColor: 'white'}}>
        <NavBarWebNav leftButton={<Image source={icon} style={{height: 20, width: 20, tintColor: 'white'}}/>}
                leftOnPress={ (this.props.dismiss != null) ? this.props.dismiss : this.toggleMenu.bind(this)}

                title={<Text style={{color:'white', fontSize: 16}}>{this.props.title}</Text>}
                style={{position:'absolute'}}

                backButton={<Image source={require('../../assets/icons/back.png')} style={(this.state.canGoBack) ? {height:22, width:22, tintColor: 'white'} : {height:22, width:22, tintColor: 'gray'}}
                />}
                backOnPress={() => this.onBack() }

                forwardButton={<Image source={require('../../assets/icons/forward.png')} style={(this.state.canGoForward) ? {height:22, width:22, tintColor: 'white'} : {height:22, width:22, tintColor: 'gray'}}
                />}
                forwardOnPress={() => this.onForward() }

        />

        <WebView
          ref={ref => {this.WEBVIEW_REF = ref}}
          source={{uri: this.props.url}}
          style={{flex: 1}}
          onNavigationStateChange=
            {this.onNavigationStateChange.bind(this)}
        />

      </View>
    );
  }
}

  var mapStateToProps = state => {
    return {
      nav: state.nav,

    }
  }

export default connect(mapStateToProps)(WebViewNavScreen);
