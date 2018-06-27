import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import RoundButton from '../ui-elements/round-button.js';
import NavBar from '../ui-elements/nav-bar';

export default class RegistrationModal extends Component {

  constructor() {
    super();

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      age: '',
    }
  }

  static propTypes = {
    dismiss: PropTypes.func
  }

  componentDidMount() {

  }

  enterOnPress(){


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

      <View style={styles.container}>
        <NavBar leftButton={<Image source={require('../../assets/icons/close.png')} style={{height:20, width:20, tintColor: 'white'}}/>}
                leftOnPress={this.props.dismiss}
                title={<Text style={{color: 'white', fontSize: 24, fontFamily: 'roboto-bold'}}>Registration</Text>}
                style={styles.navBarStyle}
        />

        <ScrollView>
          <View style={{height:32}}/>
          {this.fieldFactory('First Name', this.state.firstName, (text) => this.setState({firstName: text}))}
          {this.fieldFactory('Last Name', this.state.lastName, (text) => this.setState({lastName: text}))}
          {this.fieldFactory('Email', this.state.email, (text) => this.setState({email: text}))}
          {this.fieldFactory('Phone Number', this.state.phone, (text) => this.setState({phone: text}))}
          {this.fieldFactory('Age', this.state.age, (text) => this.setState({age: text}))}

        <View style={styles.bottomView}>
          <TouchableOpacity onPress={this.props.dismiss} style={{marginLeft:32,marginRight:32,marginTop:16,height:64,borderRadius:8,backgroundColor:'#a260a9',justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize: 24, fontFamily:'roboto-bold', color:'white', textAlign:'center'}}>ENTER</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fieldContainer: {
    marginLeft: 32, marginRight: 32, marginBottom: 32,
    height: 64, justifyContent: 'center',
    borderBottomColor: '#55BBDD', borderBottomWidth: 2
  },
  bottomView: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    marginBottom: 20
  },
  navBarStyle: {
    backgroundColor: '#55BBDD',
    height: 25
  },
  field: {
    color: 'black', fontSize: 24, fontFamily: 'roboto-bold'
  },
})
