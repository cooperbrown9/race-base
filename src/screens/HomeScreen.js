import React from 'react';
import { View,
         Text,
         Image,
         StyleSheet,
         TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import NavBar from '../ui-elements/nav-bar.js';

class HomeScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  _register = () =>{
    console.log("REgister");
  }

  render() {
    return (
      <View style={styles.container} >

      <NavBar leftButton={<Text>bars</Text>}
                rightButton={<Text>profile</Text>}
                title='dashboard'
      />
      <View style={styles.imageContainer}>
        <Image style={styles.backgroundImage} source={require('../../assets/images/bloomsday-dashboard.png')} />
      </View>
      <View style={styles.bottomBar}>
        <View style={styles.dateCountdown}>
          <Text style={{fontSize: 12, color: 'gray', marginBottom: 3, marginTop: 10}}>May 7, 2017</Text>
          <Text style={{fontSize: 20,}}>135 Days</Text>
        </View>
        <View style={{width: 1, backgroundColor: 'blue'}}></View>
        <TouchableOpacity onPress={() => this._register} style={styles.register}>
          <Text style={{fontSize: 24, color: 'blue'}}>REGISTER</Text>
          <Image></Image>
        </TouchableOpacity>
      </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  bottomBar: {
    height: 75,
    flexDirection: 'row'

  },
  register: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dateCountdown: {

    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center'
  },
  backgroundImage: {
     flex: 1,
     resizeMode: 'cover',
     alignItems: 'center'
  },
});

var mapStateToProps = state => {
  return {
    nav: state.nav
  }
}

export default connect(mapStateToProps)(HomeScreen);
