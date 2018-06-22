import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';

export default class RegistrationModal extends Component {

  constructor() {
    super();

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    }
  }

  static propTypes = {
    dismiss: PropTypes.func
  }

  componentDidMount() {

  }

  fieldFactory(placeholder, text, updateState, keyboard = 'default') {
    return (
      <View style={styles.fieldContainer} >
        <TextInput
          selectionColor={'blue'} autoCorrect={false}
          style={styles.field}
          placeholder={placeholder}
          onChangeText={(text) => updateState(text)}
          value={text}
          keyboardType={keyboard || 'default'}
          returnKeyType={'done'}
        />
      </View>
    )
  }

  render() {
    return(

      <View style={styles.container} >
        <Text>bruuuuh</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  fieldContainer: {
    marginLeft: 32, marginRight: 32, marginBottom: 32,
    height: 64, justifyContent: 'center',
    borderBottomColor: 'yellow', borderBottomWidth: 2
  },
  field: {
    color: 'green', fontSize: 24, fontFamily: 'roboto-bold'
  },
})
