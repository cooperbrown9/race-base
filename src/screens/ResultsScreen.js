import React, { Component } from 'react';
import { View,
         Text,
         Image,
         StyleSheet,
         TouchableOpacity,
         ScrollView,
         Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import NavBar from '../ui-elements/nav-bar.js';
import Menu from './Menu.js';
import SideMenu from 'react-native-side-menu';
import PropTypes from 'prop-types';

const CHRONOTRACK_URL = 'https://api.chronotrack.com/api/results/37865/bib/4?format=json&client_id=727dae7f&user_id=matt%40ransdellbrown.com&user_pass=cf5d3438ea8d630cb91e3d89fc8e9021cbd00b5f';

class ResultsScreen extends Component {

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

  dropDownMenu(){
    console.log("Drop Down Accessed");
  }




  render(){
    const { width, height } = Dimensions.get('window');
    return(
      <View style={styles.mainContainer}>
        <NavBar leftButton={<Image source={require('../../assets/icons/bars.png')} style={{height: 20, width: 20, tintColor: 'white'}}/>}
                rightButton={<Image source={require('../../assets/icons/profile.png')} style={{height: 22, width: 22, tintColor: 'white'}}/>}
                leftOnPress={this.toggleMenu.bind(this)}
                title={<TouchableOpacity onPress={this.dropDownMenu.bind(this)}>
                        <Text style={{color:'white', fontSize: 16}}>RESULTS ⌄</Text>
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
                <Text style={{color: 'white', textAlign: 'center', fontSize: 60, fontWeight: 'bold'}}>{this.props.finishTime}</Text>
                <Text style={{color: '#FFFFFF', fontSize: 18, opacity: .7}}>Finish Time</Text>
              </View>
              <View style={{flex:1, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 60}}>
                <View style={{flex: 1, }}>
                  <Text style={{textAlign: 'center', fontWeight: 'bold', color: 'white', fontSize: 22}}>{this.props.avgMile}</Text>
                  <Text style={{textAlign: 'center', color: '#FFFFFF', opacity: .7}}>Avg Mile</Text>
                </View>
                <View style={{flex: 1, }}>
                  <Text style={{textAlign: 'center', fontWeight: 'bold', color: 'white', fontSize: 22}}>{this.props.fastestMile}</Text>
                  <Text style={{textAlign: 'center', color: '#FFFFFF', opacity: .7}}>Fastest Mile</Text>
                </View>
                <View style={{flex: 1, }}>
                  <Text style={{textAlign: 'center', fontWeight: 'bold', color: 'white', fontSize: 22}}>{this.props.totalDistance}</Text>
                  <Text style={{textAlign: 'center', color: '#FFFFFF', opacity: .7}}>Total Distance</Text>
                </View>
              </View>
            </View>
        </View>
        <TouchableOpacity style={styles.bottomView}>
          <Text style={{color: '#A260A9', fontSize: 18, textAlign: 'center'}}>Share Results on Facebook</Text>
        </TouchableOpacity>
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
  topView: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
    flex:2
  },
  bottomView: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    marginBottom: 20
  }

});
var mapStateToProps = state => {
  return {
    nav: state.nav,

  }
}

export default connect(mapStateToProps)(ResultsScreen);
