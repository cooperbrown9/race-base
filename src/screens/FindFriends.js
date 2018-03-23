import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';

import { connect } from 'react-redux';

import * as API from '../api/api';
import * as UserActions from '../action-types/user-action-types';
import * as Colors from '../style/colors';

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
                  <TouchableOpacity onPress={() => this.addUser(user)} style={{position: 'absolute', top: 30, bottom: 30, right: 32, height: 40}}>
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
    fontFamily: 'roboto-regular',
    fontSize: 24,
    borderWidth:2, borderRadius:4,
    width: 64,
    height: 32,
    borderColor:Colors.BLUE, backgroundColor: Colors.BLUE,
    color: 'white',
    textAlign: 'center'
  },
  search: {
    flex: 1,
    borderBottomColor: Colors.BLUE, borderBottomWidth: 2,
    color: 'black', fontFamily: 'roboto-regular',
    backgroundColor: 'transparent', fontSize: 24,
    height: 64
  },
  userContainer: {
    height: 84, marginLeft: 8, marginRight: 8
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
    backgroundColor: '#F4C81B', borderRadius: 8,
    height: 48, marginBottom: 16, justifyContent: 'center'
  },
  closeText: {
    color: 'white', backgroundColor: 'transparent',
    fontFamily: 'roboto-bold', fontSize: 18,
    textAlign: 'center'
  },
});

var mapStateToProps = state => {
  return {
    userID: state.user.userID,
    user: state.user.user
  }
}

export default connect(mapStateToProps)(FindFriends);
