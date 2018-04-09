import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View,
         Text,
         Image,
         StyleSheet,
         Dimensions, WebView
} from 'react-native';
import { connect } from 'react-redux';
import NavBar from '../ui-elements/nav-bar.js';
// import Menu from './menus/main-menu.js';

import Menu from './Menu.js';
import SideMenu from 'react-native-side-menu';

class WebViewScreen extends Component {

  constructor() {
    super();

    this.state = {
      menuOpen: false,
      webviewPresented: false,
      url: "https://www.google.com",
      title: "",
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

  render(){
    const { width, height } = Dimensions.get('window');
    return(
      <View style={{flex:1, backgroundColor: 'white'}}>
        <NavBar leftButton={<Image source={require('../../assets/icons/bars.png')} style={{height: 20, width: 20, tintColor: 'white'}}/>}
                leftOnPress={this.toggleMenu.bind(this)}
                rightButton={<Image source={require('../../assets/icons/profile.png')} style={{height: 22, width: 22, tintColor: 'white'}} />}
                title={<Text style={{color:'white', fontSize: 20, fontFamily:'roboto-bold'}}>{this.props.title}</Text>}
                style={{position:'absolute'}}
        />

        <WebView
          source={{uri: this.props.url}}
          style={{flex: 1}}

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

export default connect(mapStateToProps)(WebViewScreen);
