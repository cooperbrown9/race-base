import React from 'react';
import { View,
         Text,
         Image,
         StyleSheet,
         TouchableOpacity,
         Animated,
         Easing,
         Dimensions,
         Button
} from 'react-native';
import { connect } from 'react-redux';
import NavBar from '../ui-elements/nav-bar.js';
import Menu from './Menu.js';
import SideMenu from 'react-native-side-menu';

class HomeScreen extends React.Component {

  constructor() {
    super();
    this.animatedValue = new Animated.Value(0);
  }

  static navigationOptions = {
    header: null,
  };

  state = {
    xPosition: new Animated.Value(0),
    endXPosition: new Animated.Value(0),
    didAnimate: false,
    menuOpen: false
  }

  componentDidMount() {

    this.animate();
  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen }, () => {
      this.props.dispatch({ type: (this.state.menuOpen) ? 'OPEN' : 'CLOSE' });
    })
  }

  onP = () => {
    Animated.timing(this.state.endXPosition, {
      toValue: 1,
      easing: Easing.linear,
      duration: 1000
    }).start();
    this.setState({didAnimate: false});
  }

  animate() {
    this.animatedValue.setValue(0);
    Animated.timing(this.state.xPosition, {
      toValue: 1,
      easing: Easing.linear,
      duration: 1000
    }).start();
    this.setState({didAnimate: true});
    return;
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear
    }).start(() => this.animate())
  }

  _register = () =>{
    console.log("REgister");
  }

  render() {

    const { width, height } = Dimensions.get('window');
    const marginLeft = this.animatedValue.interpolate({
      inputRange: [0,1],
      outputRange: [0, 300]
    });
    const movingMargin = this.state.xPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [0, width * 0.5]
    });

    const moveBack = this.state.endXPosition.interpolate({
      inputRange: [0,1],
      outputRange: [width * 0.5, 0]
    });

    return (
        <View style={styles.container} >

          <NavBar leftButton={<Image source={require('../../assets/icons/bars.png')} style={{height:20, width:20, tintColor: 'white'}}/>}
                  leftOnPress={this.toggleMenu.bind(this)}
                  rightButton={<Image source={require('../../assets/icons/profile.png')} style={{height:22, width:22, tintColor: 'white'}}/>}
                  style={styles.navBarStyle}
          />

          <View style={styles.imageContainer}>
            <Image style={styles.backgroundImage} source={require('../../assets/images/bloomsday-dashboard.png')} />
          </View>


          <View style={styles.bottomBar}>
            <View style={styles.dateCountdown}>
              <Text style={{fontSize: 12, color: 'gray', marginBottom: 3, marginTop: 10}}>May 7, 2017</Text>
              <Text style={{fontSize: 20,}}>135 Days</Text>
            </View>
            <View style={{width: 1, backgroundColor: 'blue'}}></View>
            <TouchableOpacity onPress={() => this.onP()} style={styles.register}>
              <Text style={{fontSize: 22, color: 'blue'}}>REGISTER</Text>
              <Image source={require('../../assets/icons/right-arrow.png')} style={{height: 20, width: 20, tintColor:'blue'}}></Image>
            </TouchableOpacity>
          </View>


          <View style={styles.logo}>
            <Image source={require('../../assets/images/bloomsday-logo.png')} style={{height: 95, width: 350}}></Image>
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
  logo:{
    position: 'absolute',
    right: 0,
    left: 0,
    top: 150,
    alignItems: 'center'
  },
});

var mapStateToProps = state => {
  return {
    nav: state.nav,

  }
}

export default connect(mapStateToProps)(HomeScreen);
