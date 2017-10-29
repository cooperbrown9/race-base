import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class Timer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      running: false,
      elapsedTime: 0,
      previousTime: 0,
      minutes: 0,
      seconds: 0,
      secondsPlaceholder: '0'
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
  }  
  
  onTick() {
    if (this.state.running) {
      var seconds = Math.floor(this.state.elapsedTime / 1000);
      var now = Date.now();
      this.setState({
        previousTime: now,
        elapsedTime: this.state.elapsedTime + (now - this.state.previousTime),
        seconds: seconds
      });
      if(this.state.seconds < 10){
        this.setState({ secondsPlaceholder: '0' });
      } else {
        this.setState({ secondsPlaceholder: '' });
      }
    }
  }

  updateMinute(){
    if (this.state.running) {
    // var seconds = Math.floor(this.state.elapsedTime / 1000);
      if(this.state.seconds === 59){
        var nextMinute = this.state.minutes + 1;
        this.setState({ minutes: nextMinute });
      }

      if(this.state.seconds === 59 || this.state.seconds === 60) {
        this.setState({ secondsPlaceholder: '0', seconds: 0, elapsedTime: 0 });
      }
      
      console.log('update that counter');
      console.log('seconds ' + this.state.seconds + ' minutes ' + this.state.minutes)
      console.log(this.state);
    }
  }


  
  onStart() {
    this.setState({
      running: true,
      previousTime: Date.now(),
    });
  }
  
  onStop(){
    this.setState({ running: false });
  }
  
  onReset(){
    this.setState({
      elapsedTime: 0,
      previousTime: Date.now(),
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
      <View>
        <View>
          <View><Text>{this.state.minutes}</Text></View>
          <View><Text>{this.state.secondsPlaceholder}</Text></View>
          <View><Text>{this.state.seconds}</Text></View>

          </View>
          <Text>Duration</Text>
          { (this.state.running) ? <Button onPress={this.onStop} title="Stop"/> : <Button onPress={this.onStart} title="Start"/> }
      </View>
    );
  }
}

export default Timer;
