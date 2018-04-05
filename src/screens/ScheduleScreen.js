import React, { Component } from 'react';
import { View,
         Text,
         Image,
         StyleSheet,
         TouchableOpacity,
         ScrollView,
         Modal,
         Animated,
         Dimensions

} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import NavBar from '../ui-elements/nav-bar.js';
import ScheduleItem from '../ui-elements/schedule-item.js';
import Menu from './Menu.js';
import SideMenu from 'react-native-side-menu';

import * as API from '../api/api';

class ScheduleScreen extends Component {


  static navigationOptions = {
    header: null,

  };

  state = {
    events: [],
    currentIndex: 0,
    fridayEvents: [],
    saturdayEvents: [],
    sundayEvents: [],
    currentDay:[],
    isVisible: true,
    fri: true,
    sat: false,
    sun: false,
    menuOpen: false,
  }

  componentWillMount() {
  }

  componentDidMount(){
    this.loadSchedule();
  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen }, () => {
      this.props.dispatch({ type: (this.state.menuOpen) ? 'OPEN' : 'CLOSE' });
    })
  }


  _updateEvents = () => {
    if(this.state.fri){
      this.setState({currentDay: this.state.fridayEvents});
    }
    if(this.state.sat){
      this.setState({currentDay: this.state.saturdayEvents});
    }
    if(this.state.sun){
      this.setState({currentDay: this.state.sundayEvents});
    }
  }

  dropDownMenu(){
    console.log('Drop Down Accessed');
  }

  _onPressFriday = () =>{
    this.setState({ currentDay: this.state.fridayEvents });
  }

  _onPressSaturday = () =>{
    this.setState({ currentDay: this.state.saturdayEvents });
  }

  _onPressSunday = () =>{
    this.setState({ currentDay: this.state.sundayEvents });
  }

 loadSchedule = () => {
   API.getSchedule('5a19fa0d46c95e00147f9904', (err, schedule) => {
     if(err) {
       console.log(err);
     } else {
       let fri = [], sat = [], sun = [];
       for(let i = 0; i < schedule.length;  i++) {
         if(schedule[i].day === 'Fri') {
           fri.push(schedule[i]);
         } else if(schedule[i].day === 'Sat') {
           sat.push(schedule[i]);
         } else {
           sun.push(schedule[i]);
         }
       }
       // remember that an index of the day needs to be stored on the schedule object in DB
       // or some timestamp to tell which day it is
       this.setState({ events: schedule, currentDay: fri, fridayEvents: fri, saturdayEvents: sat, sundayEvents: sun }, () => {
         this.forceUpdate();
       });

     }
   })
 }

  render() {
    const { width, height } = Dimensions.get('window');
    return (
      <View style={{backgroundColor:'transparent', flex: 1, backgroundColor: 'white'}}>
        <NavBar leftButton={<Image source={require('../../assets/icons/bars.png')} style={{height: 22, width: 22, tintColor: 'white'}} />}
                leftOnPress={this.toggleMenu.bind(this)}
                rightButton={<Image source={require('../../assets/icons/profile.png')} style={{height: 22, width: 22, tintColor: 'white'}} />}
                title={<TouchableOpacity onPress={this.dropDownMenu.bind(this)}>
                        <Text style={{color:'white', fontSize: 16}}>Schedule</Text>
                       </TouchableOpacity>}
        />
        <View style={styles.dayBar}>
          <TouchableOpacity style={styles.day} onPress={this._onPressFriday} >
            <Text style={styles.dayText}>MAY 4</Text>
            <Text style={styles.weekdayText}>FRI</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.day} onPress={this._onPressSaturday}>
            <Text style={styles.dayText}>MAY 5</Text>
            <Text style={styles.weekdayText}>SAT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.day} onPress={this._onPressSunday}>
            <Text style={styles.dayText}>MAY 6</Text>
            <Text style={styles.weekdayText}>SUN</Text>
          </TouchableOpacity>


        </View>

          <ScrollView style={styles.scrollContainer}>
              {(this.state.currentDay != null && this.state.currentDay.length > 0)
                ? this.state.currentDay.reverse().map((model) => ( <ScheduleItem date={model.date} day={model.day} time={model.time} description={model.eventName} location={model.eventLocation}/>))
                : null
              }
          </ScrollView>


    </View>
    );
  }

}

const styles = StyleSheet.create({
  dayBar: {
    height: 60,
    flexDirection: 'row',
    backgroundColor : 'white',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  scrollContainer:{
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent'
  },
  day: {
    flex: 1,
    height: 60,
    backgroundColor: '#AADDEE',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dayText: {
    fontSize: 16,
    color: 'white', fontFamily: 'roboto-regular'
  },
  weekdayText: {
    fontSize: 24,
    color: 'white', fontFamily: 'roboto-regular'
  },

});

var mapStateToProps = state => {
  return {
    nav: state.nav,

  }
}

export default connect(mapStateToProps)(ScheduleScreen);
