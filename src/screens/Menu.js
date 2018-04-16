import React from 'react';
import {
  View,
   Text,
   Image,
   StyleSheet,
   TouchableOpacity,
   ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import * as NavActions from '../action-types/navigation-action-types.js';
//nav bar height is 64

const options = [
  {name: '', iconPath: require('../../assets/icons/navigation/left-arrow.png'), path: NavActions.GO_HOME},
  {name: 'Schedule', iconPath: require('../../assets/icons/navigation/calendar.png'), path: NavActions.GO_SCHEDULE},
  {name: 'FAQ', iconPath: require('../../assets/icons/navigation/faq.png'), path: NavActions.GO_FAQ},
  //{name: 'Maps', iconPath: require('../../assets/icons/navigation/maps.png'), path: NavActions.GO_TRACKING},
  {name: 'Maps', iconPath: require('../../assets/icons/navigation/maps.png'), path: NavActions.GO_RESOURCE_MAPS},
  {name: 'Weather', iconPath: require('../../assets/icons/navigation/weather.png'), path: NavActions.GO_FORECAST},
  {name: 'Race Results', iconPath: require('../../assets/icons/navigation/tracking-results.png'), path: NavActions.GO_RESULTS},
  {name: 'Social', iconPath: require('../../assets/icons/navigation/chat.png'), path: NavActions.GO_SOCIAL},
  {name: 'Around Town', iconPath: require('../../assets/icons/navigation/school.png'), path: NavActions.GO_AROUNDTOWN},
  {name: 'Fly Over Video', iconPath: require('../../assets/icons/navigation/play.png'), path: NavActions.GO_FLYOVER},
  {name: 'Sponsors', iconPath: require('../../assets/icons/navigation/handshake.png'), path: NavActions.GO_SPONSOR},

];

// <TouchableOpacity style={{ position:'absolute',left:32,top:32,height:64,width:64}} onPress={() => { props.navigateFunc(NavActions.GO_HOME)}} >
//   <View style={styles.imageContainer}>
//     <Image source={require('../../assets/icons/navigation/left-arrow.png')} style={styles.iconStyle}/>
//   </View>
// </TouchableOpacity>
// <View style={{height:64}}></View>

const Menu = (props) => (

  <View style={{backgroundColor: 'white', flex:1}} >

    <ScrollView style={styles.container} >
      <View style={{height: 40, backgroundColor: 'transparent'}}></View>

      {options.map((menuItem) => {
        return(
          <TouchableOpacity style={styles.menuItem} onPress={() => { props.navigateFunc(menuItem.path) } } key={menuItem.name} >
            <View style={styles.imageContainer}>
              <Image source={menuItem.iconPath} style={styles.iconStyle}/>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.menuItemName}>{menuItem.name}</Text>
            </View>
          </TouchableOpacity>
        )
      }
    )}


    </ScrollView>
  </View>
)

Menu.propTypes = {
  navigator: PropTypes.object,
  navigateFunc: PropTypes.func
}

const styles = StyleSheet.create({
  container:{
    marginTop: 16,
    flex: 1,
    flexDirection: 'column',

  },
  menuItem: {
    height: 48,
    flexDirection: 'row',
    marginBottom: 8
  },
  iconStyle: {
    height: 36,
    width: 36
  },
  menuItemName: {
    fontSize: 15,
    marginLeft: 14,
    color: 'gray'
  },
  imageContainer: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  nameContainer: {
    flex: 5,
    justifyContent: 'center',
  },
});

export default Menu;
