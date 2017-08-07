import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class HomeScreen extends React.Component {

  static propTypes = {
    name: 'butt'
  }

  render() {
    return (
      <View style={styles.container} >
        <Text>Yuuuuuj</Text>
      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  }
});

export default HomeScreen;
