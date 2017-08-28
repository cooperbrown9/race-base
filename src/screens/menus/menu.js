import React from 'react';
var PropTypes = React.PropTypes;
import SideMenu from 'react-native-side-menu';
import Menu from '../../constants/menu.js';

const MenuContainer = props => (
  <SideMenu menu={<Menu  /> } isOpen={this.props.menuOpen}>
    {props.screen}
  </SideMenu>


)

MenuTemplate.navigateFunc(func) {
  func();
}

MenuTemplate.propTypes = {
  screen: PropTypes.element.isRequired,
  menuOpen: PropTypes.bool.isRequired
}
