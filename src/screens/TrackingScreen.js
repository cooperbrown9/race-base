import React from 'react';
import { View,
         Text,
         Image,
         StyleSheet,
         TouchableOpacity,
         ScrollView
} from 'react-native';
import { MapView } from 'expo';
import NavBar from '../ui-elements/nav-bar.js';


export default class App extends React.Component {

  static navigationOptions = {
    header: null,
  };

  dropDownMenu(){
    console.log("Drop Down Accessed");
  }


  render() {
    return (
      <View style={{backgroundColor:'transparent', flex: 1}}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 51.38254,
            longitude: -2.362804,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <NavBar leftButton={<Image source={require('../../assets/icons/bars.png')} style={{height: 20, width: 20, tintColor: 'white'}}/>}
                  rightButton={<Image source={require('../../assets/icons/profile.png')} style={{height: 22, width: 22, tintColor: 'white'}}/>}
                  title={<TouchableOpacity onPress={this.dropDownMenu.bind(this)}>
                          <Text style={{color:'white', fontSize: 16}}>Tracking ⌄</Text>
                         </TouchableOpacity>}
          />
      </MapView>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  }
});
