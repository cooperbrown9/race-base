import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import * as NavActions from '../../action-types/navigation-action-types.js';
import * as Screens from '../../constants/screen-types.js';

class Menu extends React.Component {

  static propTypes = {
    dispatcher: React.PropTypes.func,
    dismiss: React.PropTypes.func,
    from: React.PropTypes.string
  }

  state = {
    itemVisible: false
  }


  componentDidMount() {

  }

  _navigate(path) {
    this.props.dispatcher({ type: path });
    this.props.dismiss();
    // this.props.dispatch({ type: path });
  }

  _close() {
    this.props.dismiss();
  }

  render() {
    let menuOptions = [
      {name: 'Schedule', iconPath: require('../../../assets/icons/navigation/calendar.png'), path: NavActions.GO_FORECAST},
      {name: 'Register', iconPath: require('../../../assets/icons/navigation/list.png'), path: NavActions.GO_FORECAST},
      {name: 'FAQ', iconPath: require('../../../assets/icons/navigation/faq.png'), path: NavActions.GO_FAQ},
      {name: 'Maps', iconPath: require('../../../assets/icons/navigation/maps.png'), path: NavActions.GO_FORECAST},
      {name: 'Tracking & Results', iconPath: require('../../../assets/icons/navigation/tracking-results.png'), path: NavActions.GO_TRACKING},
      {name: 'Weather', iconPath: require('../../../assets/icons/navigation/weather.png'), path: NavActions.GO_FORECAST},
    ];
    menuOptions.map((o) => {
      (this.props.from == o.name) ? o.enabled = false : o.enabled = true;
    })
    return (
      <View style={styles.container} >
        <ScrollView contentContainerStyle={{flexGrow: 1}} >
          <View style={{height: 40, backgroundColor: 'transparent'}}></View>
          {menuOptions.map((menuItem) => {
            return(
              <TouchableOpacity style={(this.props.loaded) ? styles.menuItem : stylesHidden.menuItem} onPress={() => { this._navigate(menuItem.path) } } key={menuItem.name} >
                <View style={styles.nameContainer}>
                  <Text style={styles.menuItemName}>{(menuItem.enabled) ? menuItem.name : 'bruuuh'}</Text>
                </View>
              </TouchableOpacity>
            )
          this.setState({ itemVisible: true })
          }
        )}
        <TouchableOpacity onPress={() => {this._close()}}>
          <Text>CLOSE</Text>
        </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    flexDirection: 'column',
    justifyContent: 'center',
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
    fontSize: 24,
    color: 'white',
    textAlign: 'center'
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

const stylesHidden = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
    flexDirection: 'column',
    justifyContent: 'center',
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
    fontSize: 24,
    color: 'white',
    textAlign: 'center'
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
