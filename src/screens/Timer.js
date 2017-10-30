import React from 'react';
import { View,
         Text,
         Image,
         StyleSheet,
         TouchableOpacity,
         ScrollView,
         Dimensions,
         Math,
} from 'react-native';
import { connect } from 'react-redux';
import NavBar from '../ui-elements/nav-bar.js';

class Timer extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
    running: false,
    elapsedTime: 0,
    previousTime: 0,
    minutes: 0,
    seconds: 0,
    secondsPlaceholder: '0',
    latitude: null,
    longitude: null,
    error: null
    }
    this.onStart = this.onStart.bind(this);
    this.onTick = this.onTick.bind(this);
    this.onStop = this.onStop.bind(this);
    this.onReset = this.onReset.bind(this);
    this.updateMinute = this.updateMinute.bind(this);
  }
  
  componentDidMount() {
     this.interval = setInterval(this.onTick, 100);
     this.interval = setInterval(this.updateMinute, 1000);

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
  }  

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }
  
  onTick() {
    if (this.state.running) {
        var seconds = Math.floor(this.state.elapsedTime / 1000);
        var now = new Date();

        this.setState({
          previousTime: now,
          elapsedTime: this.state.elapsedTime + (now - this.state.previousTime),
          seconds: seconds
        });

        if(this.state.seconds < 10){
          this.setState({
            secondsPlaceholder: '0'
          });
        } else {
          this.setState({
            secondsPlaceholder: ''
          });
        }
    }
  }

  updateMinute(){
    if (this.state.running) {
      // var seconds = Math.floor(this.state.elapsedTime / 1000);
      if(this.state.seconds === 59){
        var nextMinute = this.state.minutes + 1;

        this.setState({
            minutes: nextMinute
        });
      }

      if(this.state.seconds === 59 || this.state.seconds === 60) {
        this.setState({
          secondsPlaceholder: '0',
          seconds: 0,
          elapsedTime: 0
        });
      }
      
      console.log('update that counter');
      console.log('seconds ' + this.state.seconds + ' minutes ' + this.state.minutes)
      console.log(this.state);
    }
  }


  
  onStart() {
    var now = new Date();
    this.setState({
      running: true,
      previousTime: now,
    });
  }
  
  onStop(){
    this.setState({ running: false });
  }

  
  onReset(){
    var now = new Date();
    this.setState({
      elapsedTime: 0,
      previousTime: now,
    });
  }

// { this.state.running ?
        //   <button onClick={this.onStop}>Stop</button>
        //   :
        //   <button onClick={this.onStart}>Start</button>
        // }
        // <button onClick={this.onReset}>Reset</button>

  render() {
  return (
      <View style={{backgroundColor:'transparent', flex: 1, backgroundColor: 'white'}}>
        <NavBar leftButton={<Image source={require('../../assets/icons/bars.png')} style={{height: 22, width: 22, tintColor: 'white'}} />}
          rightButton={<Image source={require('../../assets/icons/profile.png')} style={{height: 22, width: 22, tintColor: 'white'}} />}
          title={<Text style={{color:'white', fontSize: 16}}>Timer</Text>}
        />
        <View style={{flex:1,
            backgroundColor: 'blue',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',}}>
           <View><Text>{this.state.minutes}</Text></View>
           <View ><Text>{this.state.secondsPlaceholder}</Text></View>
           <View><Text>{this.state.seconds} </Text></View>
        </View>
        <View><Text>Duration</Text></View>{ this.state.running ? <TouchableOpacity style={{width:32, height:32, backgroundColor: 'white'}} onPress={this.onStop}><Text style={{color:'white'}}>Stop</Text></TouchableOpacity> : <TouchableOpacity onPress={this.onStart}><Text>start</Text></TouchableOpacity> }
      </View>
    );
  }
}
var mapStateToProps = state => {
  return {
    nav: state.nav,

  }
}
export default connect(mapStateToProps)(Timer);
