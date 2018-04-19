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
    this.setState({friends: [{name:'',latitude:0.0,longitude:0.0}]});
    {
      const START_LATITUDE = 47.6588;
      const START_LONGITUDE = -117.4260;
      this.setState({regionSet:true,currentRegion:{latitude:START_LATITUDE,longitude:START_LONGITUDE,latitudeDelta:0.0922,longitudeDelta:0.0421} },()=>this.setState({regionSet:false}));
    }

  }

  async componentDidMount() {
    // initial getLocation, then next part is the interval of getting locations
    await this.getLocationAsync();
    this.setState({ friends: this.props.friends });
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

  // replace courseCoords with the array of points the user has gone,
  // course coords use dummy counter to simulate moving
  handleAddLine = () => {
    let coords = this.state.dummyCourse;

    if(coords.length > 1) {
      console.log(courseCoords);

      const totalDistance = [];
      const totalCoordinates = coords.length - 1;
      const totalCoordinatesAdjusted = totalCoordinates - 1;

      function getSum(total, num) {
        return total + num;
      }

      for (var i = 0; i < this.state.dummyCount; i++) {
        if (i != this.state.dummyCount) {
          const lat1 = courseCoords[i].latitude;
          const lon1 = courseCoords[i].longitude;
          const lat2 = courseCoords[i+1].latitude;
          const lon2 = courseCoords[i+1].longitude;

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

          const newTotal = totalDistance.reduce(getSum).toFixed(2);
          // this.setState({ runner: { distance: newTotal }});
          console.log('total distance is ' + newTotal);
        }
        if (i == this.state.dummyCount - 1) {
          console.log('last one');
          const newTotal = totalDistance.reduce(getSum).toFixed(2);

          this.setState({
            runnerDistance: newTotal
          });
          console.log('total distance is now ' + this.state.runnerDistance)
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

    // let userCoords = this.state.userCoords;
    // let mappedUserCoords = [];
    // for(let i = 0; i < this.state.userCoords.length; i++) {
    //   mappedUserCoords.push({ latitude: this.state.userCoords[i].lat, longitude: this.state.userCoords[i].lng });
    // }

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

          <MapView.Marker coordinate={{latitude: courseCoords[0].latitude, longitude: courseCoords[0].longitude}} image={require('../../assets/icons/start48.png')} />
          <MapView.Marker coordinate={{latitude: 47.662184, longitude: -117.426651}} image={require('../../assets/icons/finish.png')} />

          <MapView.Marker coordinate={{latitude: 47.6588, longitude: -117.4260}} image={require('../../assets/icons/pin.png')} />
          <MapView.Marker coordinate={{latitude: this.state.myLatitude, longitude: this.state.myLongitude }} image={require('../../assets/icons/pin.png')} />
          {(this.state.friends != null) ? this.state.friends.map((friend) =>
            <MapView.Marker coordinate={{latitude: friend.latitude, longitude: friend.longitude }} image={require('../../assets/icons/pin.png')} />
          ) : null}
    </MapView>

      <TouchableOpacity onPress={() => this.setState({regionSet:true,currentRegion:{latitude:START_LATITUDE,longitude:START_LONGITUDE,latitudeDelta:0.0922,longitudeDelta:0.0421} },()=>this.setState({regionSet:false}))} style={{position:'absolute', top: 100, right: 16, height: 40, width: 40}}>
        <Image style={{height:40,width:40,tintColor:'white'}} source={require('../../assets/icons/pointer.png')} />
      </TouchableOpacity>


      </View>
    );

  }
}

export default connect(mapStateToProps)(RaceMapScreen);
