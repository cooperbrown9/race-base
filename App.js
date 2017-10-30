import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import MainReducer from './src/reducers/main-reducer.js';
import AppNavigatorWithState from './src/navigation/navigator.js';

import thunk from 'redux-thunk';

class App extends React.Component {

  store = createStore(MainReducer, applyMiddleware(thunk));

  render() {

    return (

      <Provider store={this.store} >
        <AppNavigatorWithState />
      </Provider>

    );
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
