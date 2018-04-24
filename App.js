import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
// import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// var OneSignal = require('react-native-onesignal').OneSignal;
// import * as NavActions from './src/action-types/navigation-action-types';

import { Permissions, Notifications } from 'expo';
import store from './src/navigation/store';
import MainReducer from './src/reducers/main-reducer.js';
import AppNavigatorWithState from './src/navigation/navigator.js';
// import {
//   createReduxBoundAddListener,
//   createReactNavigationReduxMiddleware,
// } from 'react-navigation-redux-helpers';
import { Font } from 'expo';
import axios from 'axios';

//change
class App extends Component {

  // reduxMiddleware = createReactNavigationReduxMiddleware(
  //   'root',
  //   (state) => state.nav,
  // );
  //
  // addListener = createReduxBoundAddListener('root');
  //
  // middleWare = applyMiddleware(thunk, this.reduxMiddleware);

  // store = createStore(MainReducer, this.middleWare);

  // const addListener = createReduxBoundAddListener('root');

  constructor() {
    super();

    this.state = {
      fontLoaded: false
    }
  }

  store = createStore(MainReducer, applyMiddleware(thunk));

  async componentDidMount() {
    console.disableYellowBox = true;

    await Font.loadAsync({
      'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
      'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
    });
    await this.registerForPushNotificationsAsync();

    this.setState({ fontLoaded: true });
  }

  registerForPushNotificationsAsync = async() => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    if(existingStatus === 'granted') {
      return;
    }
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }


    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      this.setState({ fontLoaded: true });
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    let data = {
      'token': token
    }

    // POST the token to your backend server from where you can retrieve it to send push notifications.

    axios.post('https://racebaseapi.herokuapp.com/api/send-token', data).then((response) => {
      let status = response.data;
      console.log(status);
    }).catch((e) => {
      console.log(e);
    });


    this._notificationSubscription = Notifications.addListener(this._handleNotification);

  }

  _handleNotification = (notification) => {
    this.setState({notification: notification}, () => {
      console.log(notification, 'yup');
    });
  };

  render() {
    // debugger;
    // console.log(store);
    if(this.state.fontLoaded) {
      return (

        <Provider store={this.store} >
          <AppNavigatorWithState />
        </Provider>

      );
    } else {
      return (
        <View style={styles.container}></View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// export class Root extends Component {
//
//   render() {
//     return(
//       <Provider store={}>
//       </Provider>
//     )
//   }
// }

var mapStateToProps = state => {
  // debugger;
  return {
    bruh: state
  }
}

export default App;
