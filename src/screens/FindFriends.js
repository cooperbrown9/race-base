import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Image,
  TouchableOpacity, AsyncStorage, Text, TextInput, Alert,
  StyleSheet, KeyboardAvoidingView, ActivityIndicator }
  from 'react-native';

import { connect } from 'react-redux';

import * as API from '../api/api';
import * as UserActions from '../action-types/user-action-types';
import * as FriendActions from '../action-types/friend-action-types';
import * as Colors from '../style/colors';

import axios from 'axios';
import NavBar from '../ui-elements/nav-bar';

class FindFriends extends Component {

  constructor() {
    super();

    this.state = {
      searchText: "",
      users: [],
      loading: false,
      isError: false,
      errorMessage: ''
    }
  }

  static propTypes = {
    dismiss: PropTypes.func,
    dismissWithRunner: PropTypes.func
  }

  componentDidMount() {

  }

  search() {
    this.setState({ loading: true });
    API.searchName(this.state.searchText.toUpperCase(), (err, runners) => {
      if(err) {
        console.log(err);
        this.setState({ loading: false, isError: true, errorMessage:'error searching for users, check network connection!' });
      } else {
        console.log(runners);
        if(runners.length === 0) {
          this.setState({ loading: false, isError: true, errorMessage: 'Did not find any users with this name!' });
        } else {
          this.setState({ loading: false, users: runners, isError: false });
        }
      }
    })
  }

  addUser(userToFollow) {
    this.setState({ loading: true });
    // let dummyURL = 'https://api.chronotrack.com/api/results/37865/bib/2?format=json&client_id=727dae7f&user_id=matt%40ransdellbrown.com&user_pass=cf5d3438ea8d630cb91e3d89fc8e9021cbd00b5f'
    // axios.get(dummyURL)
    axios.get('https://api.chronotrack.com/api/results/37865/bib/' + userToFollow.runNumber + '?format=json&client_id=727dae7f&user_id=matt%40ransdellbrown.com&user_pass=cf5d3438ea8d630cb91e3d89fc8e9021cbd00b5f')
      .then(response => {
        this.setState({ loading: false, users: [], searchText: '' }, () => {
          console.log(response.data);
          if(response.data.error) {
            console.log('This user has not completed the race yet!');
            this.setState({ isError: true, errorMessage: 'This user has not completed the race yet!' });
          } else {
            // dismiss and pass back user
            response.data.name = userToFollow.runFirstName + ' ' + userToFollow.runLastName;
            this.props.dismissWithRunner(response.data);
          }
        })
      })
      .catch(e => {
        console.log(e);
      })
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding' >
        <NavBar leftButton={<Image source={require('../../assets/icons/close.png')} style={{height:20, width:20, tintColor: 'white'}}/>}
                leftOnPress={this.props.dismiss}
                title={<Text style={{ fontFamily: 'roboto-regular', fontSize: 24, color: 'white'}}>Find Friends</Text>}
        />

        <View style={styles.searchContainer} >
          <TextInput
            style={styles.search}
            onChangeText={(text) => this.setState({ searchText: text })}
            placeholder={'Runner\'s Name'}
            keyboardType={'default'}
            returnKeyType={'done'}
          />
      </View>
      {(this.state.isError)
        ? <Text style={{marginTop:0,color:'red',textAlign:'center',fontFamily:'roboto-regular'}}>{this.state.errorMessage}</Text>
        : null
      }


        {(this.state.users.length > 0) ?
          <View style={styles.resultContainer}>
            <ScrollView style={styles.scrollContainer} >
              {(this.state.users.length > 0) ? this.state.users.map((user) => (
                <TouchableOpacity style={styles.userContainer} key={user.bib} >
                  <Text style={styles.name}>{user.runFirstName} {user.runLastName}</Text>
                  <Text style={styles.bib}>{user.runNumber}</Text>
                  <Text style={styles.city}>{user.runCity}</Text>
                  <TouchableOpacity onPress={() => this.addUser(user)} style={{position: 'absolute', top: 40, width: 140,bottom: 4, right: 4, height: 50, borderRadius:8, justifyContent:'center', alignItems:'center'}}>
                    <Text style={styles.addText}>RESULTS</Text>
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
        </View>
        {(this.state.loading)
          ? <View style={{position:'absolute',left:0,right:0,top:0,bottom:0,zIndex:10001,backgroundColor:'rgba(0,0,0,0.5)',justifyContent:'center',alignItems:'center'}} >
              <ActivityIndicator size={'large'} />
            </View>
          : null
        }

      </KeyboardAvoidingView>
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
    height: 40,
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
    height: 100, marginLeft: 8, marginRight: 8, marginBottom: 16,
    borderRadius: 8, backgroundColor: '#e0dfde',
    justifyContent: 'center'
  },
  name: {
    fontFamily: 'roboto-bold', color: 'black',
    fontSize: 24, marginLeft: 16, marginBottom: 8
  },
  bib: {
    fontFamily: 'roboto-regular', color: 'grey',
    fontSize: 18, marginLeft: 16, marginBottom: 4
  },
  city: {
    fontFamily: 'roboto-bold', color: 'grey',
    fontSize: 16, marginLeft: 16, marginTop: 8
  },
  searchContainer: {
    flex: 1, alignItems: 'stretch', flexDirection: 'row',
    marginTop: 16, marginBottom: 32,marginLeft: 32, marginRight: 32, backgroundColor: 'transparent',
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
    marginLeft: 32, marginRight: 32, marginBottom: 16, marginTop: 16
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
