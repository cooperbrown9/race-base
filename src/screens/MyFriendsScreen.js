import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, AsyncStorage, Modal } from 'react-native';
import { connect } from 'react-redux';

import NavBar from '../ui-elements/nav-bar';
import FindFriends from './FindFriends';

import * as FriendActions from '../action-types/friend-action-types';
import * as API from '../api/api';

class MyFriendsScreen extends Component {

  constructor() {
    super();
    this.state = {
      friends: [{name:'', bib:''}],
      findFriendsPresented: false
    }
  }

  static propTypes = {
    dismiss: PropTypes.func
  }

  componentDidMount() {
    this.setState({ friends: this.props.myFriends });
  }

  deleteUser = async(unfollow) => {
    let following = await AsyncStorage.getItem('FOLLOWING');
    following = JSON.parse(following);

    for(let i = 0; i < following.length; i++) {
      if(following[i].runNumber === unfollow.runNumber) {
        following.splice(i, 1);
        break;
      }
    }
    this.props.dispatch({ type: FriendActions.SET_FRIENDS, friends: following });
    this.setState({ friends: this.props.myFriends })
    following = JSON.stringify(following);
    await AsyncStorage.setItem('FOLLOWING', following);
  }

  render() {
    return(
      <View style={styles.container} >
        <NavBar leftButton={<Image source={require('../../assets/icons/close.png')} style={{height:20, width:20, tintColor: 'white'}}/>}
                leftOnPress={this.props.dismiss}
                style={styles.navBarStyle}
        />

      {(this.props.myFriends == null)
        ? <View style={{position:'absolute',left:16,right:16,top:100,height:100}} >
            <Text style={{fontFamily:'roboto-regular',fontSize:18,textAlign:'center'}}>You aren't following any friends! Go to Home Screen to add friends</Text>
          </View>
        : null
      }

      <ScrollView style={styles.scrollContainer} >
          {(this.state.friends != null) ? (this.state.friends.map((friend) => (
            <View style={styles.friendContainer} >
              <Text style={styles.name}>{friend.runFirstName} {friend.runLastName}</Text>
              <Text style={styles.bib}>#{friend.runNumber}  Age: {friend.runAge}</Text>
              <Text style={styles.city}>{friend.runCity}</Text>
              <TouchableOpacity onPress={() => this.deleteUser(friend)} style={{position: 'absolute', bottom: 12, right: 12, height: 40, borderRadius:16, justifyContent:'center'}}>
                <Text style={styles.addText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))) : null}
        </ScrollView>

        <TouchableOpacity style={styles.submitButton} onPress={() => this.setState({ findFriendsPresented: true })} >
          <Text style={styles.signupText}>FIND FRIENDS</Text>
        </TouchableOpacity>

        <Modal animationType={"slide"} transparent={false} visible={this.state.findFriendsPresented}>
          <FindFriends dismiss={() => this.setState({ findFriendsPresented: false })} />
        </Modal>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  submitButton: {
    position: 'absolute', zIndex: 10001,
    backgroundColor: '#55BBDD', borderRadius: 8,
    height: 64, bottom: 32, left: 32, right: 32,
    justifyContent: 'center',
  },
  signupText: {
    color: 'white', backgroundColor: 'transparent',
    fontFamily: 'roboto-bold', fontSize: 24,
    textAlign: 'center'
  },
  scrollContainer: {
    flex: 1, marginTop: 16
  },
  friendContainer: {
    height: 120, marginLeft: 16, marginRight: 16, marginBottom: 16,
    borderRadius: 8, backgroundColor: '#e0dfde',
    justifyContent: 'center'
  },
  addText: {
    fontFamily: 'roboto-bold',
    fontSize: 22,
    borderWidth:2, borderRadius:8,
    width: 100,
    height: 32,
    borderColor:'red', backgroundColor: 'red',
    color: 'white',
    textAlign: 'center',
    overflow: 'hidden'
  },
  city: {
    fontFamily: 'roboto-bold', color: 'grey',
    fontSize: 16, marginLeft: 16, marginTop: 16
  },
  name: {
    position: 'absolute', top: 8, left: 8,
    fontFamily: 'roboto-bold', color: 'black',
    fontSize: 24, height: 24
  },
  bib: {
    fontFamily: 'roboto-bold', color: 'grey',
    fontSize: 16, marginLeft: 12, marginBottom: 8,
    marginTop: 16
  },
  navBarStyle: {
    backgroundColor: '#55BBDD'
  },
});

var mapStateToProps = state => {
  return {
    me: state.user.user,
    myFriends: state.friend.friends
  }
}

export default connect(mapStateToProps)(MyFriendsScreen);
