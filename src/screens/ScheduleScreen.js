import React from 'react';
import { View,
         Text,
         Image,
         StyleSheet,
         TouchableOpacity,
         ScrollView,
         Modal,
         Animated,

} from 'react-native';
import { connect } from 'react-redux';
import NavBar from '../ui-elements/nav-bar.js';
import ScheduleItem from '../ui-elements/schedule-item.js';

class ScheduleScreen extends React.Component {


  static navigationOptions = {
    header: null,

  };
  state = {
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
    dayScheduleInfo:[],
    isVisible: true,
    fri: true,
    sat: false,
    sun: false,


  }

  componentDidMount(){
    console.log('we gud');
    this.setState({dayScheduleInfo: this.state.fridayEvents});
  }

  componentWillMount() {

  }

  _updateEvents = () => {
    if(this.state.fri){
      this.setState({dayScheduleInfo: this.state.fridayEvents});
    } else if(this.state.sat){
      this.setState({dayScheduleInfo: this.state.saturdayEvents});
    } else if(this.state.sun){
      this.setState({dayScheduleInfo: this.state.sundayEvents});
    }
  }

  dropDownMenu(){
    console.log('Drop Down Accessed');
  }

  _renderIf(condition, content) {
    if (condition) {
        return content;
    } else {
        return null;
    }
  }

  _onPressFriday = () => {
    this.setState({
      fri: true,
      sat: false,
      sun: false,
    });
    this._updateEvents();
  }

  _onPressSaturday = () => {
    this.setState({
      fri: false,
      sat: true,
      sun: false,
    });
    this._updateEvents();
  }

  _onPressSunday = () => {
    this.setState({
      fri: false,
      sat: false,
      sun: true,
    });
    this._updateEvents();
  }

  render(){
    return (
      <View style={{backgroundColor:'transparent', flex: 1}}>
        <NavBar leftButton={<Image source={require('../../assets/icons/bars.png')} style={{height: 22, width: 22, tintColor: 'white'}} />}
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

            {this.state.dayScheduleInfo.map(model => <ScheduleItem date={model.date} time={model.time} description={model.description} somethingElse={model.somethingElse}/>)}
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
    color: 'white'
  },
  weekdayText: {
    fontSize: 24,
    color: 'white'
  },

});

var mapStateToProps = state => {
  console.log(state);
  return {

  }
}

export default connect(mapStateToProps)(ScheduleScreen);
