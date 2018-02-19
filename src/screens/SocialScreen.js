import React from 'react';
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

class SocialScreen extends React.Component {

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

  render(){
    const { width, height } = Dimensions.get('window');
    return(
      <View style={{flex:1, backgroundColor: 'white'}}>
        <NavBar leftButton={<Image source={require('../../assets/icons/bars.png')} style={{height: 20, width: 20, tintColor: 'white'}}/>}
                leftOnPress={this.toggleMenu.bind(this)}
                title={<TouchableOpacity>
                        <Text style={{color:'white', fontSize: 16}}>Social Media</Text>
                       </TouchableOpacity>}
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
      fontSize: 16,
      color: 'white'
    },

    selectText: {
      fontSize: 16,
      color: 'black'
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
