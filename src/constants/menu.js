import React from 'react';
import {
  View,
   Text,
   Image,
   StyleSheet,
   TouchableOpacity,
   ScrollView
} from 'react-native';
import * as NavActions from '../action-types/navigation-action-types.js';
//nav bar height is 64

const options = [
  {name: 'Schedule', iconPath: require('../../assets/icons/navigation/calendar.png'), path: NavActions.GO_FORECAST},
  {name: 'Register', iconPath: require('../../assets/icons/navigation/list.png'), path: NavActions.GO_FORECAST},
  {name: 'FAQ', iconPath: require('../../assets/icons/navigation/faq.png'), path: NavActions.GO_FAQ},
  {name: 'Maps', iconPath: require('../../assets/icons/navigation/maps.png'), path: NavActions.GO_FORECAST},
  {name: 'Tracking & Results', iconPath: require('../../assets/icons/navigation/tracking-results.png'), path: NavActions.GO_TRACKING},
  {name: 'Weather', iconPath: require('../../assets/icons/navigation/weather.png'), path: NavActions.GO_FORECAST},
  {name: 'Social', iconPath: require('../../assets/icons/navigation/chat.png'), path: NavActions.GO_FORECAST},
  {name: 'Around Town', iconPath: require('../../assets/icons/navigation/school.png'), path: NavActions.GO_FORECAST},

];

const Menu = (props) => (

  <View style={{backgroundColor: 'white', flex:1}} >

    <ScrollView style={styles.container} >
      <View style={{height: 40, backgroundColor: 'transparent'}}></View>
      {options.map((menuItem) => {
        return(
          <TouchableOpacity style={styles.menuItem} onPress={() => props.navigateFunc(menuItem.path) } key={menuItem.name} >
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
  navigateFunc: React.PropTypes.func
}

const styles = StyleSheet.create({
  container:{
    marginTop: 20,
    flex: 1,
    flexDirection: 'column',

  },
  menuItem: {
    height: 70,
    flexDirection: 'row',

  },
  iconStyle: {
    height: 42,
    width: 40
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
