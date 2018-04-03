import React from 'react';
import { View,
         Text,
         Image,
         StyleSheet,
         TouchableOpacity,
         ScrollView,
         Dimensions,
         WebView
} from 'react-native';
import { connect } from 'react-redux';
import NavBar from '../ui-elements/nav-bar.js';
import FAQItem from '../ui-elements/faq-item.js';
// import Menu from './menus/main-menu.js';

import Menu from './Menu.js';
import SideMenu from 'react-native-side-menu';


class FaqScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();

    this.state = {
      menuOpen: false
    }
  }

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen }, () => {
      this.props.dispatch({ type: (this.state.menuOpen) ? 'OPEN' : 'CLOSE' });
    })
  }

  render(){
    const { width, height } = Dimensions.get('window');
    return(
      <View style={{flex:1, backgroundColor: 'white'}}>
      <NavBar leftButton={<Image source={require('../../assets/icons/bars.png')} style={{height: 20, width: 20, tintColor: 'white'}}/>}
              rightButton={<Image source={require('../../assets/icons/profile.png')} style={{height: 22, width: 22, tintColor: 'white'}}/>}
              leftOnPress={() => this.toggleMenu()}
              title={<Text style={{color:'white', fontSize: 16}}>FAQ</Text>}
              style={{position:'absolute'}}
      />
      <WebView
        source={{uri: "http://www.bloomsdayrun.org/faq?altTemplate=MobileFaqs"}}
        style={{flex: 1}}
      />
      </View>
    );
  }

}

var mapStateToProps = state => {
  return {
    nav: state.nav,
    // menuOpen
  }
}

export default connect(mapStateToProps)(FaqScreen);
