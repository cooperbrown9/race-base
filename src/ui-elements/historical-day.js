import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import * as Colors from '../style/colors.js';

const { width, height } = Dimensions.get('window');
const HistoricalDay = (props) => (

  <View style={{flexDirection: 'column', height: 150, width: Dimensions.get('window').width, backgroundColor: 'white', borderBottomColor: 'gray', borderBottomWidth: 1 }} >

    <View style={{flex:2, height: 50, backgroundColor: 'purple', justifyContent: 'center', paddingLeft: 20}} >
      <Text style={{fontSize: 20, color: 'white'}}>{props.date}</Text>
    </View>

    <View style={{flex:7, height: 120, backgroundColor: 'white', flexDirection: 'row'}} >

      <View style={{flex:1, backgroundColor: 'white', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontFamily: 'roboto-bold', fontSize: 60, color:'#55BBDD'}}>{props.temp8}</Text>
        <Text style={{fontFamily: 'roboto-bold', color: 'grey', fontSize: 25}}>8am</Text>
      </View>

      <View style={{flex:1, backgroundColor: 'white', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontFamily: 'roboto-bold', fontSize: 60, color:'#55BBDD'}}>{props.temp11}</Text>
        <Text style={{fontFamily: 'roboto-bold', color: 'grey', fontSize: 25}}>11am</Text>
      </View>

      <View style={{flex:1, backgroundColor: 'white', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontFamily: 'roboto-bold', fontSize: 60, color:'#55BBDD'}}>{props.temp2}</Text>
        <Text style={{fontFamily: 'roboto-bold', color: 'grey', fontSize: 25}}>2pm</Text>
      </View>

    </View>
  </View>
);


HistoricalDay.propTypes = {
  date: PropTypes.string,
  temp8: PropTypes.string,
  temp11: PropTypes.string,
  temp2: PropTypes.string,

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

});


export default HistoricalDay;
