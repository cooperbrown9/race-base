import React from 'react';
import { View,
         Text,
         Image,
         StyleSheet,
         TouchableOpacity,
         ScrollView,
         Dimensions
} from 'react-native';
import NavBar from '../ui-elements/nav-bar.js';
import { courseCoords } from '../../assets/bloomsday-path.js';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Menu from './Menu.js';
import SideMenu from 'react-native-side-menu';
import Timer from '../ui-elements/timer.js';


class TrackingScreen extends React.Component {

  static navigationOptions = {
    header: null,

  };

  state = {
    menuOpen: false,
    runnerObj: {
      distance: 0,
      time: 0,
      pace: 0
    },
    coordCounter: 0,
    currentLocation: { lat: 0, lng: 0 }
  }

  componentDidMount() {
    this.setCoordinates();

    setInterval(() => {
      this.trackRunner();
      this.handleAddLine({lat: this.state.coordinates[this.state.coordCounter].lat, lng:this.state.coordinates[this.state.coordCounter].lng });
    }, 3000);
  }

  toggleMenu = () => {
    console.log('it works fam');
    this.setState({ menuOpen: !this.state.menuOpen }, () => {
      this.props.dispatch({ type: (this.state.menuOpen) ? 'OPEN' : 'CLOSE' });
    })
  }

  trackRunner = () => {
    if(this.state.coordinates.length > 1) {
        const lat1 = this.state.coordinates[0].lat;
        const lon1 = this.state.coordinates[0].lng;
        const lat2 = this.state.coordinates[1].lat;
        const lon2 = this.state.coordinates[1].lng;
        
        function deg2rad(deg) {
          return deg * (Math.PI/180)
        }

        var R = 3959; // Radius of the earth in miles
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1);
        var a =
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
          Math.sin(dLon/2) * Math.sin(dLon/2);

        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c; // Distance in miles
        this.setState({ runnerObj: { distance: d + this.state.runnerObj.distance } });
        console.log(d);
      }
  }

handleAddLine = (event) => {
    // console.log('the longitude is ' + event.latLng.lng());
    this.setState({coordCounter: this.state.coordCounter+1, currentLocation: { lat: this.state.coordinates[this.state.coordCounter].lat, lng: this.state.coordinates[this.state.coordCounter].lng } });

    this.setState({
      coordinates: [
        ...this.state.coordinates,
        {
          lat: event.lat,//latLng.lat(),
          lng: event.lng,//latLng.lng(),
        },
      ]
    });  

  if(this.state.coordinates.length > 1) {
      console.log(this.state.coordinates);

      const totalDistance = [];
      const totalCoordinates = this.state.coordinates.length - 1;
      const totalCoordinatesAdjusted = totalCoordinates - 1;

      function getSum(total, num) {
        return total + num;
      }

      for (var i = 0; i < totalCoordinates; i++) {
        if (i != totalCoordinates) {
          const lat1 = this.state.coordinates[i].lat;
          const lon1 = this.state.coordinates[i].lng;
          const lat2 = this.state.coordinates[i+1].lat;
          const lon2 = this.state.coordinates[i+1].lng;

          // this.setState({ currentLocation: {lat: lat1, lng: lon1}});

          console.log(lat1);
          console.log(lon1);

          function deg2rad(deg) {
            return deg * (Math.PI/180)
          }

          var R = 3959; // Radius of the earth in miles
          var dLat = deg2rad(lat2-lat1);  // deg2rad below
          var dLon = deg2rad(lon2-lon1);
          var a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2)
            ;
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
          var d = R * c; // Distance in miles
          console.log('line segment ' + (i+1) + ' of ' + totalCoordinates + ' length is ' + d);
          totalDistance.push(d);

          const newTotal = totalDistance.reduce(getSum);
          console.log('total distance is ' + newTotal);
        }
        if (i == totalCoordinates - 1) {
          console.log('last one');
          const newTotal = totalDistance.reduce(getSum).toFixed(2);

          this.setState({
            totalDistance: newTotal
          });
          console.log('total distance is now ' + this.state.totalDistance)
        }
      }
    }  
  }

  setCoordinates = () => {
    this.state.coordinates = [

      {lat: 47.66269942589627, lng: -117.40363597869873},

      {lat: 47.65837821539351, lng: -117.40168333053589},

      {lat: 47.658118064216744, lng: -117.41284132003784},

      {lat: 47.66134095679338, lng: -117.41844177246094},

      {lat: 47.66488157353775, lng: -117.41567373275757}

    ];

    this.setState({ coordinates: this.state.coordinates });
  }


  dropDownMenu(){
    console.log('Drop Down Accessed');
  }

  render() {
    const { width, height } = Dimensions.get('window');
    return (
      <View style={{backgroundColor:'transparent', flex: 1}}>
        <NavBar leftButton={<Image source={require('../../assets/icons/bars.png')} style={{height: 22, width: 22, tintColor: 'white'}} />}
                rightButton={<Image source={require('../../assets/icons/profile.png')} style={{height: 22, width: 22, tintColor: 'white'}} />}
                leftOnPress={this.toggleMenu}
        />

        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 47.6588,
            longitude: -117.4260,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}>
          <MapView.Polyline coordinates={courseCoords} strokeWidth={5} strokeColor={'#F4C81B'} />
          <MapView.Marker coordinate={{latitude: 47.6588, longitude: -117.4260}} image={require('../../assets/icons/pin.png')} />
          <MapView.Marker coordinate={{latitude: this.state.currentLocation.lat, longitude: this.state.currentLocation.lng }} image={require('../../assets/icons/pin.png')} />
    </MapView>

      <Timer/>

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
                <Text style={{color: 'black', fontSize: 14, paddingTop: 4}}>{this.state.runnerObj.distance.toFixed(2)}</Text>
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
    zIndex: 0,
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
    nav: state.nav,

  }
}

export default connect(mapStateToProps)(TrackingScreen);
