import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { BuildingSelection } from '../Assets/constants/constants';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';
import { CloseButton } from '../ScreenComponents/Buttons';
import { RadioButton } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
export default function SuggestionsScreen() {

  const navigation = useNavigation('');
  const [checked, setChecked] = useState('first');
  const [text, setText] = useState("");
  const [value, setvalue] = useState();


  const MessageInput = (props) => {
    return (
      <TextInput
        {...props}
        editable
        maxLength={1100}
      />
    );
  }

  return (
    <ImageBackground  style = {styles.Container} 
    resizeMode = 'cover'
    source = {require('../Assets/Img/Background_image2.png')}>
      <CloseButton
      
        name = "arrow-back"
        onPress = {() => navigation.navigate('Student_HomeScreen')}
        size = {50}
        style = {{flexDirection: 'row', top: 0, left: 0, position: 'absolute', marginVertical: 27, marginHorizontal: 20}}

      />
    <View style = {styles.BoxContainer}>
      <View style = {{flexDirection: 'row',}}>
        <View style = {styles.ButtonContainer} >
          <RadioButton
            value="first"
            color='#0f2ed6'
            status={ checked === 'first' ? 'checked' : 'unchecked' }
            onPress={() => setChecked('first')}
          />
          <Text style = {{fontSize: 20,}}>Suggestion</Text>
        </View>
        <View style = {styles.ButtonContainer} >
          <RadioButton
            value="second"
            color='#0f2ed6'
            status={ checked === 'second' ? 'checked' : 'unchecked' }
            onPress={() => setChecked('second')}
          />
          <Text style = {{fontSize: 20,}}>Feedback</Text>
        </View>
      </View>
      <View style = {{margin: 5}} >
        <Text>Fullname</Text>
        <View style = {styles.TextInput} >
          <TextInput
            style = {{marginLeft: 20, fontSize: 20}}
            placeholder = 'e.g, John Doe'
        />
        </View>
      </View>
      <View style = {{margin: 5}} >
        <Text>Subject</Text>
        <View style = {styles.TextInput} >
          <TextInput
            style = {{marginLeft: 20, fontSize: 20}}
            placeholder = 'e.g, name of building, offices, employee, faculty...'
        />
        </View>
      </View>
      <View style = {{margin: 20}} >
        <Text>Message</Text>
        <View style = {styles.MessageInputtext} >
          <MessageInput
            style = {{margin: 20, fontSize: 20}}
            placeholder = 'Write your message here...'   
            multiline
        />
        </View>
      </View>
      <TouchableOpacity
         style = {styles.Search}
        onPress = {{}}
        
         >
            <Text style = {{textAlign: 'center', color: '#0f2ed6', fontSize: 20, fontWeight: '600'}}>
                Submit
            </Text>
      </TouchableOpacity>
    </View>
      <Text style = {{textAlign: 'center', position: 'absolute', top: 20, fontSize: 20, }}>Submit a suggestion or feedback</Text>
    </ImageBackground>
  )
};

const styles = StyleSheet.create({


  Container: {

    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',

  },

  Search: {

    width: 150,
    height: 50,
    backgroundColor: '#fddf54',
    borderRadius: 100,
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.41,
    elevation: 2,

  },

  TextInput: {


    backgroundColor: '#f2f3f7',
    width: 600,
    borderRadius: 15,
    height: 50,
    marginTop: 10,
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    shadowColor: "#000",
    shadowOffset: {
	    width: 1,
	    height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,

  },
  MessageInputtext: {


    backgroundColor: '#f2f3f7',
    width: 600,
    borderRadius: 15,
    height: 200,
    marginTop: 10,
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    flexDirection: 'row',
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,

},

  BoxContainer: {

    width: 1000, 
    height: 700, 
    backgroundColor: '#00000019', 
    marginTop: 70, 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center'


  },

  ButtonContainer: {
    
    flexDirection: 'row', 
    width: 100, 
    height: 30, 
    margin: 25, 
    justifyContent: 'center', 
    alignItems: 'center'
  
  },

  ButtonStyle: {  
    
    backgroundColor: 'white', 
    borderRadius: 20, 
    width: 400
  
  },

  
})



{/* <View style  = {{}}>
      <Text> Feedback Address</Text>
      <SelectDropdown
      data = {BuildingSelection}
      buttonStyle = {styles.ButtonStyle}
      defaultButtonText = 'Category'
      renderDropdownIcon= {isOpened => {
        return <Icon name={isOpened ? 'expand-more' : 'expand-less'} color={'#444'} size={40} />;
      }}
      />
    </View> */}