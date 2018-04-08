import React from 'react';
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

class WebViewScreen extends React.Component {

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

  componentDidMount() {

  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen }, () => {
      this.props.dispatch({ type: (this.state.menuOpen) ? 'OPEN' : 'CLOSE' });
    })
  }

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack
      canGoForward : navState.canGoForward
    });
  }

  onBack() {
    this.refs[WEBVIEW_REF].goBack();
  }

  onForward() {
    this.refs[WEBVIEW_REF].goForward();
  }

  render(){
    const { width, height } = Dimensions.get('window');
    return(
      <View style={{flex:1, backgroundColor: 'white'}}>
        <NavBarWebNav leftButton={<Image source={require('../../assets/icons/close.png')} style={{height: 20, width: 20, tintColor: 'white'}}/>}
                leftOnPress={this.toggleMenu.bind(this)}

                backButton={<Image source={require('../../assets/icons/back.png')} style={{height:22, width:22, tintColor: 'white'}}
                  disabled={!this.state.canGoBack}
                />}
                backOnPress={() => this.onBack.bind(this) }

                forwardButton={<Image source={require('../../assets/icons/forward.png')} style={{height:22, width:22, tintColor: 'white'}}
                  disabled={!this.state.canGoForward}
                />}
                forwardOnPress={() => this.onForward.bind(this) }

                title={<Text style={{color:'white', fontSize: 16}}>{title}</Text>}
                style={{position:'absolute'}}
        />

        <WebView
          ref={WEBVIEW_REF}
          source={{uri: url}}
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

export default connect(mapStateToProps)(WebViewScreen);
