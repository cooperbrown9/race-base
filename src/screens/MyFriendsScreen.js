import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import NavBar from '../ui-elements/nav-bar';

import * as FriendActions from '../action-types/friend-action-types';
import * as API from '../api/api';

class MyFriendsScreen extends Component {

  constructor() {
    super();
    this.state = {
      friends: [{name:'', bib:''}]
    }
  }

  static propTypes = {
    dismiss: PropTypes.func
  }

  componentDidMount() {
    this.setState({ friends: this.props.myFriends });
  }

  deleteUser = (unfollow) => {
    // debugger;
    var data = {
      "userID": this.props.me._id,
      "unfollowID": unfollow._id
    }

    API.unfollowUser(data, (err, user) => {
      if(err) {
        console.log('Couldnt unfollow user');
      } else {
        let friends = this.state.friends.filter(f => f._id !== unfollow._id);
        this.setState({ friends: friends });
        this.props.dispatch({ type: FriendActions.SET_FRIENDS, friends: friends });
      }
    })
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
              <Text style={styles.name}>{friend.name}</Text>
              <Text style={styles.bib}>{friend.bib}</Text>
              <TouchableOpacity onPress={() => this.deleteUser(friend)} style={{position: 'absolute', top: 30, bottom: 30, right: 32, height: 40, borderRadius:16, justifyContent:'center'}}>
                <Text style={styles.addText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))) : null}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContainer: {
    flex: 1, marginTop: 16
  },
  friendContainer: {
    height: 84, marginLeft: 16, marginRight: 16, marginBottom: 16,
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
  name: {
    fontFamily: 'roboto-bold', color: 'black',
    fontSize: 24, marginLeft: 32, marginBottom: 8
  },
  bib: {
    fontFamily: 'roboto-regular', color: 'grey',
    fontSize: 18, marginLeft: 32, marginBottom: 8
  },
  navBarStyle: {
    backgroundColor: '#55BBDD'
  },
});

var mapStateToProps = state => {
  console.log(state.friend.friends);
  return {
    me: state.user.user,
    myFriends: state.friend.friends
  }
}

export default connect(mapStateToProps)(MyFriendsScreen);
