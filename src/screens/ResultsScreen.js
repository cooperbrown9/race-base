import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View,
         Text,
         Image,
         StyleSheet,
         TouchableOpacity,
         ScrollView,
         Dimensions,
         TextInput
} from 'react-native';
import { connect } from 'react-redux';

import NavBar from '../ui-elements/nav-bar.js';
import Menu from './Menu.js';
import SideMenu from 'react-native-side-menu';
import axios from 'axios';

const CHRONOTRACK_URL = 'https://api.chronotrack.com/api/results/37865/bib/4?format=json&client_id=727dae7f&user_id=matt%40ransdellbrown.com&user_pass=cf5d3438ea8d630cb91e3d89fc8e9021cbd00b5f';

class ResultsScreen extends Component {

  constructor() {
    super();

    this.state = {
      finishTime: 0.0,
      avgMile: 0.0,
      fastestMile: 0.0,
      totalDistance: 0.0,
      bibInput: '',
      startTime: 0.0
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
    console.log( Dimensions.get('window').height);

  }

  state = {
    menuOpen: false,

  }

  getRaceData() {
    // sample getRaceData
    // completed race
    // https://api.chronotrack.com/api/results/37865/bib/4?format=json&client_id=727dae7f&user_id=matt%40ransdellbrown.com&user_pass=cf5d3438ea8d630cb91e3d89fc8e9021cbd00b5f
    // incomplete race
    // https://api.chronotrack.com/api/results/38503/bib/343?format=json&client_id=727dae7f&user_id=matt%40ransdellbrown.com&user_pass=cf5d3438ea8d630cb91e3d89fc8e9021cbd00b5f

    const url0 = 'https://api.chronotrack.com/api/results/37865/bib/' + this.state.bibInput + '?format=json&client_id=727dae7f&user_id=matt%40ransdellbrown.com&user_pass=cf5d3438ea8d630cb91e3d89fc8e9021cbd00b5f';
    //const url0 = 'https://api.chronotrack.com/api/results/38503/bib/' + this.state.bibInput + '?format=json&client_id=727dae7f&user_id=matt%40ransdellbrown.com&user_pass=cf5d3438ea8d630cb91e3d89fc8e9021cbd00b5f';
    axios.get(url0).then(response => {
      const { entry } = response.data;
      // everything is 0:00 until first response.data.intervals[0].crossing_time != null
      // estimate pace, finishtime, distance traveled until overall time = null
      // throttle - 1 minute (store lastChronoTrackCheck Time.Now)
      this.setState({
        finishTime: entry.overall_time == null ? "0:00" : entry.overall_time,
        avgMile: entry.overall_pace == null ? "0:00" :  entry.overall_pace.replace("00:",""),
        startTime: response.data.intervals[0].crossing_time == null ? "9:00" : response.data.intervals[0].crossing_time.replace("AM",""),
      });
    }).catch(e => {
      console.log(e);
    })
  }

  dropDownMenu(){
    console.log("Drop Down Accessed");
  }

  render(){
    const { width, height } = Dimensions.get('window');
    return(
      <View style={styles.mainContainer}>
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
                <Text style={{color: '#FFFFFF', fontSize: 18, opacity: .7}}>Finish Time</Text>
              </View>
              <View style={{flex:1, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 60}}>
                <View style={{flex: 1, }}>
                  <Text style={{textAlign: 'center', fontWeight: 'bold', color: 'white', fontSize: 22}}>{this.state.avgMile}</Text>
                  <Text style={{textAlign: 'center', color: '#FFFFFF', opacity: .7}}>Avg Mile</Text>
                </View>
                <View style={{flex: 1, }}>
                  <Text style={{textAlign: 'center', fontWeight: 'bold', color: 'white', fontSize: 22}}>{this.state.startTime}</Text>
                  <Text style={{textAlign: 'center', color: '#FFFFFF', opacity: .7}}>Start Time</Text>
                </View>
                <View style={{flex: 1, }}>
                  <Text style={{textAlign: 'center', fontWeight: 'bold', color: 'white', fontSize: 22}}>12K</Text>
                  <Text style={{textAlign: 'center', color: '#FFFFFF', opacity: .7}}>Total Distance</Text>
                </View>
              </View>
            </View>
        </View>
        <View style={styles.bottomView}>
          <TextInput placeholder={'Bib #'} style={styles.input} value={this.state.bibInput} keyboardType='numeric' returnKeyType={ 'done' } onChangeText={(text) => this.setState({ bibInput: text }) } />
          <TouchableOpacity onPress={() => this.getRaceData()} style={{marginLeft:32,marginRight:32,marginTop:16,height:64,borderRadius:8,backgroundColor:'#a260a9',justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize: 24, fontFamily:'roboto-bold', color:'white', textAlign:'center'}}>SEARCH</Text>
          </TouchableOpacity>
        </View>
      </View>
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
