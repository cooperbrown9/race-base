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



const FAQItem = (props) => (

  <TouchableOpacity style={styles.container} onPress={props.action}>

    <View style={styles.questionContainer}>
      <Text style={{fontSize: 16, color: 'gray', paddingTop: 15, paddingBottom: 15}}>{props.question}</Text>
      <Text style={props.isOpen ? styles.open : styles.closed}>{props.answer}</Text>
    </View>

    <View style={styles.arrowContainer}>
      {props.isOpen ? <Image source={require('../../assets/icons/up-arrow.png')} style={styles.arrow}/> : <Image source={require('../../assets/icons/down-arrow.png')} style={styles.arrow}/>}

    </View>

  </TouchableOpacity>
);


FAQItem.propTypes = {
  isOpen: React.PropTypes.bool,
  action: React.PropTypes.func,
  question: React.PropTypes.string,
  answer: React.PropTypes.string
};

FAQItem.defaultProps = {
  isOpen: false,
  question: 'What is the meaning of life?',
  answer: 'pi'

};

const styles = StyleSheet.create({
container:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginRight: 14,
    marginLeft: 14,
    marginTop: 14,
  },
  questionContainer: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginLeft: 20
  },
  open: {
    fontSize: 14,
    color: 'gray',
    paddingBottom: 15,
  },
  closed: {
    height: 0
  },
  arrowContainer: {
    flex: 1,
    justifyContent: 'flex-start',
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

});


export default FAQItem;
