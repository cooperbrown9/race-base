import React from 'react';
import { View,
         Text,
         Image,
         StyleSheet,
         TouchableOpacity,
         ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import NavBar from '../ui-elements/nav-bar.js';
import FaqQuestion from '../ui-elements/faq-question.js';


export default class FaqScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    isOpen: 'false'
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
                      <Text style={{color:'white', fontSize: 16}}>FAQ ⌄</Text>
                     </TouchableOpacity>}
              style={{position:'absolute'}}
      />
      <ScrollView style={{flex:1}}>
        <FaqQuestion isOpen={true}/>

      </ScrollView>
      </View>
    );
  }

}
