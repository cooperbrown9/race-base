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

import MyFriendsScreen from './MyFriendsScreen';
import Menu from './Menu.js';
import SideMenu from 'react-native-side-menu';
import Timer from '../ui-elements/timer.js';

import * as FriendActions from '../action-types/friend-action-types';
import * as API from '../api/api';

class TrackingScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      runner: {
        // distance: 0.0,
        seconds: 0,
        // time: "",
        // pace: 0,
        // location: { latitude: 0.0, longitude: 0.0 },
      },
      myFriendsPresented: false,
      friends: [],
      runnerDistance: 0,
      runnerSeconds: 0,
      runnerTime: "",
      // runnerPace: "",
      runnerLocation: { latitude: 0, longitude: 0 },
      // coordCounter: 0,
      // currentLocation: { lat: 0, lng: 0 },
      // runnerLocation: {},
      userCoords: [],
      // dummyCourse: [],
      // dummyCount: 0
    };
  }

  static navigationOptions = {
    header: null,

  };


  componentWillMount () {
    // this.setState(this.state);
    this.setState({ friends: this.props.friends });
  }

  async componentDidMount() {
    // this.setCoordinates();
    await this.getLocationAsync();

    this.getLocationInterval = setInterval(async() => {

      let location = await Location.getCurrentPositionAsync({});

      API.updateLocation({ "userID": this.props.userID, "lat": location.coords.latitude, "lon": location.coords.longitude }, (err, user) => {
        if(err) {
          console.log(err);
        } else {
          console.log('yup', user);
          this.setState({ runnerLocation: { latitude: user.latitude, longitude: user.longitude } });
        }
      })
    }, 2000);

    // get friend locations
    if(this.props.friends.length > 0) {
      this.getFriendsInterval = setInterval(() => {
        let friendCount = 0;
        let friends = this.props.friends;
        for(let i = 0; i < this.props.friends.length; i++) {
          var data = {
            "userID": this.props.friends[i]._id,
            "name": this.props.friends[i].name
          }
          API.getUserTracking(data, (err, user) => {
            if(err) {
              console.log(err);
            } else {
              friendCount++;
              friends[i].latitude = user.latitude;
              friends[i].longitude = user.longitude;

              if(friendCount === this.props.friends.length) {
                this.setState({ friends: friends });
                this.props.dispatch({ type: FriendActions.UPDATE_ALL_LOCATIONS, friends: friends });
              }
            }
          })
        }
      }, 5000);
    }

    let time = "";

    // get user location
    // setInterval(async() => {
    //   let { coords } = await Location.getCurrentPositionAsync({});
    //   this.setState({runnerLocation: { latitude: coords.latitude, longitude: coords.longitude }});
    //   console.log(this.state.runnerLocation);
    //   let data = {
    //     "userID": this.props.userID,
    //     "lat": coords.latitude,
    //     "lon": coords.longitude
    //   }
    //   API.updateLocation(data, (err, user) => {
    //     if(err) {
    //       console.log(err);
    //       debugger;
    //     } else {
    //       console.log(user);
    //
    //     }
    //   })
    //
    //   // looking for error in GPS, if location coords are the same as the previous coords, ignore them, otherwise add them
    //
    //   // basically takes the location from GPS, chcecks to see if it is different
    //   // from previous coord, then if so, pushes to array of userCoords
    //   if (this.state.userCoords[this.state.userCoords.length - 1].lat != this.state.runnerLocation.latitude ||
    //     this.state.userCoords[this.state.userCoords.length - 1].lng != this.state.runnerLocation.longitude) {
    //       this.setState({ userCoords: [...this.state.userCoords, { lat: this.state.runnerLocation.latitude, lng: this.state.runnerLocation.longitude }]});
    //   }
    // }, 5000);

    // setInterval(() => {
    //   if (this.state.dummyCount !== courseCoords.length) {
    //     this.setState({ dummyCourse: [...this.state.dummyCourse, { latitude: courseCoords[this.state.dummyCount].latitude, longitude: courseCoords[this.state.dummyCount].longitude }] });
    //     this.setState({ dummyCount: ++this.state.dummyCount});
    //     // add this line to have it run dummy course
    //     this.handleAddLine();
    //     // this.trackRunner();
    //   }
    // }, 2000);

// debugger;
    console.log(this.state.runner);

    // setInterval(() => {
    //   this.runTimer();
    // }, 1000);


  }

  componentWillUnmount() {
    clearInterval(this.getLocationInterval);
    clearInterval(this.getFriendsInterval);
  }

  getLocationAsync = async() => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if(status !== 'granted') {
      this.setState({ canAccessLocation: false });
    } else {
      this.setState({ canAccessLocation: true });

      let location = await Location.getCurrentPositionAsync({});
      this.setState({ runnerLocation: { latitude: location.coords.latitude, longitude: location.coords.longitude } });
      // this.setState({ runnerLocation: { lat: location.coords.latitude, lng: location.coords.longitude }, userCoords: [...this.state.userCoords,  { lat: location.coords.latitude, lng: location.coords.longitude} ] });
    }
  }

  formatTime = () => {
    let seconds = this.state.runnerSeconds;
    var hrs = ~~(seconds/3600);
    var mins = ~~((seconds % 3600) / 60);
    var secs = seconds % 60;
    console.log(hrs," ",mins," ",secs);

    var time = "";

    if(hrs > 0) {
      time += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    time += "" + mins + ":" + (secs < 10 ? "0" : "");
    time += "" + secs;
    // debugger;
    this.state.runnerTime = time;
    this.setState({ runnerTime: time });
  }


  // shouldComponentUpdate() {
  //   return false;
  // }

  runTimer = () => {
    // this.setState({ runner: { seconds: ++this.state.runner.seconds } });
    // this.formatTime(this.state.runner.seconds);
    this.setState({ runnerSeconds: ++this.state.runnerSeconds}, () => {
      this.formatTime();
    });
  }



  toggleMenu = () => {
    console.log('it works fam');
    this.setState({ menuOpen: !this.state.menuOpen }, () => {
      this.props.dispatch({ type: (this.state.menuOpen) ? 'OPEN' : 'CLOSE' });
    })
  }

  trackRunner = () => {
    let coords = this.state.userCoords;

      if(courseCoords.length > 1) {
        console.log(courseCoords);

        const totalDistance = [];
        const totalCoordinates = courseCoords.length - 1;
        const totalCoordinatesAdjusted = totalCoordinates - 1;

        function getSum(total, num) {
          return total + num;
        }

        for (var i = 0; i < this.state.userCoords.length; i++) {
          if (i != this.state.userCoords.length) {
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
              runnderDistance: newTotal
            });
            console.log('total distance is now ' + this.state.totalDistance)
          }
        }
      }  
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

  mapFriends = () => {
    this.state.friends.map((friend) => (
      <MapView.Marker key={friend.latitude} coordinate={{latitude: friend.latitude, longitude: friend.longitude }} image={require('../../assets/icons/pin.png')} />
    ))
  }

  render() {
    const { width, height } = Dimensions.get('window');

    // let userCoords = this.state.userCoords;
    // let mappedUserCoords = [];
    // for(let i = 0; i < this.state.userCoords.length; i++) {
    //   mappedUserCoords.push({ latitude: this.state.userCoords[i].lat, longitude: this.state.userCoords[i].lng });
    // }

    return (
      <View style={{backgroundColor:'transparent', flex: 1}}>
        <NavBar leftButton={<Image source={require('../../assets/icons/bars.png')} style={{height: 22, width: 22, tintColor: 'white'}} />}
                rightButton={<Image source={require('../../assets/icons/profile.png')} style={{height: 22, width: 22, tintColor: 'white'}} />}
                leftOnPress={this.toggleMenu}
                rightOnPress={() => this.setState({ myFriendsPresented: true })}
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
          <MapView.Polyline coordinates={courseCoords} strokeWidth={5} strokeColor={'yellow'} />
          {/*<MapView.Polyline coordinates={mappedUserCoords} strokeWidth={5} strokeColor={'blue'} />
          <MapView.Polyline coordinates={this.state.dummyCourse} strokeWidth={4} strokeColor={'green'} />*/}
          <MapView.Marker coordinate={{latitude: 47.6588, longitude: -117.4260}} image={require('../../assets/icons/pin.png')} />
          <MapView.Marker coordinate={{latitude: this.state.runnerLocation.latitude, longitude: this.state.runnerLocation.longitude }} image={require('../../assets/icons/pin.png')} />
          {this.state.friends.map((friend) =>
            <MapView.Marker  key={friend.latitude} coordinate={{latitude: friend.latitude, longitude: friend.longitude }} image={require('../../assets/icons/pin.png')} />
          )}
    </MapView>

      <ScrollView style={styles.myFriendsBar}>
        {this.props.friends.map((friend) =>
          <View style={{backgroundColor: '#F4C81B', marginBottom: 8, height: 40, justifyContent: 'center', alignItems: 'flex-start'}}>
            <Text style={styles.name}>{friend.name}</Text>
          </View>
        )}


        {/*<View style={{backgroundColor: 'white', flex: 3, flexDirection: 'row'}}>

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
                <Text style={{color: 'black', fontSize: 14, paddingTop: 4}}>{this.state.runnerDistance}</Text>
                <Text style={{color: 'gray', fontSize: 11}}>DISTANCE</Text>
              </View>

          </View>

        </View>*/}
      </ScrollView>
      <Modal animationType={'slide'} transparent={false} visible={this.state.myFriendsPresented} >
        <MyFriendsScreen dismiss={() => this.setState({ myFriendsPresented: false })}/>
      </Modal>
      {/*<View style={styles.bottomBar}>
        <View style={{flex:1, flexDirection: 'row', }}>
          <TouchableOpacity style={{flex:1, justifyContent: 'center', alignItems: 'flex-start' }}>
            <Image source={require('../../assets/icons/pointer.png')} style={{height: 26, width: 26, tintColor: '#55BBDD',  marginLeft: 20}}/>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:1, justifyContent: 'center', alignItems: 'flex-end' }}>
            <Image source={require('../../assets/icons/information.png')} style={{height: 26, width: 26, tintColor: '#55BBDD', marginRight: 20}}/>
          </TouchableOpacity>
        </View>
      </View>
      */}
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
  console.log(state.friend.friends);
  return {
    nav: state.nav,
    userID: state.user.userID,
    friends: state.friend.friends
  }
}

export default connect(mapStateToProps)(TrackingScreen);
