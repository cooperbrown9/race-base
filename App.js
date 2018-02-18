import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
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
    await Font.loadAsync({
      'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf')
    });
    this.setState({ fontLoaded: true });
  }

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
