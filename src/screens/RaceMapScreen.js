import React, { Component } from 'react';
import { View,
         Text,
         Image,
         StyleSheet,
         TouchableOpacity,
         ScrollView,
         Dimensions,
         Modal
} from 'react-native';
import NavBar from '../ui-elements/nav-bar.js';
import { courseCoords } from '../../assets/bloomsday-path.js';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Constants, Location, Permissions } from 'expo';

import Menu from './Menu.js';
import SideMenu from 'react-native-side-menu';
import Timer from '../ui-elements/timer.js';


class RaceMapScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      regionSet: false,
      runner: {
        // distance: 0.0,
        seconds: 0,
        // time: "",
        // pace: 0,
        // location: { latitude: 0.0, longitude: 0.0 },
      },
      region: {
        latitude: 47.6588,
        longitude: -117.4260,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      myFriendsPresented: false,
      friends: [{name:'', latitude:0.0, longitude:0.0}],
      runnerDistance: 0,
      runnerSeconds: 0,
      runnerTime: "",
      myLatitude: 0.0,
      myLongitude: 0.0,
      runnerLocation: { latitude: 0, longitude: 0 },
      runnerPace: 12, // minute per miles
      runnerEstDelayedStartTime: 15, // minutes added to 9:00
      userCoords: [],
      distances: [],
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentWillMount () {
    // this.setState({friends: [{name:'',latitude:0.0,longitude:0.0}]});
    // {
      // const START_LATITUDE = 47.6588;
      // const START_LONGITUDE = -117.4260;
      // this.setState({regionSet:true,currentRegion:{latitude:START_LATITUDE,longitude:START_LONGITUDE,latitudeDelta:0.0922,longitudeDelta:0.0421} },()=>this.setState({regionSet:false}));
    // }

  }

  async componentDidMount() {
    // initial getLocation, then next part is the interval of getting locations
    await this.getLocationAsync();
    // this.setState({ friends: this.props.friends });
    setInterval(async() => {
      let location = await Location.getCurrentPositionAsync({});
      this.setState({ myLatitude: location.coords.latitude, myLongitude: location.coords.longitude });
    }, 5000);

    setTimeout(() => {
      const START_LATITUDE = 47.6588;
      const START_LONGITUDE = -117.4260;
      this.setState({regionSet:true,currentRegion:{latitude:START_LATITUDE,longitude:START_LONGITUDE,latitudeDelta:0.0922,longitudeDelta:0.0421} },()=>this.setState({regionSet:false}));
    }, 2000);

  }

  componentWillUnmount() {
    clearInterval(this.getLocationInterval);
    // clearInterval(this.getFriendsInterval);
  }

  getLocationAsync = async() => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if(status !== 'granted') {
      this.setState({ canAccessLocation: false });
      //debugger;
      const getLocPermission = await Permissions.getAsync(Permissions.LOCATION);
    } else {
      this.setState({ canAccessLocation: true });

      let location = await Location.getCurrentPositionAsync({});
      this.setState({ myLatitude: location.coords.latitude, myLongitude: location.coords.longitude });
      // this.setState({ runnerLocation: { lat: location.coords.latitude, lng: location.coords.longitude }, userCoords: [...this.state.userCoords,  { lat: location.coords.latitude, lng: location.coords.longitude} ] });
    }
  }

  toggleMenu = () => {
    console.log('it works fam');
    this.setState({ menuOpen: !this.state.menuOpen }, () => {
      this.props.dispatch({ type: (this.state.menuOpen) ? 'OPEN' : 'CLOSE' });
    })
  }

  render() {
    const { width, height } = Dimensions.get('window');

    const START_LATITUDE = 47.6588;
    const START_LONGITUDE = -117.4260;
    const region = {
      latitude: START_LATITUDE,
      longitude: START_LONGITUDE,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
    return (
      <View style={{backgroundColor:'transparent', flex: 1}}>
        <NavBar leftButton={<Image source={require('../../assets/icons/bars.png')} style={{height: 20, width: 20, tintColor: 'white'}}/>}
                leftOnPress={this.toggleMenu}
                title={<Text style={{color:'white', fontSize: 20, fontFamily: 'roboto-bold'}}>Race Map</Text>}
                style={{position:'absolute'}}
        />
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={(this.state.regionSet) ? this.state.region : null}
          initialRegion={{
            latitude: START_LATITUDE,
            longitude: START_LONGITUDE,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <MapView.Polyline coordinates={courseCoords} strokeWidth={5} strokeColor={'yellow'} />

          <MapView.Marker coordinate={{latitude: 47.662184, longitude: -117.426651}} image={require('../../assets/icons/finish.png')} />

          <MapView.Marker coordinate={{latitude: 47.6588, longitude: -117.4260}} image={require('../../assets/icons/pin.png')} />
          <MapView.Marker coordinate={{latitude: this.state.myLatitude, longitude: this.state.myLongitude }} image={require('../../assets/icons/pin.png')} />
        </MapView>

      <TouchableOpacity onPress={() => this.setState({regionSet:true,currentRegion:{latitude:START_LATITUDE,longitude:START_LONGITUDE,latitudeDelta:0.0922,longitudeDelta:0.0421} },()=>this.setState({regionSet:false}))} style={{position:'absolute', top: 100, right: 16, height: 40, width: 40}}>
        <Image style={{height:40,width:40,tintColor:'white'}} source={require('../../assets/icons/pointer.png')} />
      </TouchableOpacity>


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
    zIndex: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  myFriendsBar: {
    position:'absolute',
    height: 120, left: 16, right: 16, bottom: 16,
    backgroundColor: 'transparent',
    zIndex: 2
  },
  runnerInfoBar: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 0,
    backgroundColor: 'transparent',
    height: 200,
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
     fontSize: 18,
     paddingLeft: 16,
     borderRadius: 4,
     fontFamily: 'roboto-bold'

   },
});

const fdude = {'a':[
{
"elementType":"labels",
"stylers":[
{
  "visibility":"off"
},
{
  "color":"#f49f53"
}
]
},
{
"featureType":"landscape",
"stylers":[
{
  "color":"#f9ddc5"
},
{
  "lightness":-7
}
]
},
{
"featureType":"road",
"stylers":[
{
  "color":"#813033"
},
{
  "lightness":43
}
]
},
{
"featureType":"poi.business",
"stylers":[
{
  "color":"#645c20"
},
{
  "lightness":38
}
]
},
{
"featureType":"water",
"stylers":[
{
  "color":"#1994bf"
},
{
  "saturation":-69
},
{
  "gamma":0.99
},
{
  "lightness":43
}
]
},
{
"featureType":"road.local",
"elementType":"geometry.fill",
"stylers":[
{
  "color":"#f19f53"
},
{
  "weight":1.3
},
{
  "visibility":"on"
},
{
  "lightness":16
}
]
},
{
"featureType":"poi.business"
},
{
"featureType":"poi.park",
"stylers":[
{
  "color":"#645c20"
},
{
  "lightness":39
}
]
},
{
"featureType":"poi.school",
"stylers":[
{
  "color":"#a95521"
},
{
  "lightness":35
}
]
},
{

},
{
"featureType":"poi.medical",
"elementType":"geometry.fill",
"stylers":[
{
  "color":"#813033"
},
{
  "lightness":38
},
{
  "visibility":"off"
}
]
},
{

},
{

},
{

},
{

},
{

},
{

},
{

},
{

},
{

},
{

},
{

},
{
"elementType":"labels"
},
{
"featureType":"poi.sports_complex",
"stylers":[
{
  "color":"#9e5916"
},
{
  "lightness":32
}
]
},
{

},
{
"featureType":"poi.government",
"stylers":[
{
  "color":"#9e5916"
},
{
  "lightness":46
}
]
},
{
"featureType":"transit.station",
"stylers":[
{
  "visibility":"off"
}
]
},
{
"featureType":"transit.line",
"stylers":[
{
  "color":"#813033"
},
{
  "lightness":22
}
]
},
{
"featureType":"transit",
"stylers":[
{
  "lightness":38
}
]
},
{
"featureType":"road.local",
"elementType":"geometry.stroke",
"stylers":[
{
  "color":"#f19f53"
},
{
  "lightness":-10
}
]
},
{

},
{

},
{

}
]}


var mapStateToProps = state => {
  return {
    nav: state.nav
  }
}

export default connect(mapStateToProps)(RaceMapScreen);
