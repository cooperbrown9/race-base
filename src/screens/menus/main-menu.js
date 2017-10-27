import React from 'react';
import { StyleSheet, View, Animated, Easing, ScrollView, TouchableOpacity, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import * as NavActions from '../../action-types/navigation-action-types.js';
import * as Screens from '../../constants/screen-types.js';

class Menu extends React.Component {

  constructor(props) {
    super(props);
    var colorVal = new Animated.Value(0);
    this.state.x = new Animated.Value('green');
    // this.setState(this.state);
  }

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

  changeColor() {
    this.colorVal.setValue(0);
    Animated.timing(
      this.colorVal,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.easeOutBack,
        color: 'red'
      }
    ).start();
  }

  render() {
    let color = this.state.x.interpolate({
      inputRange: [0, 2000],
      outputRange: ['red', 'blue']
    });

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
      <View style={{flex: 1,
          flexDirection: 'column',
          justifyContent: 'center', backgroundColor: color}}
      >
        <ScrollView contentContainerStyle={{flexGrow: 1}} >
          <View style={{height: 40}}></View>
          {menuOptions.map((menuItem) => {
            return(
              <Animated.View>
              <TouchableOpacity style={(this.props.loaded) ? styles.menuItem : stylesHidden.menuItem} onPress={() => { (menuItem.enabled) ? this._navigate(menuItem.path) : this.props.dismiss() } } key={menuItem.name} >
                <View style={styles.nameContainer}>
                  <Text style={(menuItem.enabled) ? styles.menuItemName : styles.menuItemNameDisabled}>{menuItem.name}</Text>
                </View>
              </TouchableOpacity>
              </Animated.View>
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
  menuItemNameDisabled: {
    fontSize: 24,
    color: 'rgba(255,255,255,0.7)',
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
