import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import * as Colors from '../style/colors.js'

const ForecastDay = (props) => (
  <View style={styles.forecastDay} >

    <View style={styles.dateInfoContainer}>
      <Text style={{fontSize: 24, color: '#55BBDD', marginLeft: 20, fontFamily:'roboto-bold'}}>{ForecastDay.getDayOfWeek(props.date.getDay())}</Text>
      <Text style={{fontSize: 16, marginLeft:10, marginTop:5,  color: '#55BBDD'}}>{ForecastDay.getMonthAndDay(props.date.getMonth(), props.date.getDate())}</Text>
    </View>

    <View style={styles.weatherIconContainer}>
      {props.weatherIcon}
    </View>

    <View style={styles.tempInfoContainer}>
      <Text style={{fontSize: 24, color: '#55BBDD', }}></Text>
      <Text style={{fontSize: 18, color: '#55BBDD', }}>{'H: ' + props.highTemp}°</Text>
      <Text style={{fontSize: 18, color: '#55BBDD', }}>{'L: ' + props.lowTemp}°</Text>
    </View>

  </View>
);

ForecastDay.getDayOfWeek = function(day) {
  switch (day) {
    case 0:
      return 'Sun';
    case 1:
      return 'Mon';
    case 2:
      return 'Tue';
    case 3:
      return 'Wed';
    case 4:
      return 'Thu';
    case 5:
      return 'Fri';
    case 6:
      return 'Sat';
    default:
      return 'Mon';
  }
}

ForecastDay.getMonthAndDay = function(_month, day) {
  let month = '';
  if(_month == 3) {
    month = 'Apr';
  }
  if(_month == 4) {
    month = 'May';
  }
  return month + ' ' + day;
}


ForecastDay.propTypes = {
  dayOfWeek: PropTypes.string,
  month: PropTypes.string,
  dayOfMonth: PropTypes.string,
  weatherIcon: PropTypes.element,
  actualTemp: PropTypes.string,
  highTemp: PropTypes.string,
  lowTemp: PropTypes.string,
  date: PropTypes.object
};

ForecastDay.defaultProps = {
  dayOfWeek: 'TUES',
  month: 'Jul',
  dayOfMonth: '3',
  weatherIcon: <Image source={require('../../assets/icons//weather/partlyCloudy.png')} style={{height: 50, width: 65, marginBottom: 5, marginLeft: 40}}/>,
  actualTemp: '76°',
  highTemp: '89°',
  lowTemp: '72°',
};

const styles = StyleSheet.create({
forecastDay:{
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    borderBottomWidth: 1
  },
  dateInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  weatherIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },
  tempInfoContainer: {
    flex: 1,
    flexDirection: 'column',
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


export default ForecastDay;
