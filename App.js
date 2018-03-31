import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// var OneSignal = require('react-native-onesignal').OneSignal;
// import * as NavActions from './src/action-types/navigation-action-types';

import { Permissions, Notifications } from 'expo';

import MainReducer from './src/reducers/main-reducer.js';
import AppNavigatorWithState from './src/navigation/navigator.js';

import { Font } from 'expo';
import axios from 'axios';

import thunk from 'redux-thunk';
//change
class App extends React.Component {

  constructor() {
    super();

    this.state = {
      fontLoaded: false
    }
  }

  store = createStore(MainReducer, applyMiddleware(thunk));

  async componentDidMount() {


    // DeviceEventEmitter.addListener('pushReceived', (e: Event) => {
    //   console.warn('pushReceived: ' + JSON.stringify(e));
    // })
    console.disableYellowBox = true;
    await Font.loadAsync({
      'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
      'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
    });
    // this.register();
    await this.registerForPushNotificationsAsync();
    this.setState({ fontLoaded: true });
    // await this.registerForPushNotifications();
  }

  registerForPushNotificationsAsync = async() => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

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
    // return fetch(PUSH_ENDPOINT, {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     token: {
    //       value: token,
    //     },
    //     user: {
    //       username: 'Brent',
    //     },
    //   }),
    // });
  }

  _handleNotification = (notification) => {
    this.setState({notification: notification}, () => {
      console.log(notification, 'yup');
    });
  };

  register() {
    OneSignal.checkPermissions((permissions) => {
      console.log(permissions);
    });

    var permissions = {
      alert: true,
      badge: true,
      sound: true
    }

    OneSignal.requestPermissions(permissions);
    OneSignal.registerForPushNotifications();
  }

//   async registerForPushNotifications() {
//     const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
//
//   if (status !== 'granted') {
//     const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//     if (status !== 'granted') {
//       return;
//     }
//   }
//   const token = await Notifications.getExpoPushTokenAsync();
//
//   this.subscription = Notifications.addListener(this.handleNotification);
//
//   this.setState({
//     token,
//   }, () => {
//     this.sendPushNotification();
//   });
//   }
//
//   sendPushNotification(token = this.state.token, title = 'bruh', body = 'its liiiiiit') {
//   return fetch('https://exp.host/--/api/v2/push/send', {
//     body: JSON.stringify({
//       to: token,
//       title: title,
//       body: body,
//       data: { message: `${title} - ${body}` },
//     }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     method: 'POST',
//   });
// }

  // checkUser = async() => {
  //   let userID = await AsyncStorage.getItem('USER_ID');
  //   if(userID == null) {
  //     this.store.dispatch({ type: NavActions.START_CREATE_ACCOUNT });
  //   }
  // }

  render() {

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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
