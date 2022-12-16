import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground , Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { CloseButton } from '../ScreenComponents/Buttons';
import { RadioButton } from 'react-native-paper';
import { localDBReportBugReport , SyncReportBugReport } from '../Database/pouchDb';
import { Picker } from '@react-native-picker/picker';
import uuid from 'react-native-uuid';

export default function SuggestionsScreen() {

  const navigation = useNavigation('');
  const [checked, setChecked] = useState('Report');
  const [text, setText] = useState("");
  const [value, setvalue] = useState('');
  const [name, setName] = useState('');
  const [specify, setSpecify] = useState('');

  const setNewReport = async () => {
    const id = uuid.v4();

    if(1+1 == 3){
      console.log('hey')
    }
    // if((classname.length == 0) && (subject.length == 0) ) {
    //   console.log('ilove')}
   else{
     try {
       var NewReport = {
        _id: id,
          Message : text,
         Department : value,
          Name: name,
          ReportBugReport : checked,
          SpecifyComplaint : specify
     
        //  place: place,
        //  Price : price,
        //  Preptime : preptime,
        //  Deliveryfee : deliveryfee,
        //  Status: status,
        //  Image: Images
       }
    //    console.log(Images)
    //    console.log('Images')
    localDBReportBugReport.put(NewReport)
       .then((response) =>{
         Alert.alert('Your Schedule has been successfully added!')
         console.log(response)
         SyncReportBugReport()
         navigation.navigate('InitialRoutingScreen')
       })
       .catch(err=>console.log(err))
       
     } catch (error) {
      console.log(error)
     }
     }
    }

  return (
    <ImageBackground  style = {styles.Container} 
    resizeMode = 'cover'
    // source = {require('../Assets/Img/Background_image2.png')}
    >
      <CloseButton
      
        name = "arrow-back"
        onPress = {() => navigation.navigate('InitialRoutingScreen')}
        size = {50}
        color = 'white'
        style = {{flexDirection: 'row', top: 0, left: 0, position: 'absolute', marginVertical: 27, marginHorizontal: 20}}

      />
    <View style = {styles.BoxContainer}>
      <View style = {{flexDirection: 'row',}}>
        <View style = {styles.ButtonContainer} >
          <RadioButton
            value="Report"
            color='#eb4034'
            status={checked === 'Report' ? 'checked' : 'unchecked' }
            onPress={() => setChecked('Report')}
          />
          <Text style = {{fontSize: 20,}}>Complaint</Text>
        </View>
        <View style = {styles.ButtonContainer} >
          <RadioButton
            value="Bug Report"
            color='#eb4034'
            status={ checked === 'Bug Report' ? 'checked' : 'unchecked' }
            onPress={() => setChecked('Bug Report')}
          />
          <Text style = {{fontSize: 20,}}>Bug Report</Text>
        </View>
      </View>
      <View style = {{margin: 5}} >
        <Text style = {{fontSize: 18,}}>Fullname <Text style = {{fontStyle: 'italic'}}>(Optional)</Text></Text>
        <View style = {styles.TextInput} >
          <TextInput
            style = {{marginLeft: 20, fontSize: 20}}
            placeholder = 'e.g, John Doe'
            onChangeText={(value) => setName(value)}
            value={name}
        />
        </View>
      </View>
      <View style = {{margin: 5}} >
        <Text style = {{fontSize: 18, textAlign: 'left'}}>Subject</Text>
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
                        width: 600,
                        bottom: 0,
                        color: '#9e9e9e',
                    
                          }}
                        onValueChange={(itemValue, itemIndex) => setvalue(itemValue)}
                    >
                        <Picker.Item label="Select" value="Select" />
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
        <Text style = {{fontSize: 18,}}>Specify Complaint <Text style = {{fontStyle: 'italic'}}>(Optional)</Text></Text>
        <View style = {styles.TextInput} >
          <TextInput
            style = {{marginLeft: 20, fontSize: 20}}
            placeholder = 'e.g, John Doe or Office'
            onChangeText={(value) => setSpecify(value)}
            value={specify}
        />
        </View>
      </View>
      <View style = {{margin: 20}} >
        <Text  style = {{fontSize: 18,}}>Message</Text>
        <View style = {styles.MessageInputtext} >
          <TextInput
            onChangeText={(value) => setText(value)}
            value={text}
            style = {{margin: 20, fontSize: 20}}
            placeholder = 'Please elaborate your complaint here...'   
            multiline
            maxLength={1100}
        />
        </View>
      </View>
      <TouchableOpacity
         style = {styles.submit}
        onPress = {setNewReport}
        
         >
            <Text style = {{textAlign: 'center', color: 'white', fontSize: 20, fontWeight: '600'}}>
                Submit
            </Text>
      </TouchableOpacity>
    </View>
      <Text style = {{textAlign: 'center', position: 'absolute', top: 20, fontSize: 20, color: 'white',  }}>In case of emergency please call your local authority  </Text>
    </ImageBackground>
  )
};

const styles = StyleSheet.create({


  Container: {

    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#eb4034'

  },

  submit: {

    width: 150,
    height: 50,
    backgroundColor: '#eb4034',
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

    width: '80%', 
    height: '85%', 
    backgroundColor: '#fff', 
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