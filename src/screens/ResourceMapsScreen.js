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
import NavBarWebNav from '../ui-elements/nav-bar-web-nav.js';
import NavBar from '../ui-elements/nav-bar.js';

// import Menu from './menus/main-menu.js';

import Menu from './Menu.js';
import SideMenu from 'react-native-side-menu';

const urlTwitter = "https://mobile.twitter.com/bloomsdayrun";
const urlFacebook = "https://m.facebook.com/bloomsday/";
const urlInstaGram = "https://www.instagram.com/bloomsdayrun/";

class ResourceMapsScreen extends Component {


  state = {
    menuOpen: false,
    mapIndex: 0,
    currentMap: require('../../assets/images/start_map_large.png'),
    offset: 270,
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
    const FRAME = Dimensions.get('window');
    return(
      <View style={{flex:1, backgroundColor: 'white'}}>

        <NavBar
              title={<Text style={{color:'white', fontSize: 20, fontFamily:'roboto-bold'}}>Resource Maps</Text>}
              leftButton={<Image source={require('../../assets/icons/bars.png')} style={{height: 22, width: 22, tintColor: 'white'}} />}
              leftOnPress={this.toggleMenu.bind(this)}
        />
        <View style={styles.socBar}>
          <TouchableOpacity style={styles.day} onPress={() => this.setState({ mapIndex: 0, currentMap: require('../../assets/images/start_map_large.png'), offset: 260})} >
            <Text style={this.state.mapIndex===0 ? styles.selectText : styles.socText}>Starting Map</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.day} onPress={() => this.setState({ mapIndex: 1, currentMap: require('../../assets/images/course_map.jpg'), offset: 420 })} >
            <Text style={this.state.mapIndex===1 ? styles.selectText : styles.socText}>Course Map</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.day} onPress={() => this.setState({ mapIndex: 2, currentMap: require('../../assets/images/bloomsday-elevation-map.png'), offset: 500 })} >
            <Text style={this.state.mapIndex===2 ? styles.selectText : styles.socText}>Elevation</Text>
          </TouchableOpacity>
        </View>
          <ScrollView horizontal={true} styles={{flex:1}} contentOffset={{x: this.state.offset, y: 0}} >
            <Image source={this.state.currentMap} resizeMode="contain" style={{alignSelf: 'stretch', height: FRAME.height - ((FRAME.height === 812) ? 84 : 64) - 48 }}/>
          </ScrollView>




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

export default connect(mapStateToProps)(ResourceMapsScreen);
