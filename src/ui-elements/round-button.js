import React from 'react';
import { PropTypes } from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
//import Button from 'react-native-button';
// import Colors from '../colors/colors.js';


const RoundButton = (props) => (
  <TouchableOpacity
    title={props.title}
    onPress={props.onPress}
    style={styles.button}
  >
    <Text style={styles.buttonText}>{props.title}</Text>
  </TouchableOpacity>
);


RoundButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  borderOn: PropTypes.bool,
  textColor: PropTypes.string
};

RoundButton.defaultProps = {
  borderOn: true,
  bgColor: 'transparent',
  textColor: 'white'
};

const styles = StyleSheet.create({
  button: {
          backgroundColor: '#55BBDD',
          height: 54,
          borderRadius: 27,
          borderColor: 'white',
          borderWidth: 2 ,
          marginBottom: 16,
          shadowColor: 'black',
          shadowOffset: {width: 0, height: 8},
          shadowRadius: 8,
          shadowOpacity: 0.2,
          alignItems: 'center'
        },
  buttonText: {
        justifyContent: 'center',
        textAlign: 'center',
        height: 22,
        marginTop: 16,
        fontSize: 16,
        backgroundColor: 'transparent',
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: 2
  }
});

export default RoundButton;
