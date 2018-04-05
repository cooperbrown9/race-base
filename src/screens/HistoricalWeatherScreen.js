import React, { Component } from 'react';
import { View,
         Text,
         Image,
         StyleSheet,
         TouchableOpacity,
         ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import NavBar from '../ui-elements/nav-bar.js';
import HistoricalDay from '../ui-elements/historical-day.js';


export default class HistoricalWeatherScreen extends Component {

  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    index: 1
  }

  dropDownMenu(){
    console.log("Drop Down Accessed");
  }

  render(){
    return(
      <View style={{flex:1}}>
      <NavBar leftButton={<Image source={require('../../assets/icons/bars.png')} style={{height: 20, width: 20, tintColor: 'white'}}/>}
              rightButton={<Image source={require('../../assets/icons/profile.png')} style={{height: 22, width: 22, tintColor: 'white'}}/>}
              title={<TouchableOpacity onPress={this.dropDownMenu.bind(this)}>
                      <Text style={{color:'white', fontSize: 16}}>Historical Weather ⌄</Text>
                     </TouchableOpacity>}
              style={{position:'absolute'}}
      />
      <ScrollView style={{flex:1}}>
          <HistoricalDay date={'May 6, 2015'}
                          windIcon1={<Image source={require('../../assets/icons/north.png')} style={{height: 12, width: 20, marginBottom: 5, tintColor:'#55BBDD'}}/>}
                          temp1={'56°'}
                          wind1={'6'}
                          humidity1={'12'}
                          windIcon2={<Image source={require('../../assets/icons/west.png')} style={{height: 15, width: 20, marginBottom: 5, tintColor:'#55BBDD'}}/>}
                          temp2={'62°'}
                          wind2={'8'}
                          humidity2={'10'}
                          windIcon3={<Image source={require('../../assets/icons/east.png')} style={{height: 15, width: 20, marginBottom: 5, tintColor:'#55BBDD'}}/>}
                          temp3={'71°'}
                          wind3={'3'}
                          humidity3={'14'}
         />
         <HistoricalDay date={'May 6, 2015'}
                         windIcon1={<Image source={require('../../assets/icons/north.png')} style={{height: 15, width: 20, marginBottom: 5, tintColor:'#55BBDD'}}/>}
                         temp1={'56°'}
                         wind1={'6'}
                         humidity1={'12'}
                         windIcon2={<Image source={require('../../assets/icons/west.png')} style={{height: 15, width: 20, marginBottom: 5, tintColor:'#55BBDD'}}/>}
                         temp2={'62°'}
                         wind2={'8'}
                         humidity2={'10'}
                         windIcon3={<Image source={require('../../assets/icons/east.png')} style={{height: 15, width: 20, marginBottom: 5, tintColor:'#55BBDD'}}/>}
                         temp3={'71°'}
                         wind3={'3'}
                         humidity3={'14'}
        />
        <HistoricalDay date={'May 6, 2015'}
                        windIcon1={<Image source={require('../../assets/icons/north.png')} style={{height: 15, width: 20, marginBottom: 5, tintColor:'#55BBDD'}}/>}
                        temp1={'56°'}
                        wind1={'6'}
                        humidity1={'12'}
                        windIcon2={<Image source={require('../../assets/icons/west.png')} style={{height: 15, width: 20, marginBottom: 5, tintColor:'#55BBDD'}}/>}
                        temp2={'62°'}
                        wind2={'8'}
                        humidity2={'10'}
                        windIcon3={<Image source={require('../../assets/icons/east.png')} style={{height: 15, width: 20, marginBottom: 5, tintColor:'#55BBDD'}}/>}
                        temp3={'71°'}
                        wind3={'3'}
                        humidity3={'14'}
       />
      </ScrollView>
      </View>
    );
  }

}
