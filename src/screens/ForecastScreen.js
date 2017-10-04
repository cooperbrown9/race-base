import React from 'react';
import { View,
         Text,
         Image,
         StyleSheet,
         TouchableOpacity,
         ScrollView,
         Modal
} from 'react-native';
import { connect } from 'react-redux';
import NavBar from '../ui-elements/nav-bar.js';
import ForecastDay from '../ui-elements/forecast-day.js';
import Menu from './menus/main-menu.js';
import * as Screens from '../constants/screen-types.js';


class ForecastScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    menuOpen: false
  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  dropDownMenu(){
    console.log("Drop Down Accessed");
  }

  render(){
    return(
      <View style={{flex:1}}>
      <NavBar leftButton={<Image source={require('../../assets/icons/bars.png')} style={{height: 20, width: 20, tintColor: 'white'}}/>}
              rightButton={<Image source={require('../../assets/icons/profile.png')} style={{height: 22, width: 22, tintColor: 'white'}}/>}
              leftOnPress={this.toggleMenu.bind(this)}
              title={<TouchableOpacity onPress={this.dropDownMenu.bind(this)}>
                      <Text style={{color:'white', fontSize: 16}}>Forecast ⌄</Text>
                     </TouchableOpacity>}
              style={{position:'absolute'}}
      />
    <Modal animationType={"slide"} transparent={true} visible={this.state.menuOpen} >
        <Menu dispatcher={this.props.dispatch} dismiss={() => {this.setState({menuOpen: false})}} from={'Schedule'}/>
      </Modal>
      <ScrollView style={{flex:1}}>
          <ForecastDay/>
          <ForecastDay/>
          <ForecastDay/>
          <ForecastDay/>

      </ScrollView>
      </View>
    );
  }

}

var mapStateToProps = state => {
  return {
    nav: state.nav
  }
}

export default connect(mapStateToProps)(ForecastScreen);
