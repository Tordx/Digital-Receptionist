import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground , Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { CloseButton } from '../Components/Buttons';
import { RadioButton } from 'react-native-paper';
import { localDBReportBugReport , SyncReportBugReport , remoteDBReportBugReport } from '../Database/pouchDb';
import { Picker } from '@react-native-picker/picker';
import uuid from 'react-native-uuid';

export default function SuggestionsScreen() {

  const navigation = useNavigation('');
  const [checked, setChecked] = useState('Report');
  const [text, setText] = useState("");
  const [value, setvalue] = useState('');
  const [name, setName] = useState('');
  const [specify, setSpecify] = useState('');

    const localDate = new Date();
    const utcDate = new Date(localDate.getTime() - (localDate.getTimezoneOffset() * 60000));
    const timestamp = utcDate.toISOString();
    console.log(timestamp); // Output: "2022-05-03T07:25:20.000Z"


  const setNewReport = async () => {
    const id = uuid.v4();

    if(1+1 == 3){
      console.log('hey')
    }
   else{
     try {
       var NewReport = {
        _id: id,
          Message : text,
         Department : value,
          Name: name,
          ReportBugReport : checked,
          SpecifyComplaint : specify,
          timestamp : timestamp,
     
       }
       remoteDBReportBugReport.put(NewReport)
       .then((response) =>{
         Alert.alert('Your Schedule has been successfully added!')
         console.log(response)
        //  SyncReportBugReport()
         navigation.navigate('StudentHomeScreen')
       })
       .catch(err=>console.log(err))
       
     } catch (error) {
      console.log(error)
     }
     }
    }

  return (
    <View  style = {styles.Container}>
        <CloseButton
      
      name = "arrow-back"
      onPress = {() => navigation.navigate('StudentHomeScreen')}
      size = {35}
      color = {'white'}
      style = {{flexDirection: 'row', top: 0, left: 0, position: 'absolute', marginVertical: 27, marginHorizontal: 20}}

    />
    <View style = {styles.BoxContainer}>
    <View style = {{justifyContent: 'center', alignItems: 'center', width: '50%', height: '100%', padding: 10  , }}>
    <View style = {{flexDirection: 'row',}}>
      <View style = {styles.ButtonContainer} >
      <RadioButton
            value="Report"
            color='#eb4034'
            status={checked === 'Report' ? 'checked' : 'unchecked' }
            onPress={() => setChecked('Report')}
          />
            <Text style = {{fontSize: 20,fontFamily: 'extrabold', color: '#202020',textShadowRadius: 5, textShadowColor: '#fff'}}>Report</Text>
        </View>
        <View style = {styles.ButtonContainer} >
          <RadioButton
            value="Bug Report"
            color='#eb4034'
            status={ checked === 'Bug Report' ? 'checked' : 'unchecked' }
            onPress={() => setChecked('Bug Report')}
          />
        <Text style = {{fontSize: 20,fontFamily: 'extrabold', color: '#202020',textShadowRadius: 5, textShadowColor: '#fff'}}>Bug Report</Text>
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
      <Text style = {{fontSize: 17,fontFamily: 'extrabold', color: '#202020',textShadowRadius: 5, textShadowColor: '#fff' }}>Specify Suggestion <Text style = {{fontStyle: 'italic'}}>(Optional)</Text></Text>
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
      <Text style = {{textAlign: 'center', position: 'absolute', top: 20, fontSize: 20, color: '#202020',  }}>In case of emergency please call your local authority  </Text>
    </View>
    </View>
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
    backgroundColor: '#f9f9f9',
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
  
  
}
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
