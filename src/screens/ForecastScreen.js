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
import axios from 'axios';


class ForecastScreen extends Component {

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.loadWeather();
  }


  state = {
    menuOpen: false,
    days: [],
    today: {
      temp: 50,
      date: new Date(),
      month: 'May',
      day: 'Monday',
      high: '',
      low: ''
    }
  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen }, () => {
      this.props.dispatch({ type: (this.state.menuOpen) ? 'OPEN' : 'CLOSE' });
    });

    console.log(this.state.days[1]);
  }

  loadWeather = () => {
   axios.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22spokane%2C%20wa%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
    .then((response) => {

     let forecast = response.data.query.results.channel.item.forecast;

     this.setState({
       days: forecast,
       today: {
         temp: response.data.query.results.channel.item.condition.temp,
         date: new Date(response.data.query.results.channel.item.condition.date),
         high: forecast[0].high,
         low: forecast[0].low
       }
     }, () => {
       this.setState({ days: this.state.days.splice(1,this.state.days.length - 1) });
       this.parseDate();
     });


   }).catch((e) => {
     console.log('penis');
   });
 }

 parseDate() {
   let day = '';
   let month = '';
   switch (this.state.today.date.getDay()) {
     case 0:
       day = 'Sun';
       break;
     case 1:
       day = 'Mon';
       break;
     case 2:
       day = 'Tue';
       break;
     case 3:
       day ='Wed';
       break;
     case 4:
       day = 'Thu';
       break;
     case 5:
       day = 'Fri';
       break;
     case 6:
       day = 'Sat';
       break;
     default:
       day = 'Mon';
       break;
   }

   if(this.state.today.date.getMonth() == 3) {
     month = 'Apr';
   }
   if(this.state.today.date.getMonth() == 4) {
     month = 'May';
   }
   this.setState({
     today: {
       ...this.state.today,
       month: month,
       day: day
     }
   });
 }


  dropDownMenu(){
    console.log("Drop Down Accessed");
  }

  getIcon(day) {
    let code = day.code;
    // let icon =
    switch(code) {
      case 32,33,34,36:
        return 'sunny.png';
      case 24,25:
        return 'breezy-cloudy.png';
      case 3,4,27,28,29,30:
        return 'partlyCloudy.png';
      case 5,6,7,8,9,10,11,12,13,14,15,16,17,18:
        return 'rainy.png';
      default:
        return 'partlyCloudy.png';

    }
  }

  forecastDayFactory = (day) => {
    let weather = this.getIcon(day);
    // let icon = require('../../assets/icons/weather/' + weather);
    return (
      <ForecastDay
        key={day.dayOfMonth}
        date={new Date(day.date)}
        highTemp={day.high}
        lowTemp={day.low}
        icon={<Image source={require('../../assets/icons/weather/sunny.png')} style={{height: 50, width: 65, marginBottom: 5, marginLeft: 40}}/>}
      />
    )
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

      <ScrollView style={{flex:1}}>
        <View style={styles.currentWeather}>
          <View style={styles.dateInfoContainer}>
            <Text style={{fontSize: 48, color: '#55BBDD'}}>{this.state.today.day}</Text>
            <Text style={{fontSize: 24, marginTop:5,  color: '#55BBDD'}}>{this.state.today.month} {this.state.today.date.getDate()}</Text>
          </View>

          <View style={styles.weatherIconContainer}>
            <Image source={require('../../assets/icons/weather/partlyCloudy.png')} style={{marginLeft: 45, height: 80, width:80, resizeMode:'contain'}}/>
          </View>

          <View style={styles.tempInfoContainer}>
            <Text style={{fontSize: 36, color: '#55BBDD', }}>{this.state.today.temp}°</Text>
            <Text style={{fontSize: 20, color: '#55BBDD', }}>H: {this.state.today.high}°</Text>
            <Text style={{fontSize: 20, color: '#55BBDD', }}>L: {this.state.today.low}°</Text>
          </View>
        </View>
        {(this.state.days.map(day =>
          this.forecastDayFactory(day)
        ))}

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
