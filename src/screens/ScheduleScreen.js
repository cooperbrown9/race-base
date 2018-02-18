import React from 'react';
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

class ScheduleScreen extends React.Component {


  static navigationOptions = {
    header: null,

  };

  state = {
    events: [],
    currentIndex: 0,
    fridayEvents: [
      {date: 'APR 29', time: '8:00pm', description: 'Lorem ipsum et est cupidatat aute non laboris ex qui consectetur reprehenderit eiusmod incididunt id esse in laborum qui ul',
      somethingElse: 'Something Else'},
      {date: 'APR 29', time: '8:00pm', description: 'Lorem ipsum et est cupidatat aute non laboris ex qui consectetur reprehenderit eiusmod incididunt id esse in laborum qui ul',
      somethingElse: 'Something Else'},
    ],
    saturdayEvents: [
      {date: 'APR 30', time: '9:00pm', description: 'Lorem ipsum et est cupidatat aute non laboris ex qui consectetur reprehenderit eiusmod incididunt id esse in laborum qui ul',
      somethingElse: 'Something Else'},
      {date: 'APR 30', time: '9:00pm', description: 'Lorem ipsum et est cupidatat aute non laboris ex qui consectetur reprehenderit eiusmod incididunt id esse in laborum qui ul',
      somethingElse: 'Something Else'},
      {date: 'APR 30', time: '9:00pm', description: 'Lorem ipsum et est cupidatat aute non laboris ex qui consectetur reprehenderit eiusmod incididunt id esse in laborum qui ul',
      somethingElse: 'Something Else'},
    ],
    sundayEvents: [
      {date: 'MAY 1', time: '10:00pm', description: 'Lorem ipsum et est cupidatat aute non laboris ex qui consectetur reprehenderit eiusmod incididunt id esse in laborum qui ul',
      somethingElse: 'Something Else'},
      {date: 'MAY 1', time: '10:00pm', description: 'Lorem ipsum et est cupidatat aute non laboris ex qui consectetur reprehenderit eiusmod incididunt id esse in laborum qui ul',
      somethingElse: 'Something Else'},
    ],
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
    this.loadScheduleDays();
    console.log('we gud');
    
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
    this.setState({ currentIndex: 0 });
  }

  _onPressSaturday = () =>{
    this.setState({ currentIndex: 1 });
  }

  _onPressSunday = () =>{
    this.setState({ currentIndex: 2 });
  }
  
 loadScheduleDays = () => {
   console.log("load sched");
   
   API.getSchedule('5a19fa0d46c95e00147f9904', (err, schedule) => {
     if(err) {
       console.log(err);
     } else {
       // remember that an index of the day needs to be stored on the schedule object in DB
       // or some timestamp to tell which day it is
       this.setState({ events: schedule }, () => {
         this.forceUpdate();
       });
      
     }
   })
 }
 
 renderDays = () => {
   
       // this.state.currentDay.map((model) => { console.log(model); return(<ScheduleItem date={model.date} time={model.time} description={model.description} />)}  
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
            <Text style={styles.dayText}>APR 29</Text>
            <Text style={styles.weekdayText}>FRI</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.day} onPress={this._onPressSaturday}>
            <Text style={styles.dayText}>APR 30</Text>
            <Text style={styles.weekdayText}>SAT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.day} onPress={this._onPressSunday}>
            <Text style={styles.dayText}>MAY 1</Text>
            <Text style={styles.weekdayText}>SUN</Text>
          </TouchableOpacity>


        </View>

          <ScrollView style={styles.scrollContainer}>
              {(this.state.events.days != null && this.state.events.days.length > 0) 
                ? this.state.events.days.map((model) => ( <ScheduleItem data={model.date} time={model.time} description={model.description} />)) 
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
    backgroundColor: 'yellow'
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
    color: 'white'
  },
  weekdayText: {
    fontSize: 24,
    color: 'white'
  },

});

var mapStateToProps = state => {
  return {
    nav: state.nav,

  }
}

export default connect(mapStateToProps)(ScheduleScreen);
