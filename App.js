import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// import * as NavActions from './src/action-types/navigation-action-types';

import { Permissions, Notifications } from 'expo';

import MainReducer from './src/reducers/main-reducer.js';
import AppNavigatorWithState from './src/navigation/navigator.js';

import { Font } from 'expo';

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
    this.setState({ fontLoaded: true });
    // await this.registerForPushNotifications();
  }

  async registerForPushNotifications() {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

  if (status !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      return;
    }
  }
  const token = await Notifications.getExpoPushTokenAsync();

  this.subscription = Notifications.addListener(this.handleNotification);

  this.setState({
    token,
  }, () => {
    this.sendPushNotification();
  });
  }

  sendPushNotification(token = this.state.token, title = 'bruh', body = 'its liiiiiit') {
  return fetch('https://exp.host/--/api/v2/push/send', {
    body: JSON.stringify({
      to: token,
      title: title,
      body: body,
      data: { message: `${title} - ${body}` },
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
}

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
