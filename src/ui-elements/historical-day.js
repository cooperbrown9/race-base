import React from 'react';
import { PropTypes } from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import * as Colors from '../style/colors.js'

const HistoricalDay = (props) => (
  <View style={{flexDirection: 'column'}}>
    <View style={styles.date}>
      <Text style={{color: 'white', marginLeft: 25}}>{props.date}</Text>
    </View>
    <View style={styles.forecastDay} >

      <View style={styles.timeContainer}>
        <Text style={{fontSize: 12, color: 'gray', marginBottom: 40, marginLeft: 20}}>9am</Text>
      </View>
        <View style={styles.temp}>
          <Text style={{height: 40, width: 50, fontSize: 30, color: '#55BBDD', marginTop: 10}}>{props.temp1}</Text>
        </View>
        <View style={styles.wind}>
          <View>
            {props.windIcon1}
          </View>
          <View>
            <Text style={{textAlign: 'center', lineHeight: 15, color: '#55BBDD', fontSize: 15}}>{props.wind1 + '\n mph'}</Text>
          </View>
        </View>
        <View style={styles.humidityContainer}>
          <Text style={{fontSize: 15, color: '#55BBDD', textAlign: 'center'}}>{props.humidity1 + ' %'}</Text>
          <Text style={{fontSize: 10, color: '#55BBDD', }}>Humidity</Text>
        </View>
    </View>

    <View style={styles.forecastDay} >
      <View style={styles.timeContainer}>
        <Text style={{fontSize: 12, color: 'gray', marginBottom: 40, marginLeft: 20}}>12pm</Text>
      </View>
        <View style={styles.temp}>
          <Text style={{height: 40, width: 50, fontSize: 30, color: '#55BBDD', marginTop: 10}}>{props.temp2}</Text>
        </View>
        <View style={styles.wind}>
          <View>
            {props.windIcon2}
          </View>
          <View>
            <Text style={{textAlign: 'center', lineHeight: 15, color: '#55BBDD', fontSize: 14}}>{props.wind2 + '\n mph'}</Text>
          </View>
        </View>
        <View style={styles.humidityContainer}>
          <Text style={{fontSize: 15, color: '#55BBDD', textAlign: 'center'}}>{props.humidity2 + ' %'}</Text>
          <Text style={{fontSize: 10, color: '#55BBDD', }}>Humidity</Text>
        </View>
    </View>

    <View style={styles.forecastDay} >
      <View style={styles.timeContainer}>
        <Text style={{fontSize: 12, color: 'gray', marginBottom: 40, marginLeft: 20}}>2pm</Text>
      </View>
        <View style={styles.temp}>
          <Text style={{height: 40, width: 50, fontSize: 30, color: '#55BBDD', marginTop: 10}}>{props.temp3}</Text>
        </View>
        <View style={styles.wind}>
          <View>
            {props.windIcon3}
          </View>
          <View>
            <Text style={{textAlign: 'center', lineHeight: 15, color: '#55BBDD', fontSize: 15}}>{props.wind3 + '\n mph'}</Text>
          </View>
        </View>
        <View style={styles.humidityContainer}>
          <Text style={{fontSize: 15, color: '#55BBDD', textAlign: 'center'}}>{props.humidity3 + ' %'}</Text>
          <Text style={{fontSize: 10, color: '#55BBDD', }}>Humidity</Text>
        </View>
    </View>
  </View>
);


HistoricalDay.propTypes = {
  date: React.PropTypes.string,
  windIcon1: React.PropTypes.element,
  temp1: React.PropTypes.string,
  wind1: React.PropTypes.string,
  humidity1: React.PropTypes.string,
  windIcon2: React.PropTypes.element,
  temp2: React.PropTypes.string,
  wind2: React.PropTypes.string,
  humidity2: React.PropTypes.string,
  windIcon3: React.PropTypes.element,
  temp3: React.PropTypes.string,
  wind3: React.PropTypes.string,
  humidity3: React.PropTypes.string,

};

HistoricalDay.defaultProps = {
  time: '9am',
  date: 'May 6, 2015',
  dayOfMonth: '3',
  windIcon: <Image source={require('../../assets/icons//weather/partlyCloudy.png')} style={{height: 20, width: 35, marginBottom: 5,}}/>,
  temp: '76°',
  wind: '9',
  humidity: '4 %'
};

const styles = StyleSheet.create({
forecastDay:{
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    borderBottomWidth: 1
  },
  wind: {
    flex:1,
    height: 50,
    alignItems: 'center'
  },
  date: {
    height: 20,
    backgroundColor: 'purple'
  },
  timeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  temp: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',


  },
  humidityContainer: {
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


export default HistoricalDay;
