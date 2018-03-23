import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// import * as NavActions from './src/action-types/navigation-action-types';

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
    console.disableYellowBox = true;
    await Font.loadAsync({
      'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
      'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
    });
    this.setState({ fontLoaded: true });
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
