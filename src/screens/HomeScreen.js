
import React, { Component } from 'react';
import { View,
         Text,
         Image,
         StyleSheet,
         TouchableOpacity,
         Dimensions,
         Button,
         Modal,
         Platform,
         Alert
} from 'react-native';

import { connect } from 'react-redux';
// import { Permissions } from 'expo';

import NavBar from '../ui-elements/nav-bar.js';
import Menu from './menus/main-menu.js';
import ProfileScreen from './ProfileScreen';
import WebViewNavScreen from './WebViewNavScreen';
import axios from 'axios';
import RegistrationModal from '../modals/RegistrationModal';

import * as Screens from '../constants/screen-types.js';
import * as FriendActions from '../action-types/friend-action-types';
import * as API from '../api/api';
// import data from '../../assets/data/bib-data.json';
// import Expo from 'expo';

const urlRegister = "http://www.bloomsdayrun.org/registration/register-online";

// Bundle ID is com.xapp.lilacbloomsday
class HomeScreen extends Component {

  constructor() {
    super();

    this.state = {
      menuOpen: false,
      createUserFormPresented: false,
      registrationFormPresented: false,
    }
  }

  static navigationOptions = {
    header: null,
  };

  componentWillMount() {
    // this.getFriends();
  }

  componentDidMount() {
    // this uploaded all the users to the db so dont touch this
    // let runner = {};
    // for(let i = 0; i < data.length; i++) {
    //   runner = {
    //     'runKeyField': data[i].runKeyField,
		// 		'runLastName': data[i].runLastName,
		// 		'runFirstName': data[i].runFirstName,
		// 		'runAge': data[i].runAge,
		// 		'runCity': data[i].runCity,
		// 		'runNumber': data[i].runNumber
    //   }
    //   axios.post('https://racebaseapi.herokuapp.com/api/upload-single-runner', runner)
    //   .then(response => console.log(response.data))
    //   .catch(e => console.log(e));
    // }
  }

  componentWillUnmount() {

  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen }, () => {
      this.props.dispatch({ type: (this.state.menuOpen) ? 'OPEN' : 'CLOSE' });
    })
  }

  onRegister = () => {
    this.setState({
      registrationFormPresented: true
    });
  }

  dismissCreateUserForm = () => {
    this.setState({
      createUserFormPresented: false,
    });
  }

  dismissRegistrationForm = () => {
    this.setState({
      registrationFormPresented: false
    });
  }

  getDaysUntilRace() {
    var now = new Date();
    if(now.getMonth() === 4 && now.getDate() === 6) {
      return 'Today';
    }
    if(now.getMonth() === 4 && now.getDate() === 5) {
      return '1 Day';
    }
    var raceday = new Date("2019/05/06"); // yr,mo,da May 6, 2018
    var diff = Math.floor((raceday - now) / 86400000);

    return diff + ' Days';
  }

  _alert = (message) => {
    Alert.alert(message);
  }

  render() {

    const { width, height } = Dimensions.get('window');

    return (
        <View style={styles.container} >
          {(!this.state.createUserFormPresented)
            ? <NavBar leftButton={<Image source={require('../../assets/icons/bars.png')} style={{height:20, width:20, tintColor: 'white'}}/>}
                    leftOnPress={this.toggleMenu.bind(this)}

                    style={styles.navBarStyle}
              />
            : null
          }

        <Modal animationType={"slide"} transparent={true} visible={this.state.createUserFormPresented} >
          <ProfileScreen alert={(text) => this._alert(text)} dismiss={this.dismissCreateUserForm.bind(this)} />
        </Modal>

        {/*<WebViewNavScreen title={"Register"} url={urlRegister} dismiss={this.dismissRegistrationForm.bind(this)}/>*/}
        {/**/}
        <Modal animationType={"slide"} transparent={false} visible={this.state.registrationFormPresented} >
          <RegistrationModal dismiss={() => this.setState({ registrationFormPresented: false })} />
        </Modal>

          <View style={styles.imageContainer}>
            <Image style={styles.backgroundImage} source={require('../../assets/images/bloomsday-dashboard.png')} />
          </View>


          <View style={styles.bottomBar}>
            <View style={styles.dateCountdown}>
              <Text style={{fontSize: 12, color: 'gray', marginBottom: 3, marginTop: 10}}>May 6, 2018</Text>
              <Text style={{fontSize: 20,}}>{this.getDaysUntilRace()} </Text>
            </View>
            <View style={{width: 1, backgroundColor: '#55BBDD'}}></View>
            <TouchableOpacity style={styles.register} onPress={() => this.setState({ registrationFormPresented: true }) }>
              <Text style={styles.registerText} >REGISTER</Text>
              <Image source={require('../../assets/icons/right-arrow.png')} style={{height: 20, width: 20, tintColor:'#55BBDD'}}></Image>
            </TouchableOpacity>
          </View>


          <View style={styles.logo}>
            <Image source={require('../../assets/images/Bloomsday2018_color.png')} style={styles.logoImage}></Image>
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
    color: '#55BBDD',
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
     opacity: 0.6,
  },
  logo: {

    ...Platform.select({
      ios: {
        position: 'absolute',
        right: 0,
        left: 0,
        top: 125,
        alignItems: 'center'
      },
      android: {
        position: 'absolute',
        right: 0,
        left: 3,
        top: 125,
        alignItems: 'center'
      },
    }),
  },
  logoImage:{
    ...Platform.select({
      ios: {
        height: 95,
        width: Dimensions.get('window').width*.90
      },
      android: {
        height: 95,
        width: Dimensions.get('window').width,
      },
    }),
  },
});

var mapStateToProps = state => {
  return {
    nav: state.nav,
    friends: state.friend.friends
  }
}

export default connect(mapStateToProps)(HomeScreen);
