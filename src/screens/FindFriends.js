import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Image, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';

import { connect } from 'react-redux';

import * as API from '../api/api';
import * as UserActions from '../action-types/user-action-types';
import * as Colors from '../style/colors';

import NavBar from '../ui-elements/nav-bar';

class FindFriends extends Component {

  constructor() {
    super();

    this.state = {
      searchText: "",
      users: []
    }
  }

  static propTypes = {
    dismiss: PropTypes.func
  }

  componentDidMount() {

  }

  search() {
    API.searchUsers(this.state.searchText, (err, users) => {
      if(err) {
        console.log(err);
      } else {
        // var uniqueArr = users.filter((u) => {
        //   return this.props.friends.indexOf(u) == -1;
        // })
        // var a = [], diff = [];
        //
        //  for (var i = 0; i < this.props.friends.length; i++) {
        //      a[this.props.friends[i]] = true;
        //  }
        //
        //  for (var i = 0; i < users.length; i++) {
        //      if (a[users[i]]) {
        //          delete a[users[i]];
        //      } else {
        //          a[users[i]] = true;
        //      }
        //  }
        //
        //  for (var k in a) {
        //      diff.push(k);
        //  }

         // return diff;
        this.setState({ users: users });
      }
    })
  }

  addUser(userToFollow) {
    let data = {
      "userID": this.props.userID,
      "followID": userToFollow._id
    }

    for(let i = 0; i < this.props.user.following.length; i++) {
      if(this.props.user.following[i].user_id === userToFollow._id) {
        let users = this.state.users.filter(u => u !== userToFollow);
        this.setState({ users: users });
        return;
      }
    }

    API.followUser(data, (err, user) => {
      if(err) {
        console.log(err.message);
        Alert.alert('Sorry, we couldn\'t follow this person at this time!');
      } else {
        let users = this.state.users.filter(u => u !== userToFollow);
        this.setState({ users: users });
        API.getUser(this.props.userID, (e, newUser) => {
          if(e) {
            console.log(e);
          } else {
            this.props.dispatch({ type: UserActions.SET_USER, user: newUser });
          }
        })
      }
    })
  }

  render() {
    return (
      <View style={styles.container} >
        <NavBar leftButton={<Image source={require('../../assets/icons/close.png')} style={{height:20, width:20, tintColor: 'white'}}/>}
                leftOnPress={this.props.dismiss}
                title={<Text style={{ fontFamily: 'roboto-regular', fontSize: 24, color: 'white'}}>Find Friends</Text>}
        />

        <View style={styles.searchContainer} >
          <TextInput
            style={styles.search}
            onChangeText={(text) => this.setState({ searchText: text })}
            placeholder={'BIB #'}
          />
        </View>

        {(this.state.users.length > 0) ?
          <View style={styles.resultContainer}>
            <ScrollView style={styles.scrollContainer} >
              {(this.state.users.length > 0) ? this.state.users.map((user) => (
                <TouchableOpacity style={styles.userContainer} >
                  <Text style={styles.name}>{user.name}</Text>
                  <Text style={styles.bib}>{user.bib}</Text>
                  <TouchableOpacity onPress={() => this.addUser(user)} style={{position: 'absolute', top: 30, bottom: 30, right: 32, height: 40, borderRadius:16, justifyContent:'center'}}>
                    <Text style={styles.addText}>Add</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              )) : null}
            </ScrollView>
          </View>
          : null
        }

        <View style={styles.closeContainer} >
          <TouchableOpacity onPress={() => this.search()} style={styles.closeButton} >
            <Text style={styles.closeText}>SEARCH</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.dismiss} style={styles.closeButton} >
            <Text style={styles.closeText}>CLOSE</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: Colors.CREAM
  },
  addText: {
    fontFamily: 'roboto-bold',
    fontSize: 24,
    borderWidth:2, borderRadius:8,
    width: 64,
    height: 32,
    borderColor:Colors.BLUE, backgroundColor: Colors.BLUE,
    color: 'white',
    textAlign: 'center',
    overflow: 'hidden'
  },
  search: {
    flex: 1,
    borderBottomColor: Colors.BLUE, borderBottomWidth: 2,
    color: 'black', fontFamily: 'roboto-regular',
    backgroundColor: 'transparent', fontSize: 24,
    height: 64
  },
  userContainer: {
    height: 84, marginLeft: 8, marginRight: 8, marginBottom: 16,
    borderRadius: 8, backgroundColor: '#e0dfde',
    justifyContent: 'center'
  },
  name: {
    fontFamily: 'roboto-bold', color: 'black',
    fontSize: 24, marginLeft: 32, marginBottom: 8
  },
  bib: {
    fontFamily: 'roboto-regular', color: 'grey',
    fontSize: 18, marginLeft: 32, marginBottom: 8
  },
  searchContainer: {
    flex: 1, alignItems: 'stretch', flexDirection: 'row',
    marginTop: 32, marginBottom: 32,marginLeft: 32, marginRight: 32, backgroundColor: 'transparent',
    justifyContent: 'center', alignItems: 'center'
  },
  resultContainer: {
    flex: 4,
    marginLeft: 16, marginRight: 16, marginBottom:16,
    backgroundColor: 'transparent'
  },
  scrollContainer: {
    flex: 1
  },
  closeContainer: {
    marginLeft: 32, marginRight: 32, marginBottom: 64, marginTop: 16
  },
  closeButton: {
    backgroundColor: '#55BBDD', borderRadius: 8,
    height: 64, marginBottom: 16, justifyContent: 'center'
  },
  closeText: {
    color: 'white', backgroundColor: 'transparent',
    fontFamily: 'roboto-bold', fontSize: 24,
    textAlign: 'center'
  },
});

var mapStateToProps = state => {
  return {
    userID: state.user.userID,
    user: state.user.user,
    friends: state.friend.friends
  }
}

export default connect(mapStateToProps)(FindFriends);
