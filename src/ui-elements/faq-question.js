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



const FaqQuestion = (props) => (

  <TouchableOpacity style={styles.container} >

    <View style={styles.questionContainer}>
      <Text style={{fontSize: 18, color: 'gray', paddingTop: 15, paddingBottom: 15}}>When is Bloomsday?</Text>
    </View>

    <View style={styles.arrowContainer}>
      <Image source={require('../../assets/icons/bars.png')} style={styles.arrow}/>
    </View>

  </TouchableOpacity>
);


FaqQuestion.propTypes = {

};

FaqQuestion.defaultProps = {
  
};

const styles = StyleSheet.create({
container:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  questionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20
  },

  arrowContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',

  },
  arrow: {
    height: 20,
    width: 20,
    marginRight: 20,
    tintColor: 'blue'
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


export default FaqQuestion;
