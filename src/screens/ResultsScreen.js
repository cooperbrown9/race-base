import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View,
         Text,
         Image,
         StyleSheet,
         TouchableOpacity,
         ScrollView,
         Dimensions,
         TextInput,
         KeyboardAvoidingView,
         ActivityIndicator,
         Modal
} from 'react-native';
import { connect } from 'react-redux';

import NavBar from '../ui-elements/nav-bar.js';
import Menu from './Menu.js';
import SideMenu from 'react-native-side-menu';
import FindFriends from './FindFriends';
import axios from 'axios';

const CHRONOTRACK_URL = 'https://api.chronotrack.com/api/results/37865/bib/4?format=json&client_id=727dae7f&user_id=matt%40ransdellbrown.com&user_pass=cf5d3438ea8d630cb91e3d89fc8e9021cbd00b5f';

const matCount = 4;
const bottomDooms = 1;
const topDooms = 2;

class ResultsScreen extends Component {

  constructor() {
    super();

    this.state = {
      finishTime: 0.0,
      avgMile: 0.0,
      fastestMile: 0.0,
      totalDistance: 0.0,
      bibInput: '',
      startTime: 0.0,
      isLoading: false,
      findFriendsPresented: false,
      hasFinished: false,
      runner: {}
    }
  }

  static navigationOptions = {
    header: null,
  };

  toggleMenu = () => {

    console.log( Dimensions.get('window').height);
    console.log( Dimensions.get('window').width);

    console.log('it works fam');
    this.setState({ menuOpen: !this.state.menuOpen }, () => {
      this.props.dispatch({ type: (this.state.menuOpen) ? 'OPEN' : 'CLOSE' });
    })
  }

  compnentDidMount() {
  }

  state = {
    menuOpen: false
  }

  toMinutes(t) {
    try{
      // 05:50
      var arr = t.split(':');
      return parseFloat(parseInt(arr[0], 10) + '.' + parseInt((arr[1]/6)*10, 10));
    }
    catch (e) {
      return 0;
    }
  }
  hasFinishedRace(intervals){
    //debugger;
    if (intervals != null && intervals.length == matCount){
      if (intervals[matCount-1].crossing_time != null){
          return true;
      }
    }
    return false;
  }

  estimateStart(intervals){
    //debugger;
    if (intervals != null){
      if (intervals[0].crossing_time == null){
          return "9:00";
      } else{
        return intervals[0].crossing_time.replace("AM","");
      }
    }
    else {
      return "9:00";
    }
  }

  estimatePace(data){
    //debugger;
    try{
      if (data.entry.overall_pace == null){
        if (data.intervals != null && data.intervals.length > 2){
          if(data.intervals[topDooms].pace != null){
            //debugger;
            return data.intervals[topDooms].pace;
          } else if(data.intervals[bottomDooms].pace != null){
            //debugger;
            return data.intervals[bottomDooms].pace;
          }
        }
        return "0:00";
      } else{
        return data.entry.overall_pace.replace("00:","");
      }
    }
    catch (e){
      return "0:00";
    }
  }

  paceFinishTime(pace){
    //debugger;
    let est = pace * 7.45645;

    let hrs = ~~(est/60);
    est = est - (hrs*60);
    let mins = ~~(est);
    let secs = 0;
    let h = (hrs == 0) ? "00" : "0"+hrs;
    let m = (mins >= 10) ? mins : "0"+mins;
    let s = "00";
    return h+":"+m+":"+s;
  }

  estimateFinish(data){
    //debugger;
    try{
      if (data.entry.overall_time != null){
        return data.entry.overall_time.replace("00:","");
      }
      else{
        if (data.intervals != null && data.intervals.length > 2){
          if(data.intervals[topDooms].pace != null){
            //debugger;
            let pace = this.toMinutes(data.intervals[topDooms].pace);
            return this.paceFinishTime(pace);
          } else if(data.intervals[bottomDooms].pace != null){
            //debugger;
            let pace = this.toMinutes(data.intervals[bottomDooms].pace);
            return this.paceFinishTime(pace);
          }
        }
        return "0:00";
      }
    }
    catch (e){
      return "0:00";
    }
  }

  getRaceData() {
    //NOT USED - SEE FINDFRIENDS.JS
    //debugger;
    this.setState({ isLoading: true });
    //{
      // TEST DATA - COMMENT OUT
      //const RaceId = '38503';
      //userToFollow.runNumber = 343;
      //userToFollow.runNumber = 2;
      //userToFollow.runNumber = 3;
      //userToFollow.runNumber = 4;
    //}
    {
      // BLOOMSDAY RACEID - UNCOMMENT
      const RaceId = '37865';
    }
    const url0 = 'https://api.chronotrack.com/api/results/' + RaceId + '/bib/' + userToFollow.runNumber + '?format=json&client_id=727dae7f&user_id=matt%40ransdellbrown.com&user_pass=cf5d3438ea8d630cb91e3d89fc8e9021cbd00b5f';

    //const url0 = 'https://api.chronotrack.com/api/results/38503/bib/' + this.state.bibInput + '?format=json&client_id=727dae7f&user_id=matt%40ransdellbrown.com&user_pass=cf5d3438ea8d630cb91e3d89fc8e9021cbd00b5f';
    axios.get(url0).then(response => {
      const { entry } = response.data;
      this.setState({
        finishTime: this.estimateFinish(entry),
        avgMile: this.estimatePace(entry),
        startTime: this.estimateStart(response),
        hasFinished: this.hasFinishedRace(respone.data.intervals),
        isLoading: false
      });
      // everything is 0:00 until first response.data.intervals[0].crossing_time != null
      // estimate pace, finishtime, distance traveled until overall time = null
      // throttle - 1 minute (store lastChronoTrackCheck Time.Now)
    }).catch(e => {
      this.setState({
        finishTime: "?",
        avgMile: "0:00",
        startTime: "9:00",
        isLoading: false
      });
      console.log(e);
    })
  }

  dropDownMenu(){
    console.log("Drop Down Accessed");
  }

  _dismissFindFriends = (runner) => {
    try {
      //debugger;
      this.setState({
        finishTime: this.estimateFinish(runner),
        avgMile: this.estimatePace(runner),
        hasFinished: this.hasFinishedRace(runner.intervals),
        startTime: this.estimateStart(runner.intervals),
        findFriendsPresented: false,
        runnerName: runner.name
      });
    } catch(e) {
      this.setState({ finishTime: '?', avgMile:'?',startTime:'?',isLoading:false})
    }
  }

  render(){
    const { width, height } = Dimensions.get('window');
    const finishTime = (this.state.hasFinished) ? 'Finish Time!' : 'Estimated Finish Time';
    return(
      <KeyboardAvoidingView style={styles.mainContainer} behavior='padding' >
        <Modal animationType={'slide'} transparent={false} visible={this.state.findFriendsPresented} >
          <FindFriends dismiss={() => this.setState({ findFriendsPresented: false })} dismissWithRunner={(runner) => this._dismissFindFriends(runner)} />
        </Modal>

        <NavBar leftButton={<Image source={require('../../assets/icons/bars.png')} style={{height: 20, width: 20, tintColor: 'white'}}/>}
                leftOnPress={this.toggleMenu.bind(this)}
                title={<TouchableOpacity onPress={this.dropDownMenu.bind(this)}>
                        <Text style={{color:'white', fontSize: 16, fontFamily:'roboto-bold'}}>RESULTS</Text>
                       </TouchableOpacity>}
                style={{position:'absolute'}}
        />
        <View style={styles.topView}>
          <Image source={require('../../assets/icons/oval.png')}
                  style={{resizeMode: 'stretch'}}
                  />
            <View style={{position: 'absolute',
                          left: 10,
                          right: 10,
                          top: 60,
                          backgroundColor: 'transparent',
                          zIndex: 2}}>
              <View style={{flex:1, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                <Text style={{color: 'white', textAlign: 'center', fontSize: 60, fontFamily:'roboto-bold'}}>{this.state.finishTime}</Text>
                <Text style={{color: '#FFFFFF', fontSize: 18, opacity: .7}}>{finishTime}</Text>
              </View>
              <View style={{flex:1, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 60}}>
                <View style={{flex: 1, }}>
                  <Text style={{textAlign: 'center', fontWeight: 'bold', color: 'white', fontSize: 22}}>{this.state.avgMile}</Text>
                  <Text style={{textAlign: 'center', color: '#FFFFFF', opacity: .7}}>Pace</Text>
                </View>
                <View style={{flex: 1, }}>
                  <Text style={{textAlign: 'center', fontWeight: 'bold', color: 'white', fontSize: 22}}>{this.state.startTime}</Text>
                  <Text style={{textAlign: 'center', color: '#FFFFFF', opacity: .7}}>Start Time</Text>
                </View>
                <View style={{flex: 1, }}>
                  <Text style={{textAlign: 'center', fontWeight: 'bold', color: 'white', fontSize: 22}}>12K</Text>
                  <Text style={{textAlign: 'center', color: '#FFFFFF', opacity: .7}}>Distance</Text>
                </View>
              </View>
              <Text style={{marginTop:64,color:'white',textAlign:'center', fontSize:24, fontFamily:'roboto-bold'}}>{(this.state.runnerName != null) ? this.state.runnerName : ''}</Text>
            </View>
        </View>
        <View style={styles.bottomView}>
          <TouchableOpacity onPress={() => this.setState({ findFriendsPresented: true })} style={{marginLeft:32,marginRight:32,marginTop:16,height:64,borderRadius:8,backgroundColor:'#a260a9',justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize: 24, fontFamily:'roboto-bold', color:'white', textAlign:'center'}}>SEARCH</Text>
          </TouchableOpacity>
        </View>
        {(this.state.isLoading)
          ? <View style={{position:'absolute',left:0,right:0,top:0,bottom:0,backgroundColor:'rgba(0,0,0,0.5)',justifyContent:'center',alignItems:'center'}}><ActivityIndicator size={'large'}/></View>
          : null
        }
      </KeyboardAvoidingView>
    );
  }

}

ResultsScreen.propTypes = {
  finishTime: PropTypes.string,
  avgMile: PropTypes.string,
  fastestMile: PropTypes.string,
  totalDistance: PropTypes.string

};

ResultsScreen.defaultProps = {
  finishTime: '1:20:36',
  avgMile: '10:31',
  fastestMile: '5:40',
  totalDistance: '7.5'
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column'
  },
  input: {
    fontSize: 24, fontFamily:'roboto-regular',
    marginLeft:32, marginRight:32,
    borderBottomColor:'#a260a9', borderBottomWidth:2
  },
  topView: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
    flex:2
  },
  bottomView: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    marginBottom: 20
  }

});
var mapStateToProps = state => {
  return {
    nav: state.nav,

  }
}

export default connect(mapStateToProps)(ResultsScreen);
