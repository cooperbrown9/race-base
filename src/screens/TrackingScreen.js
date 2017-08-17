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
        <View  style={styles.navBar}>
          <NavBar leftButton={<Image source={require('../../assets/icons/bars.png')} style={{height: 20, width: 20, tintColor: 'white'}}/>}
                  rightButton={<Image source={require('../../assets/icons/profile.png')} style={{height: 22, width: 22, tintColor: 'white'}}/>}
                  title={<TouchableOpacity onPress={this.dropDownMenu.bind(this)}>
                          <Text style={{color:'white', fontSize: 16}}>Tracking ⌄</Text>
                         </TouchableOpacity>}
          />
        </View>
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

      </MapView>
      <View style={styles.runnerInfoBar}>

        <View style={{backgroundColor: '#F4C81B', flex: 2, justifyContent: 'center', alignItems: 'flex-start'}}>
          <Text style={styles.name}>Dave Davidson</Text>
        </View>

        <View style={{backgroundColor: 'white', flex: 3, flexDirection: 'row'}}>

          <View style={{flex: 1, backgroundColor: 'white', flexDirection: 'row'}}>

            <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-end', paddingBottom: 4}}>
              <Image source={require('../../assets/icons/meter.png')} style={{height: 26, width: 26, tintColor: '#55BBDD'}}/>
            </View>

            <View style={{flex:3, paddingLeft: 14, justifyContent: 'center'}}>
              <Text style={{color: 'black', fontSize: 14, paddingTop: 4}}>6:32</Text>
              <Text style={{color: 'gray', fontSize: 11}}>MILE PACE</Text>
            </View>

          </View>

          <View style={{backgroundColor: 'gray', width: 2, opacity: 0.2}}></View>

          <View style={{flex: 1, backgroundColor: 'white', flexDirection: 'row'}}>

              <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-end', paddingBottom: 4}}>
                <Image source={require('../../assets/icons/pin.png')} style={{height: 24, width: 24, tintColor: '#55BBDD'}}/>
              </View>

              <View style={{flex:3, paddingLeft: 14, justifyContent: 'center'}}>
                <Text style={{color: 'black', fontSize: 14, paddingTop: 4}}>1.2 mi</Text>
                <Text style={{color: 'gray', fontSize: 11}}>DISTANCE</Text>
              </View>

          </View>

        </View>
      </View>
      <View style={styles.bottomBar}>
        <View style={{flex:1, flexDirection: 'row', }}>
          <TouchableOpacity style={{flex:1, justifyContent: 'center', alignItems: 'flex-start' }}>
            <Image source={require('../../assets/icons/pointer.png')} style={{height: 26, width: 26, tintColor: '#55BBDD',  marginLeft: 20}}/>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:1, justifyContent: 'center', alignItems: 'flex-end' }}>
            <Image source={require('../../assets/icons/information.png')} style={{height: 26, width: 26, tintColor: '#55BBDD', marginRight: 20}}/>
          </TouchableOpacity>
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
  runnerInfoBar: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 70,
    backgroundColor: '#F4C81B',
    height: 100,
    zIndex: 2,
    shadowColor: '#dbdbdb',
    shadowOffset: {width: 12, height: 12},
    shadowOpacity: 1.0,
    shadowRadius: 8,
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
    backgroundColor: 'white',
    zIndex: 2,

  },
  navBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 64,
    zIndex: 2
  },
   name: {
     color: 'white',
     fontSize: 17,
     paddingLeft: 16

   },
});
