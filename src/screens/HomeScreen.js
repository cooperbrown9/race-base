import React, { Component } from 'react';
import { View,
         Text,
         Image,
         StyleSheet,
         TouchableOpacity,
         Animated,
         Easing,
         Dimensions,
         Button,
         Modal
} from 'react-native';

import { connect } from 'react-redux';
import NavBar from '../ui-elements/nav-bar.js';
import Menu from './menus/main-menu.js';
import CreateUserForm from './CreateUserForm';

import * as Screens from '../constants/screen-types.js';

class HomeScreen extends Component {

  constructor() {
    super();

    this.state = {
      menuOpen: false,
      createUserFormPresented: false
    }
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {

    // this.animate();
  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen }, () => {
      this.props.dispatch({ type: (this.state.menuOpen) ? 'OPEN' : 'CLOSE' });
    })
  }

  dismissCreateUserForm = () => {
    this.setState({ createUserFormPresented: false });
  }

  getDaysUntilRace() {
    var now = new Date();
    var raceday = new Date("2018/05/06"); // yr,mo,da May 6, 2018
    var diff = Math.floor((raceday - now) / 86400000);
    return diff;
  }

  render() {

    const { width, height } = Dimensions.get('window');

    return (
        <View style={styles.container} >
          {(!this.state.createUserFormPresented)
            ? <NavBar leftButton={<Image source={require('../../assets/icons/bars.png')} style={{height:20, width:20, tintColor: 'white'}}/>}
                    leftOnPress={this.toggleMenu.bind(this)}
                    rightButton={<Image source={require('../../assets/icons/profile.png')} style={{height:22, width:22, tintColor: 'white'}}/>}
                    rightOnPress={() => this.setState({ createUserFormPresented: true }) }
                    style={styles.navBarStyle}
              />
            : null
          }

        <Modal animationType={"slide"} transparent={true} visible={this.state.createUserFormPresented} >
          <CreateUserForm dismiss={this.dismissCreateUserForm.bind(this)} />
        </Modal>


          <View style={styles.imageContainer}>
            <Image style={styles.backgroundImage} source={require('../../assets/images/bloomsday-dashboard.png')} />
          </View>


          <View style={styles.bottomBar}>
            <View style={styles.dateCountdown}>
              <Text style={{fontSize: 12, color: 'gray', marginBottom: 3, marginTop: 10}}>May 6, 2017</Text>
              <Text style={{fontSize: 20,}}>{this.getDaysUntilRace()} Days</Text>
            </View>
            <View style={{width: 1, backgroundColor: 'blue'}}></View>
            <TouchableOpacity style={styles.register}>
              <Text style={styles.registerText}>REGISTER</Text>
              <Image source={require('../../assets/icons/right-arrow.png')} style={{height: 20, width: 20, tintColor:'blue'}}></Image>
            </TouchableOpacity>
          </View>


          <View style={styles.logo}>
            <Image source={require('../../assets/images/Bloomsday2018_color.png')} style={{height: 95, width: Dimensions.get('window').width*.90}}></Image>
          </View>
        </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  navBarStyle: {
    backgroundColor: '#55BBDD'
  },
  bottomBar: {
    height: 75,
    flexDirection: 'row'
  },
  register: {
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  registerText: {
    fontSize: 28,
    color: 'blue',
    fontFamily: 'roboto-regular'
  },
  dateCountdown: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center'
  },
  backgroundImage: {
     flex: 1,
     resizeMode: 'cover',
     alignItems: 'center',
     opacity: 0.6
  },
  logo: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 150,
    alignItems: 'center'
  },
});

var mapStateToProps = state => {
  return {
    nav: state.nav
  }
}

export default connect(mapStateToProps)(HomeScreen);
