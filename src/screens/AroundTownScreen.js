import React from 'react';
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

const urlAroundTown = "http://www.visitspokane.com/bloomsday";

class AroundTownScreen extends React.Component {

  constructor() {
    super();

    this.state = {
      menuOpen: false,
      webviewPresented: false,
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
                title={<Text style={{color:'white', fontSize: 16}}>Around Town</Text>}
                style={{position:'absolute'}}
        />

        <WebView
          source={{uri: urlAroundTown}}
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

export default connect(mapStateToProps)(AroundTownScreen);
