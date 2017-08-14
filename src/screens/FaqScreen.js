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
import FAQItem from '../ui-elements/faq-item.js';


export default class FaqScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    isOpen: false,
    faqs : [
      {question: 'When is Bloomsday?', answer: 'First weekend in May', isOpen: false},
      {question: 'How do I volunteer?', answer: 'Visit Bloomsday.com to register to volunteer on race day', isOpen: false},
      {question: 'How do I find lodging information for Bloomsday weekend?', answer: 'Visit Bloomsday.com for lodging info or search for Spokane hotels and check their availability', isOpen: false},
      {question: 'How many people have done every Bloomsday?', answer: '69', isOpen: false},
      {question: 'Where does the name "Lilac Bloomsday" come from?', answer: 'Yo momma', isOpen: false},
      {question: 'What is Doomsday Hill?', answer: 'One of the hardest parts of the race, conveniently located in the second half', isOpen: false},


    ]
  }

  dropDownMenu(){
    console.log("Drop Down Accessed");
  }

  _toggleIsOpen(){
    this.setState({isOpen: !this.state.isOpen});
  }

  selected = (faq) => {
    return function() {
      faq.isOpen = !faq.isOpen;
      this.setState(this.state);
    }
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
        {this.state.faqs.map(faq => <FAQItem isOpen={faq.isOpen} action={this.selected(faq).bind(this)} question={faq.question} answer={faq.answer}/> )}
      </ScrollView>
      </View>
    );
  }

}
