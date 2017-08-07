import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

class HomeScreen extends React.Component {

  render() {
    return (
      <View style={styles.container} >
        <Text style={{color: 'black'}}>Yuuuuuj</Text>
      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green'
  }
});

var mapStateToProps = state => {
  debugger;
  return {
    nav: state.nav
  }
}

export default connect(mapStateToProps)(HomeScreen);
