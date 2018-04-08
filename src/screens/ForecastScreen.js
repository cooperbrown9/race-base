import React, { Component } from 'react';
import { View,
         Text,
         Image,
         StyleSheet,
         TouchableOpacity,
         ScrollView,
         Modal,
         Dimensions,
         Button,
} from 'react-native';
import { connect } from 'react-redux';
import NavBar from '../ui-elements/nav-bar.js';
import ForecastDay from '../ui-elements/forecast-day.js';
import Menu from './Menu.js';
import SideMenu from 'react-native-side-menu';
import * as Colors from '../style/colors.js';
import axios from 'react-native-axios';


class ForecastScreen extends Component {

  static navigationOptions = {
    header: null,
  };

  compnentDidMount() {
    this.loadWeather();
  }


  state = {
    menuOpen: false,
    tenDay: []
  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen }, () => {
      this.props.dispatch({ type: (this.state.menuOpen) ? 'OPEN' : 'CLOSE' });
    });

    console.log(this.state.tenDay[1]);
  }

  loadWeather = () => {

   axios.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22spokane%2C%20wa%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys').then(response => {
     // pulls out all available products and stores in newProducts
     let forecast = [];

     for(let i = 0; i < response.query.item.forecast.length; i++) {
       forecast.push(response.query.item.forecast[i]);
       console.log(forecast[i].code);
     }

     this.setState({tenDay: forecast});


   }).catch(e => {
     concole.log(something);
   });
 }




  dropDownMenu(){
    console.log("Drop Down Accessed");
  }

  render(){
    const { width, height } = Dimensions.get('window');
    return(
      <View style={{flex:1, backgroundColor: 'white'}}>
      <NavBar leftButton={<Image source={require('../../assets/icons/bars.png')} style={{height: 20, width: 20, tintColor: 'white'}}/>}
              leftOnPress={this.toggleMenu.bind(this)}
              title={<Text style={{color:'white', fontSize: 16, fontFamily: 'roboto-bold'}}>Forecast</Text>}
              style={{position:'absolute'}}
      />
      {/*<Modal animationType={"slide"} transparent={true} visible={this.state.menuOpen} >
        <Menu dispatcher={this.props.dispatch} dismiss={() => {this.setState({menuOpen: false})}} from={'Schedule'}/>
      </Modal>*/}

      <ScrollView style={{flex:1}}>
        <View style={styles.currentWeather}>
          <View style={styles.dateInfoContainer}>
            <Text style={{fontSize: 48, color: '#55BBDD'}}>TUE</Text>
            <Text style={{fontSize: 24, marginTop:5,  color: '#55BBDD'}}>MAR 12</Text>
          </View>

          <View style={styles.weatherIconContainer}>
            <Image source={require('../../assets/icons/weather/partlyCloudy.png')} style={{marginLeft: 45, height: 80, width:80, resizeMode:'contain'}}/>
          </View>

          <View style={styles.tempInfoContainer}>
            <Text style={{fontSize: 36, color: '#55BBDD', }}>{89}</Text>
            <Text style={{fontSize: 20, color: '#55BBDD', }}>{'H: ' + 90}</Text>
            <Text style={{fontSize: 20, color: '#55BBDD', }}>{'L: ' + 76}</Text>
          </View>
        </View>
          <ForecastDay/>
          <ForecastDay/>
          <ForecastDay/>
          <ForecastDay/>

      </ScrollView>
      </View>
    );
  }

}

var mapStateToProps = state => {
  return {
    nav: state.nav,

  }
}

const styles = StyleSheet.create({

  currentWeather:{
    flexDirection: 'row',
    flex:1,
    height: 150,
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    borderBottomWidth: 1
  },
  dateInfoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  weatherIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  tempInfoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleLabel: {
    height: 20,
    fontSize: 14,
    alignItems: 'center',
    marginTop: 8,
    color: Colors.DARK_GREY
  },
  rightButton: {
    height: 40,
    marginTop: 12,
    marginRight: 32,
    width:64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBarButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  optionsView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 20,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 24
  },
  checkbox: {
    backgroundColor: 'blue',
    height: 24,
    width: 24,
    borderRadius: 16,
  },
  text: {
    fontSize: 18,
  },
  underline: {
    backgroundColor: Colors.LIGHT_GREY,
    height: 2,
    marginLeft: 16,
    marginTop: 16,
    marginRight: 16
  },
  buttonStyle: {
    marginRight: 64,
    marginLeft: 64,
    marginTop: 128
  }


});




export default connect(mapStateToProps)(ForecastScreen);
