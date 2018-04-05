import React from 'react';
import PropTypes from 'prop-types';
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
  currentScreenIndex: PropTypes.number.isRequired,
  pushScreen: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green'
  }
})


export default Menu;
