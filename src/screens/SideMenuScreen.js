import React from 'react';
import { View,
         Text,
         Image,
         StyleSheet,
         TouchableOpacity,
         ScrollView
} from 'react-native';
//nav bar height is 64
export default class SideMenuScreen extends React.Component {

  static navigationOptions = {
    header: null,

  };

  state = {
    options: [
      {name: 'Schedule', iconPath:require('../../assets/icons/navigation/calendar.png')},
      {name: 'Register', iconPath:require('../../assets/icons/navigation/list.png')},
      {name: 'FAQ', iconPath:require('../../assets/icons/navigation/faq.png')},
      {name: 'Maps', iconPath:require('../../assets/icons/navigation/maps.png')},
      {name: 'Tracking & Results', iconPath:require('../../assets/icons/navigation/tracking-results.png')},
      {name: 'Weather', iconPath:require('../../assets/icons/navigation/weather.png')},
      {name: 'Social', iconPath:require('../../assets/icons/navigation/chat.png')},
      {name: 'Around Town', iconPath:require('../../assets/icons/navigation/school.png')},

    ],
  }

  render() {
    return(
      <View style={{backgroundColor: 'white', flex:1}}>
        <ScrollView style={styles.container}>

          {this.state.options.map((menuItem) => {
            return(
                <TouchableOpacity style={styles.menuItem}>
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



    );
  }
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
