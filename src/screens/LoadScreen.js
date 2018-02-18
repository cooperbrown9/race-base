import React, { Component } from 'react';
import { View, ActivityIndicator, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import * as UserActions from '../action-types/user-action-types';
import * as NavActions from '../action-types/navigation-action-types';
import * as API from '../api/api';

class LoadScreen extends Component {


  async componentWillMount() {
    await this.login();
  }

  async login() {
    let userID = await AsyncStorage.getItem('USER_ID');
    if(userID != null) {
      API.getUser(userID, (err, user) => {
        if(err) {
          console.log(err);
        } else {
          this.props.dispatch({ type: UserActions.SET_USER, user: user });
          this.props.dispatch({ type: 'START_HOME' });
        }
      })
    } else {
      this.props.dispatch({ type: 'START_HOME' });
    }
  }

  render() {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} >
        <ActivityIndicator size='large'/>
      </View>
    )
  }
}

var mapStateToProps = state => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(LoadScreen);
