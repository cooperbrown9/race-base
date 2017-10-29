import React from 'react';
import { connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';
import ResultsScreen from '../ResultsScreen.js';
import Menu from '../Menu.js';
import * as NavActions from '../../action-types/navigation-action-types.js';

class ResultsMenu extends React.Component {

  static navigationOptions = {
    header: null
  }

  componentDidMount(){
    console.log("mounts");
  }

  _navigate(path) {
    this.props.dispatch({type: 'CLOSE'  });
    this.props.navigation.dispatch({ type: path });
  }

  render() {
    const menu = <Menu navigator={this.props.navigator} navigateFunc={this._navigate.bind(this)} />
    return(
      <ResultsMenu menu={menu} isOpen={this.props.menuOpen} >
        <ResultsScreen />
      </ResultsMenu>

    )
  }
}

var mapStateToProps = (state) => {
  return {
    navigator: state.nav,
    menuOpen: state.menuStatus.isOpen
  }
}

export default connect(mapStateToProps)(ResultsMenu);
