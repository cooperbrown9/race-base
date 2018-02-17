import React from 'react';
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
import * as Screens from '../constants/screen-types.js';

class HomeScreen extends React.Component {

  constructor() {
    super();
  }

  static navigationOptions = {
    header: null,
  };

  state = {
    menuOpen: false
  }

  componentDidMount() {

    // this.animate();
  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen }, () => {
      this.props.dispatch({ type: (this.state.menuOpen) ? 'OPEN' : 'CLOSE' });
    })
  }

  _register = () =>{
    console.log("REgister");
  }

  render() {

    const { width, height } = Dimensions.get('window');

    return (
        <View style={styles.container} >

          <NavBar leftButton={<Image source={require('../../assets/icons/bars.png')} style={{height:20, width:20, tintColor: 'white'}}/>}
                  leftOnPress={this.toggleMenu.bind(this)}
                  rightButton={<Image source={require('../../assets/icons/profile.png')} style={{height:22, width:22, tintColor: 'white'}}/>}
                  style={styles.navBarStyle}
          />
        {/*
        <Modal animationType={"slide"} transparent={true} visible={this.state.menuOpen} >
          <Menu dispatcher={this.props.dispatch} dismiss={() => {this.setState({menuOpen: false})}} from={Screens.HOME} />
        </Modal>
        */}

          <View style={styles.imageContainer}>
            <Image style={styles.backgroundImage} source={require('../../assets/images/bloomsday-dashboard.png')} />
          </View>


          <View style={styles.bottomBar}>
            <View style={styles.dateCountdown}>
              <Text style={{fontSize: 12, color: 'gray', marginBottom: 3, marginTop: 10}}>May 7, 2017</Text>
              <Text style={{fontSize: 20,}}>135 Days</Text>
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
