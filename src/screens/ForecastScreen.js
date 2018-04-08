import React, { Component } from 'react';
import { View,
         Text,
         Image,
         StyleSheet,
         TouchableOpacity,
         ScrollView,
         Modal,
         Dimensions,
         Button,
} from 'react-native';
import { connect } from 'react-redux';
import NavBar from '../ui-elements/nav-bar.js';
import ForecastDay from '../ui-elements/forecast-day.js';
import Menu from './Menu.js';
import SideMenu from 'react-native-side-menu';
import * as Colors from '../style/colors.js'


class ForecastScreen extends Component {

  static navigationOptions = {
    header: null,
  };


  state = {
    menuOpen: false,
    
  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen }, () => {
      this.props.dispatch({ type: (this.state.menuOpen) ? 'OPEN' : 'CLOSE' });
    })
  }

  loadMenuItems = () => {
   axios.get('https://crave-scoop.herokuapp.com/get-vendor-products/' + this.props.model._id).then(response => {
     // pulls out all available products and stores in newProducts
     let newProducts = [];

     for(let i = 0; i < response.data.length; i++) {
       response.data[i].timeSince = this.calculateTimeSinceUpdate(parseInt(response.data[i].timestamp));
       if(response.data[i].instock === 'available') {
         newProducts.push(response.data[i]);
         console.log(response.data[i]);
       }
     }
     this.setState({ products: newProducts.sort(function(a, b) {
       if (!a.hasOwnProperty('rank') || isNaN(a.rank) || a.rank == "") {
         a.rank = 0;
       }
       if(!b.hasOwnProperty('rank') || isNaN(b.rank) || b.rank == "") {
         b.rank = 0;
       }
       return parseFloat(a.rank) - parseFloat(b.rank);
     }) });
   });
 }



  dropDownMenu(){
    console.log("Drop Down Accessed");
  }

  render(){
    const { width, height } = Dimensions.get('window');
    return(
      <View style={{flex:1, backgroundColor: 'white'}}>
      <NavBar leftButton={<Image source={require('../../assets/icons/bars.png')} style={{height: 20, width: 20, tintColor: 'white'}}/>}
              leftOnPress={this.toggleMenu.bind(this)}
              title={<Text style={{color:'white', fontSize: 16, fontFamily: 'roboto-bold'}}>Forecast</Text>}
              style={{position:'absolute'}}
      />
      {/*<Modal animationType={"slide"} transparent={true} visible={this.state.menuOpen} >
        <Menu dispatcher={this.props.dispatch} dismiss={() => {this.setState({menuOpen: false})}} from={'Schedule'}/>
      </Modal>*/}

      <ScrollView style={{flex:1}}>
        <View style={styles.currentWeather}>
          <View style={styles.dateInfoContainer}>
            <Text style={{fontSize: 48, color: '#55BBDD'}}>TUE</Text>
            <Text style={{fontSize: 24, marginTop:5,  color: '#55BBDD'}}>MAR 12</Text>
          </View>

          <View style={styles.weatherIconContainer}>
            <Image source={require('../../assets/icons/weather/partlyCloudy.png')} style={{marginLeft: 45, height: 80, width:80, resizeMode:'contain'}}/>
          </View>

          <View style={styles.tempInfoContainer}>
            <Text style={{fontSize: 36, color: '#55BBDD', }}>{89}</Text>
            <Text style={{fontSize: 20, color: '#55BBDD', }}>{'H: ' + 90}</Text>
            <Text style={{fontSize: 20, color: '#55BBDD', }}>{'L: ' + 76}</Text>
          </View>
        </View>
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
    nav: state.nav,

  }
}

const styles = StyleSheet.create({

  currentWeather:{
    flexDirection: 'row',
    flex:1,
    height: 150,
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    borderBottomWidth: 1
  },
  dateInfoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  weatherIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  tempInfoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleLabel: {
    height: 20,
    fontSize: 14,
    alignItems: 'center',
    marginTop: 8,
    color: Colors.DARK_GREY
  },
  rightButton: {
    height: 40,
    marginTop: 12,
    marginRight: 32,
    width:64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBarButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  optionsView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 20,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 24
  },
  checkbox: {
    backgroundColor: 'blue',
    height: 24,
    width: 24,
    borderRadius: 16,
  },
  text: {
    fontSize: 18,
  },
  underline: {
    backgroundColor: Colors.LIGHT_GREY,
    height: 2,
    marginLeft: 16,
    marginTop: 16,
    marginRight: 16
  },
  buttonStyle: {
    marginRight: 64,
    marginLeft: 64,
    marginTop: 128
  }


});




export default connect(mapStateToProps)(ForecastScreen);
