import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import * as API from '../api/api';

class CreateUserForm extends Component {

  static navigationOptions = {
    header: null
  }

  state = {
    name: "",
    bib: ""
  }

  constructor() {
    super();
  }

  componentDidMount() {

  }

  createUser() {
    let data = {
      name: this.state.name,
      bib: this.state.bib
    }
    API.createUser(data, (err, user) => {
      if(err) {
        console.log(err);
        this.props.dismiss(() => {
          Alert.alert('Couldnt create user!');
        });
      } else {
        console.log(user);
        AsyncStorage.setItem('USER_ID', user._id, () => {
          this.props.dismiss(() => {});
        })
      }
    });
  }

  render() {
    return(
      <View style={styles.container} >
        <View style={{flex: 1}}>
          <Text style={styles.headerText} >Create Account</Text>
        </View>
        <View style={styles.formView} >
          <Text style={styles.formHeader}>Name</Text>
          <TextInput onChangeText={(text) => this.setState({ name: text })} style={styles.formField} placeholder='Jane' />

          <Text style={styles.formHeader}>Bib #</Text>
          <TextInput onChangeText={(text) => this.setState({ bib: text })} style={styles.formField} placeholder='12345'/>
        </View>

        <View style={styles.submitContainer} >
          <TouchableOpacity onPress={() => this.createUser()} style={styles.submitButton} >
            <Text style={styles.signupText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>


      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey'
  },
  submitContainer: {
    flex: 1, marginLeft: 64, marginRight: 64
  },
  submitButton: {
    marginTop: 32,
    backgroundColor: '#F4C81B', borderRadius: 8,
    height: 40
  },
  signupText: {
    color: 'black',
    fontFamily: 'roboto-regular', fontSize: 18,
    textAlign: 'center'
  },
  headerText: {
    backgroundColor: 'grey',
    fontFamily: 'roboto-regular', fontSize: 32, marginTop: 32,
    textAlign: 'center', color: 'white'
  },
  formView: {
    flex: 2, backgroundColor: 'grey'
  },
  formHeader: {
    fontFamily: 'roboto-regular', fontSize: 32,
    marginLeft: 64, marginBottom: 16, color: 'white'
  },
  formField: {
    fontFamily: 'roboto-regular', fontSize: 24,
    marginLeft: 64, marginRight: 64, marginBottom: 64, height: 64,
    borderBottomColor: 'black', color: 'white',
    borderBottomWidth: 2
  }
});

export default CreateUserForm;
