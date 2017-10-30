import React from 'react';
import { View, Scroll, Text, Image, StyleSheet } from 'react-native';

const Menu = (props) => {

  render() {
    return (
      <View style={styles.container} >

      </View>
    )
  }
}

Menu.propTypes = {
  currentScreenIndex: React.PropTypes.number.isRequired,
  pushScreen: React.PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green'
  }
})


export default Menu;
