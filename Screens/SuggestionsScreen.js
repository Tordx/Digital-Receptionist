import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground ,Alert } from 'react-native'
import React, { useState , useEffect } from 'react'
import { BuildingSelection } from '../Assets/constants/constants';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';
import { CloseButton } from '../Components/Buttons';
import { RadioButton } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { localDBSuggestionFeedback , remoteDBSuggestionFeedback } from '../Database/pouchDb';
import { Picker } from '@react-native-picker/picker';
import uuid from 'react-native-uuid';
import { useSelector } from 'react-redux';

export default function SuggestionsScreen() {

  const user = useSelector(state => state.essensials.user)
  const navigation = useNavigation('');

  const [checked, setChecked] = useState('Suggestion');
  const [text, setText] = useState("");
  const [value, setvalue] = useState('');
  const [name, setName] = useState('');
  const [specify, setSpecify] = useState('');

  const setNewSuggestion = async () => {
    
    const id = uuid.v4();

     try {
       var NewSuggestion = {
          _id: id,
          Message : text,
          Department : value,
          Name: name,
          FeedbackorSuggestion : checked,
          SpecifySuggestion : specify
       }
       remoteDBSuggestionFeedback.put(NewSuggestion)
       .then((response) =>{
         Alert.alert('Your Schedule has been successfully added!')
         console.log(response)
        //  SyncSuggestionFeedback()
         navigation.navigate('StudentHomeScreen')
       })
       .catch(err=>console.log(err))
       
     } catch (error) {
      console.log(error)
     }

    }
  return (
    <ImageBackground  style = {styles.Container} 
    resizeMode = 'cover'
    source = {require('../Assets/Img/Background_image.png')}>
      
    <Text style = {{textAlign: 'center', fontSize: 25, fontFamily: 'black', color: '#202020', textShadowRadius: 1, }}>Submit a suggestion or feedback</Text>
    <View style = {styles.BoxContainer}>
      <View style = {{justifyContent: 'center', alignItems: 'center', width: '50%', height: '100%', padding: 10  , }}>
      <View style = {{flexDirection: 'row',}}>
        <View style = {styles.ButtonContainer} >
          <RadioButton
            value="Suggestion"
            color='#0f2ed6'
            status={ checked === 'Suggestion' ? 'checked' : 'unchecked' }
            onPress={() => setChecked('Suggestion')}
          />
          <Text style = {{fontSize: 20,fontFamily: 'extrabold', color: '#202020' }}>Suggestion</Text>
        </View>
        <View style = {styles.ButtonContainer} >
          <RadioButton
            value="Feedback"
            color='#0f2ed6'
            status={ checked === 'Feedback' ? 'checked' : 'unchecked' }
            onPress={() => setChecked('Feedback')}
          />
          <Text style = {{fontSize: 20,fontFamily: 'extrabold', color: '#202020'}}>Feedback</Text>
        </View>
      </View>
      <View style = {{margin: 5}} >
        <Text style = {{fontSize: 17,fontFamily: 'extrabold', color: '#202020'}}>Fullname <Text style = {{fontStyle: 'italic'}}>(Optional)</Text></Text>
        <View style = {styles.TextInput} >
          <TextInput
            onChangeText={(value) => setName(value)}
            value={name}
            style = {{marginLeft: 20, fontSize: 17, fontFamily: 'regular', width: '100%', height: '100%'}}
            placeholder = 'e.g, John Doe'
        />
        </View>
      </View>
      <View style = {{justifyContent: 'flex-start', margin: 5}}>
      <Text style = {{fontSize: 17, textAlign: 'left',fontFamily: 'extrabold', color: '#202020'}}>Subject</Text>
      
      <View
                
                    style = {styles.TextInput}> 
                    
                <Picker
                        title = 'Select Category'
                        selectedValue={value}
                        mode="dropdown"
                        style={{
                            transform: [
                               { scaleX: 1 }, 
                               { scaleY: 1 },
                            ],
                            width: '100%', 
                            height: '100%',
                        bottom: 0,
                        color: '#000',
                         fontFamily: 'regular'
                          }}
                        onValueChange={(itemValue, itemIndex) => setvalue(itemValue)}
                    >
                        <Picker.Item enabled = {false} label="Select" value="Select" />
                        <Picker.Item label="Campus" value="CA" />
                        <Picker.Item label="Building" value="BU" />
                        <Picker.Item label="Faculty" value="FA" />
                        <Picker.Item label="Colleges" value="CO" />
                        <Picker.Item label="Organization" value="OR" />
                        <Picker.Item label="Others" value="OT" />
                    </Picker>
                    
                    </View>
        </View>

       <View style = {{margin: 5}} >
        <Text style = {{fontSize: 17,fontFamily: 'extrabold', color: '#202020' }}>Specify Suggestion <Text style = {{fontStyle: 'italic'}}>(Optional)</Text></Text>
        <View style = {styles.TextInput} >
          <TextInput
            style = {{marginLeft: 20, fontSize: 17, fontFamily: 'regular', width: '100%', height: '100%'}}
            placeholder = 'e.g, John Doe or Office'
            onChangeText={(value) => setSpecify(value)}
            value={specify}
        />
        </View>
      </View>
    </View>
    <View sytle = {{width: '50%', justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
    <View style = {{marginBottom: 20}} >
        <Text style = {{fontSize: 17,fontFamily: 'extrabold', color: '#202020'}}>Message</Text>
        <View style = {styles.MessageInputtext} >
          <TextInput
            onChangeText={(value) => setText(value)}
            value={text}
            style = {{margin: 20, fontSize: 20, fontFamily: 'regular', width: '100%', alignSelf: 'flex-start',}}
            placeholder = 'Write your message here...'   
            multiline
            maxLength={1100}
        />
        </View>
      </View>
      <TouchableOpacity
         style = {styles.Search}
        onPress = {setNewSuggestion}
        
         >
            <Text style = {{textAlign: 'center', color: '#0f2ed6', fontSize: 20, fontWeight: '600',fontFamily: 'extrabold'}}>
                Submit
            </Text>
      </TouchableOpacity>
      </View>
    </View>
      <CloseButton
      
        name = "arrow-back"
        onPress = {() => navigation.navigate('StudentHomeScreen')}
        size = {35}
        style = {{flexDirection: 'row', top: 0, left: 0, position: 'absolute', marginVertical: 27, marginHorizontal: 20}}

      />
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
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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
    width: 400,
    borderRadius: 5,
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
    width: 500,
    borderRadius: 15,
    height: 400,
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

    width: '90%', 
    height: '85%', 
    backgroundColor: '#00000019',
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center',
    flexDirection: 'row'


  },

  ButtonContainer: {
    
    flexDirection: 'row', 
    width: 120, 
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