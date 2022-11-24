import { View, Text, ImageBackground, TextInput, StyleSheet, ToastAndroid , Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { CloseButton, OpenCamera, ProceedButton } from '../../../ScreenComponents/Buttons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import uuid from 'react-native-uuid';
import { localDBGuest , SyncGuest , remoteDBLogBook } from '../../../Database/pouchDb';


export default function GuestLoginScreen() {


    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [fullname, setFullname] = useState();
    const [address, setAddress] = useState();
    const [value, setvalue] = useState('Select');

    const [upload, setUpload] = useState(false);

    // const [compare , setCompare] = useState('')
    
  const [guestfullname, setGuestFullName] = useState('')
  const [guestaddress, setGuestAddress] = useState('')
  const [purpose, setPurpose] = useState('Select')
  

  const setNewGuest = async () => {
   
    const id = uuid.v4();

      if(1 + 1 == 3 ){
      console.log('hey')
      }
      // if((classname.length == 0) && (subject.length == 0) ) {
      //   console.log('ilove')}
     else{
       try {
         var NewGuest = {
          _id: id,
           GuestFullName : guestfullname,
           GuestAddress : guestaddress,
           Purpose : purpose
          //  FacultyPresident: facultypresident,
          //  FacultyVicePresident : facultyvicepresident,
          //  FacultyMembers : facultymembers,
          //  place: place,
          //  Price : price,
          //  Preptime : preptime,
          //  Deliveryfee : deliveryfee,
          //  Status: status,
          //  Image: Images
         }
      //    console.log(Images)
      //    console.log('Images')
         remoteDBLogBook.put(NewGuest)
         .then((response) =>{
           console.log(response)
         })
         .catch(err=>console.log(err))

        localDBGuest.put(NewGuest)
         .then((response) =>{
           Alert.alert('Your Schedule has been successfully added!')
           console.log(response)
           SyncGuest()
           navigation.navigate('GuestHomeScreen')
         })
         .catch(err=>console.log(err))
         
       } catch (error) {
        console.log(error)
       }
       }
      }


  return (
    <ImageBackground
    resizeMode='cover'
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        source = {require('../../../Assets/Img/psu_cover.jpg')}
    >
        <CloseButton
        name = 'close'
        size = {50}
        color = 'black'
        style = {{margin: 20, position: 'absolute', top: 0, left: 0 }}
        onPress = {() => navigation.goBack('InitialRoutingScreen')}

        />
        <View style = {styles.container}>
            <Text style = {{fontSize: 50, bottom: 50, fontWeight: 'bold', color: '#fff'}} >GUEST LOGIN</Text>
            <Text style = {{fontSize: 25,bottom: 30,color: '#fff' }}>Before we proceed, I need few information about you</Text>
         <View style = {{marginTop: 10,}}>
        <Text style = {{fontSize: 20, color: '#fff' }}>Fullname</Text>
        <View style = {styles.loginInput}>
            <Icon/>
            <TextInput
                 onChangeText={(value) => setGuestFullName(value)}
                 value={guestfullname}
                placeholder='e.g. Juan Cruz'
                style = {{fontSize: 16, color: 'black', marginLeft: 10}}
            />
        </View>
        </View>
        <View style = {{marginTop: 10}}>
        <Text style = {{fontSize: 20, color: '#fff' }}>Address</Text>
        <View style = {styles.loginInput}>
            <Icon/>
            <TextInput
                 onChangeText={(value) => setGuestAddress(value)}
                 value={guestaddress}
                placeholder='e.g, Lingayen, Pangasinan'
                style = {{fontSize: 16, color: 'black', marginLeft: 10}}
            />
        </View>
        </View>
        <View style = {{marginTop: 10}}>
        <Text style = {{fontSize: 20, color: '#fff' }}>Purpose</Text>
        <View
                
                style = {styles.picker}>
            <Picker
                    title = 'Select Category'
                    selectedValue={purpose}
                    mode="dropdown"
                    style={{
                        transform: [
                           { scaleX: 1 }, 
                           { scaleY: 1 },
                        ],
                    width: 400,
                    bottom: 0,
                    color: 'black',
                    
                
                      }}
                      ViewStyleProp = {{fontSize: 20}} 
                    onValueChange={(itemValue, itemIndex) => setPurpose(itemValue)}
                >
                    <Picker.Item  label="Select" value="Select" />
                    <Picker.Item label="Check Admin" value="Check Admin" />
                    <Picker.Item label="Check Faculty" value="Check Faculty" />
                    <Picker.Item label="Suggest changes" value="Suggest changes" />
                    <Picker.Item label="Submit feedback" value="Submit feedback" />
                    <Picker.Item label="Check Events" value="Check Events" />
                    <Picker.Item label="Report" value="Report" />
                </Picker>
                </View>
                </View>
              
        <View style = {{flexDirection: 'row', width: '25%', alignItems: 'flex-start', marginTop: 20, justifyContent: 'center'}} >
        <OpenCamera
        
        onPress ={() => setUpload(!upload)}
        name = {upload?  'done' :'photo-camera' }
        color = {upload? '#0f0' :'#fff' }

        />
        <ProceedButton
        onPress={ () => {guestfullname === '' ? Alert.alert('Enter Name') : (guestaddress === '' ? Alert.alert('Enter Address') : purpose === 'Select' ? Alert.alert('Pls select option') : setNewGuest())}}
        // onPress = {LoginData}
        style={[{backgroundColor: '#fddf54', width: '100%', borderRadius: 5, marginLeft: 5}]}
        title = 'Log In'

        />
        </View>
        </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({

    picker: {
                    
        backgroundColor: '#f2f3f7',
        height: 50,

        justifyContent: 'center',
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
        elevation: 3,
    },

    container: {
        
        width: 1000, 
        height: 700, 
        backgroundColor: '#00000059',
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 20,
    
    },

    loginInput: {
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
        elevation: 3,
    
    }

})