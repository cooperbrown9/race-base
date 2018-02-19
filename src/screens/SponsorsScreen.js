import React from 'react';
import { View,
         Text,
         Image,
         StyleSheet,
         Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import NavBar from '../ui-elements/nav-bar.js';
// import Menu from './menus/main-menu.js';

import Menu from './Menu.js';
import SideMenu from 'react-native-side-menu';

class SponsorsScreen extends React.Component {

  constructor() {
    super();

    this.state = {
      menuOpen: false,
    }
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {

  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen }, () => {
      this.props.dispatch({ type: (this.state.menuOpen) ? 'OPEN' : 'CLOSE' });
    })
  }

  render(){
    const { width, height } = Dimensions.get('window');
    return(
      <View style={{flex:1, backgroundColor: 'white'}}>
        <NavBar leftButton={<Image source={require('../../assets/icons/bars.png')} style={{height: 20, width: 20, tintColor: 'white'}}/>}
                leftOnPress={this.toggleMenu.bind(this)}
                title={<Text style={{color:'white', fontSize: 16}}>Our Sponsors</Text>}
                style={{position:'absolute'}}
        />

        <View style={styles.imageContainer}>
          <Image style={styles.backgroundImage} source={require('../../assets/icons/Sponsors.png')} />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
     flex: 1,
     resizeMode: 'contain',
     alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center'
  },
});

  var mapStateToProps = state => {
    return {
      nav: state.nav,

    }
  }

export default connect(mapStateToProps)(SponsorsScreen);
