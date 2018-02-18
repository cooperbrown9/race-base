import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, AsyncStorage, Modal } from 'react-native';
import { connect } from 'react-redux';

import * as API from '../api/api';
import * as UserActions from '../action-types/user-action-types';

import FindFriends from './FindFriends';

class CreateUserForm extends Component {

  static navigationOptions = {
    header: null
  }

  state = {
    name: "",
    bib: "",
    findFriendsPresented: false
  }

  static propTypes = {
    dismiss: PropTypes.func
  }

  constructor() {
    super();
  }

  componentWillMount() {
    this.setState({ name: this.props.user.name, bib: this.props.user.bib });
  }

  componentDidMount() {

  }

  checkUser() {
    if(this.state.name === this.props.user.name && this.state.bib === this.props.user.bib) {
      this.props.dismiss();
      return;
    }

    let data = {
      userID: this.props.userID,
      name: this.state.name,
      bib: this.state.bib
    }

    if(this.props.userID) {
      this.updateUser(data);
    } else {
      this.createUser(data);
    }
  }

  createUser = (data) => {
    API.createUser(data, (err, user) => {
      if(err) {
        console.log(err);
      } else {
        let userID = user._id;
        API.getUser(userID, (e, newUser) => {
          if(e) {
            console.log(e);
          } else {
            this.props.dispatch({ type: UserActions.SET_USER, user: newUser })
            AsyncStorage.setItem('USER_ID', newUser._id, () => {
              this.props.dismiss();
            });
          }
        })
      }
    });
  }

  updateUser = (data) => {

    API.updateUser(data, (e1, user) => {
      if(e1) {
        console.log(e1);
        this.props.dismiss();
      } else {
        API.getUser(user._id, (e, newUser) => {
          if(e) {
            console.log(e);
          } else {
            this.props.dispatch({ type: UserActions.SET_USER, user: newUser });
            AsyncStorage.setItem('USER_ID', newUser._id, () => {
              this.props.dismiss();
            })
          }
        })
      }
    });
  }

  render() {
    return(
      <View style={styles.container} >
        <View style={{flex: 1}}>
          <Text style={styles.headerText} >Profile</Text>
        </View>

        <View style={styles.formView} >
          <Text style={styles.formHeader}>Name</Text>
          <TextInput
            onChangeText={(text) => this.setState({ name: text })}
            style={styles.formField}
            placeholder='Jane'
            value={this.state.name}
          />

          <Text style={styles.formHeader}>Bib #</Text>
          <TextInput
            onChangeText={(text) => this.setState({ bib: text })}
            style={styles.formField}
            placeholder='12345'
            value={this.state.bib}
          />
        </View>

        <View style={styles.submitContainer} >
          <TouchableOpacity onPress={() => this.checkUser()} style={styles.submitButton} >
            <Text style={styles.signupText}>SIGN UP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton} onPress={() => this.setState({ findFriendsPresented: true })} >
            <Text style={styles.signupText}>FIND FRIENDS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton} onPress={this.props.dismiss} >
            <Text style={styles.signupText}>CANCEL</Text>
          </TouchableOpacity>
        </View>

        <Modal animationType={"slide"} transparent={false} visible={this.state.findFriendsPresented}>
          <FindFriends dismiss={() => this.setState({ findFriendsPresented: false })} />
        </Modal>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  submitContainer: {
    flex: 1, marginTop: 32, marginLeft: 64, marginRight: 64, marginBottom: 64
  },
  submitButton: {
    backgroundColor: '#F4C81B', borderRadius: 8,
    height: 48, marginBottom: 16, justifyContent: 'center'
  },
  signupText: {
    color: 'black', backgroundColor: 'transparent',
    fontFamily: 'roboto-regular', fontSize: 18,
    textAlign: 'center'
  },
  headerText: {
    backgroundColor: 'transparent',
    fontFamily: 'roboto-regular', fontSize: 32, marginTop: 64,
    textAlign: 'center', color: 'black'
  },
  formView: {
    flex: 2, backgroundColor: 'transparent'
  },
  formHeader: {
    fontFamily: 'roboto-regular', fontSize: 32,
    marginLeft: 64, marginBottom: 16, color: 'white'
  },
  formField: {
    fontFamily: 'roboto-regular', fontSize: 24,
    marginLeft: 64, marginRight: 64, marginBottom: 64, height: 64,
    borderBottomColor: 'black', color: 'black',
    borderBottomWidth: 2
  }
});

var mapStateToProps = state => {
  return {
    userID: state.user.userID,
    user: state.user.user
  }
}

export default connect(mapStateToProps)(CreateUserForm);
