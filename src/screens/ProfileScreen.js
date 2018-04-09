import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, AsyncStorage, Modal } from 'react-native';
import { connect } from 'react-redux';

import * as API from '../api/api';
import * as UserActions from '../action-types/user-action-types';
import * as Colors from '../style/colors';

import FindFriends from './FindFriends';
import NavBar from '../ui-elements/nav-bar';

class ProfileScreen extends Component {

  static navigationOptions = {
    header: null
  }



  static propTypes = {
    dismiss: PropTypes.func
  }

  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      bib: "",
      formChanged: false,
      findFriendsPresented: false
    }
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
        <NavBar leftButton={<Image source={require('../../assets/icons/close.png')} style={{height:20, width:20, tintColor: 'white'}}/>}
                leftOnPress={this.props.dismiss}
                title={<Text style={{ fontFamily: 'roboto-regular', fontSize: 24, color: 'white'}}>Profile</Text>}
        />

        <View style={styles.formView} >
          <Text style={styles.formHeader}>Name</Text>
          <TextInput
            onChangeText={(text) => this.setState({ name: text, formChanged: true })}
            style={styles.formField}
            placeholder='Jane'
            value={this.state.name}
            autoComplete={'none'}
          />



          <Text style={styles.formHeader}>Bib #</Text>
          <TextInput
            onChangeText={(text) => this.setState({ bib: text, formChanged: true })}
            style={styles.formField}
            placeholder='12345'
            value={this.state.bib}
            autoComplete={'none'}
            keyboardType={'numeric'}
          />
        </View>

        <View style={styles.submitContainer} >
          {(!this.props.userID)
            ? <TouchableOpacity onPress={() => this.checkUser()} style={styles.submitButton} >
                <Text style={styles.signupText}>{(this.props.userID) ? 'UPDATE' : 'CREATE ACCOUNT'}</Text>
              </TouchableOpacity>
            : null
          }
          {(this.state.formChanged)
            ? <TouchableOpacity style={styles.submitButton} onPress={() => this.checkUser()} >
                <Text style={styles.signupText}>UPDATE</Text>
              </TouchableOpacity>
            : null
          }
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
    backgroundColor: Colors.CREAM
  },
  submitContainer: {
    flex: 1, marginLeft: 32, marginRight: 32, marginTop: 32
  },
  submitButton: {
    backgroundColor: '#55BBDD', borderRadius: 8,
    height: 64, marginBottom: 16, justifyContent: 'center',
  },
  signupText: {
    color: 'white', backgroundColor: 'transparent',
    fontFamily: 'roboto-bold', fontSize: 24,
    textAlign: 'center'
  },
  headerText: {
    backgroundColor: 'transparent',
    fontFamily: 'roboto-bold', fontSize: 32, marginTop: 64,
    textAlign: 'center', color: 'black'
  },
  formView: {
    flex: 1, backgroundColor: 'transparent',
    justifyContent: 'center'
  },
  formHeader: {
    fontFamily: 'roboto-regular', fontSize: 16,
    marginLeft: 64, marginBottom: 16, color: Colors.DARK_GREY
  },
  formField: {
    fontFamily: 'roboto-bold', fontSize: 24,
    marginLeft: 64, marginRight: 64, marginBottom: 32, height: 40,
    borderBottomColor: Colors.BLUE, color: 'black',
    borderBottomWidth: 2
  }
});

var mapStateToProps = state => {
  return {
    userID: state.user.userID,
    user: state.user.user
  }
}

export default connect(mapStateToProps)(ProfileScreen);
