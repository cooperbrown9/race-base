import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import PropTypes from 'prop-types';
import * as Colors from '../style/colors.js'

const ScheduleItem = (props) => (
  <View style={{flexDirection: 'row', height: 140, backgroundColor: 'white', flex:1}}>

    <View style={styles.verticalBarCircle}>
      <View style={{backgroundColor: 'grey', width: 1, flex: 1, alignItems: 'center', justifyContent: 'center', }}>
        <Image source={require('../../assets/icons/solid-circle.png')} style={{height: 40, width: 40, tintColor: '#B7B7B7',}}/>
      </View>
    </View>

    <View style={styles.infoView}>

      <View style={styles.dateTime}>
        <Text style={{fontSize: 10, color: '#B7B7B7'}}>{props.date + ' '}</Text>
        <View style={{backgroundColor: '#B7B7B7', width: 1}}></View>
        <Text style={{fontSize: 10, color: '#B7B7B7'}}>{' ' + props.time}</Text>
      </View>
      <Text>{props.description}</Text>
      <Text style={{color: '#BBBBBB'}}>{props.somethingElse}</Text>

    </View>
  </View>
);


ScheduleItem.propTypes = {
  date: PropTypes.string,
  time: PropTypes.string,
  description: PropTypes.string,
  somethingElse: PropTypes.string,
};

ScheduleItem.defaultProps = {
  date: 'MAY 1',
  time: '9:00am',
  description: 'Lorem ipsum et est cupidatat aute non laboris ex qui consectetur reprehenderit eiusmod incididunt id esse in laborum qui ul',
  somethingElse: 'Something Else',
};

const styles = StyleSheet.create({
  verticalBarCircle: {

    flexDirection: 'column',
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',

  },
  infoView: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 40
  },
  dateTime: {
    flexDirection: 'row',

  },


});


export default ScheduleItem;
