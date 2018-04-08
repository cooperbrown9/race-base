import React, { Component } from 'react';
import { View,
         Text,
         Image,
         StyleSheet,
         TouchableOpacity,
         ScrollView,
         Dimensions, WebView, Modal
} from 'react-native';
import { connect } from 'react-redux';
import NavBar from '../ui-elements/nav-bar.js';
// import Menu from './menus/main-menu.js';

import Menu from './Menu.js';
import SideMenu from 'react-native-side-menu';

const urlTwitter = "https://mobile.twitter.com/bloomsdayrun";
const urlFacebook = "https://m.facebook.com/bloomsday/";
const urlInstaGram = "https://www.instagram.com/bloomsdayrun/";

class SocialScreen extends Component {

  constructor() {
    super();

    this.state = {
      menuOpen: false,
      webviewPresented: false,
      socialIndex: 0,
      currentUrl: urlTwitter
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

        <View style={styles.socBar}>
          <TouchableOpacity style={styles.day} onPress={() => this.setState({ socialIndex: 0, currentUrl: urlTwitter }) } >
            <Text style={this.state.socialIndex===0 ? styles.selectText : styles.socText}>TWITTER</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.day} onPress={() => this.setState({ socialIndex: 1, currentUrl: urlFacebook }) } >
          <Text style={this.state.socialIndex===1 ? styles.selectText : styles.socText}>FACEBOOK</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.day} onPress={() => this.setState({ socialIndex: 2, currentUrl: urlInstaGram }) } >
          <Text style={this.state.socialIndex===2 ? styles.selectText : styles.socText}>INSTAGRAM</Text>
          </TouchableOpacity>
        </View>

        <WebView
          source={{uri: this.state.currentUrl}}
          style={{flex: 1}}
        />

      </View>
    );
  }
}
  const styles = StyleSheet.create({
    socBar: {
      height: 48,
      flexDirection: 'row',
      backgroundColor : 'white',
      justifyContent: 'space-between',
      alignItems: 'flex-start'

    },
    socText: {
      fontSize: 14,
      color: 'white'
    },

    selectText: {
      fontSize: 14,
      color: 'blue'
    },

    day: {
      flex: 1,
      height: 48,
      backgroundColor: '#AADDEE',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'

    },
  });

  var mapStateToProps = state => {
    return {
      nav: state.nav,

    }
  }

export default connect(mapStateToProps)(SocialScreen);
