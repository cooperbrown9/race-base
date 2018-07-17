import React, { Component } from 'react';
import { View,
         Text,
         Image,
         StyleSheet,
         TouchableOpacity,
         ScrollView,
         Modal,
         Animated,
         Dimensions,
         ActivityIndicator
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
    dayOneEvents: [],
    dayTwoEvents: [],
    dayThreeEvents: [],
    currentDay:[],
    schedule: [],
    isVisible: true,
    dayOne: true,
    dayTwo: false,
    dayThree: false,
    dayOneDate: 'MAY 4',
    dayTwoDate: 'MAY 5',
    dayThreeDate: 'MAY 6',
    dayOneWeekday: 'FRI',
    dayTwoWeekday: 'SAT',
    dayThreeWeekday: 'SUN',
    menuOpen: false,
    isLoading: true
  }


  componentWillMount(){
    this.loadSchedule();
  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen }, () => {
      this.props.dispatch({ type: (this.state.menuOpen) ? 'OPEN' : 'CLOSE' });
    })
  }


  _updateEvents = () => {
    if(this.state.dayOne){
      this.setState({currentDay: this.state.dayOneEvents});
    }
    if(this.state.dayTwo){
      this.setState({currentDay: this.state.dayTwoEvents});
    }
    if(this.state.dayThree){
      this.setState({currentDay: this.state.dayThreeEvents});
    }
  }

  dropDownMenu(){
    console.log('Drop Down Accessed');
  }

  _onPressDayOne = () =>{
    this.setState({ currentDay: this.state.dayOneEvents });
    debugger;
  }

  _onPressDayTwo = () =>{
    this.setState({ currentDay: this.state.dayTwoEvents });
  }

  _onPressDayThree = () =>{
    this.setState({ currentDay: this.state.dayThreeEvents });
  }

 loadSchedule = () => {
    API.getSchedule((err, schedule) => {
      if(err) {
        console.log(err);
      } else {
        this.setState({
          schedule: schedule,
          dayOneEvents: schedule.dayOne,
          dayTwoEvents: schedule.dayTwo,
          dayThreeEvents: schedule.dayThree,
          currentDay: schedule.dayOne
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
                title={<TouchableOpacity onPress={this.dropDownMenu.bind(this)}>
                        <Text style={{color:'white', fontSize: 20, fontFamily:'roboto-bold'}}>Schedule</Text>
                       </TouchableOpacity>}
        />
        <View style={styles.dayBar}>
          <TouchableOpacity style={styles.day} onPress={this._onPressDayOne} >
            <Text style={styles.dayText}>{this.state.dayOneDate}</Text>
            <Text style={styles.weekdayText}>{this.state.dayOneWeekday}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.day} onPress={this._onPressDayTwo}>
            <Text style={styles.dayText}>{this.state.dayTwoDate}</Text>
            <Text style={styles.weekdayText}>{this.state.dayTwoWeekday}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.day} onPress={this._onPressDayThree}>
            <Text style={styles.dayText}>{this.state.dayThreeDate}</Text>
            <Text style={styles.weekdayText}>{this.state.dayThreeWeekday}</Text>
          </TouchableOpacity>


        </View>

          <ScrollView style={styles.scrollContainer}>
              {(this.state.currentDay.length > 0)
                ? this.state.currentDay.map((event) => ( <ScheduleItem key={event.event_title} date={event.event_start} day={"FRI"} time={event.event_end.getHours() + ":"+ event.event_end.getMinutes()} description={event.event_description} location={event.event_location}/>))
                : null
              }

          </ScrollView>
        {/*(this.state.isLoading)
          ? <View style={{position:'absolute', left:0,right:0,top:0,bottom:0,justifyContent:'center',alignItems:'center'}}><ActivityIndicator size={'large'} color={'black'}/></View>
          : null*/
        }
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
    color: 'white', fontFamily: 'roboto-bold'
  },

});

var mapStateToProps = state => {
  return {
    nav: state.nav,

  }
}

export default connect(mapStateToProps)(ScheduleScreen);
