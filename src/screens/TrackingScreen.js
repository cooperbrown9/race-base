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
import { Course } from '../../assets/bloomsday-path.js';


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
            latitude: 47.38254,
            longitude: -117.362804,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
        <MapView.Polyline coordinates={Course} strokeWidth={1} />
          <NavBar leftButton={<Image source={require('../../assets/icons/bars.png')} style={{height: 20, width: 20, tintColor: 'white'}}/>}
                  rightButton={<Image source={require('../../assets/icons/profile.png')} style={{height: 22, width: 22, tintColor: 'white'}}/>}
                  title={<TouchableOpacity onPress={this.dropDownMenu.bind(this)}>
                          <Text style={{color:'white', fontSize: 16}}>Tracking ⌄</Text>
                         </TouchableOpacity>}
          />
      </MapView>
      <View style={styles.tabbar}>
        <View style={{backgroundColor: 'orange', flex: 2, justifyContent: 'center', alignItems: 'flex-start'}}>
          <Text style={styles.name}>Dave Davidson</Text>
        </View>
        <View style={{backgroundColor: 'white', flex: 3, flexDirection: 'row'}}>
          <View style={{flex: 1, backgroundColor: 'white'}}></View>
          <View style={{backgroundColor: 'gray', width: 1}}></View>
          <View style={{flex: 1, backgroundColor: 'white'}}></View>
        </View>
      </View>

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
    bottom: 0,
    zIndex: 0
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  tabbar: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 16,
    backgroundColor: 'orange',
    height: 100,
    zIndex: 2
  },
   name: {
     color: 'white',
     fontSize: 17,
     paddingLeft: 16

   },
});
