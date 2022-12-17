import { View, Text, ImageBackground, TextInput, StyleSheet, ToastAndroid , Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { CloseButton, OpenCamera, ProceedButton } from '../../../ScreenComponents/Buttons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import uuid from 'react-native-uuid';
import { localDBGuest , SyncGuest , remoteDBLogBook } from '../../../Database/pouchDb';
import {location} from '../../../Assets/constants/Locations'
import { useSelector } from 'react-redux';
import { launchCamera } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function GuestLoginScreen() {

  
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [transferred, setTransferred] = useState(0);
    const [image, setImage] = useState('');
    // const [address, setAddress] = useState();
    // const [value, setvalue] = useState('Select');
    // const [upload, setUpload] = useState(false);

    // const [compare , setCompare] = useState('')
    
  const [guestfullname, setGuestFullName] = useState('');
  const [guestaddress, setGuestAddress] = useState('');
  const [purpose, setPurpose] = useState('Select');


  const setNewGuest = async () => {

        if (guestfullname.length === 0){

          Alert.alert('Please input your name');
          console.log('this');

          } if (purpose === 'Select')  {
          
              Alert.alert("What's your purpose of the use?");

            } if (image.length === 0) {
              Alert.alert("Please upload a selfie")
              
                }else {

                  navigation.navigate('GuestHomeScreen');
                  console.log('this');
              }


  //       navigation.navigate('GuestHomeScreen')
  //       const id = uuid.v4();
  //       const  uri  =  image;
  //       const filename = uri.substring(uri.lastIndexOf('/') + 1);
  //       const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  //       setTransferred(0);
  //       const task = storage()
  //         .ref(filename)
  //         .putFile(uploadUri);
  //       // set progress state
  //       task.on('state_changed', snapshot => {
  //         setTransferred(
  //           Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
  //         );
  //       });
  //       try {
  //         await  task;
  //       } catch (e) {
  //         console.error(e);
  //       }
  //       const firebasedata = await storage().ref(filename).getDownloadURL();
  //       // dispatch(setImages(url));
  //       setImage(firebasedata)


  //     if(1 + 1 == 3 ){
  //     console.log('hey')
  //     }
  //    else{
  //      try {
  //        var NewGuest = {
  //         _id: id,
  //          GuestFullName : guestfullname,
  //          GuestAddress : guestaddress,
  //          Purpose : purpose,
  //          GuestImage : firebasedata
  //         //  FacultyPresident: facultypresident,
  //         //  FacultyVicePresident : facultyvicepresident,
  //         //  FacultyMembers : facultymembers,
  //         //  place: place,
  //         //  Price : price,
  //         //  Preptime : preptime,
  //         //  Deliveryfee : deliveryfee,
  //         //  Status: status,
  //         //  Image: Images
  //        }
  //     //    console.log(Images)
  //     //    console.log('Images')
  //        remoteDBLogBook.put(NewGuest)
  //        .then((response) =>{
  //          console.log(response)
  //        })
  //        .catch(err=>console.log(err))

  //       localDBGuest.put(NewGuest)
  //        .then((response) =>{
  //          console.log(response)
  //         //  navigation.navigate('GuestHomeScreen')
  //          SyncGuest()
  //        })
  //        .catch(err=>console.log(err))
         
  //      } catch (error) {
  //       console.log(error)
  //      }
  //      }
      }

      //user location selector
      const OpenCameras = async() => {

        // saves the photo you have, PS: Camera type not working but saving the file does modify mo ayang
        
    
        launchCamera({cameraType: 'front' , maxHeight: 300 , maxWidth: 300 ,  mediaType: 'photo'}, response => {
          
          console.log(response)
    
          navigation.navigate('GuestLoginScreen')
    
        }).then(image => {
          console.log('First Process')
          console.log(image.assets[0].uri)
          console.log(image.assets[0].fileName)
          console.log('Sucess upload')
          setImage(image.assets[0].uri); 
        //   console.log('Images')
        // console.log(image)
        // console.log('Images')
      
    
          // dispatch(setImages(image.assets[0].uri))
          // uploadImage()
        });
        
    }

      // login Button
    //   const login =  () => {
        
    //     guestfullname === '' ? Alert.alert('Please Enter your Full name') : 
    //     (guestaddress === '' ? Alert.alert('Please Enter Address') : 
    //     purpose === '' ? Alert.alert('Please select Purpose') : 
    //     image === '' ? Alert.alert('Please Add Image') : 
    //     setNewGuest())
    // }

  return (
    <ImageBackground
    resizeMode='cover'
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        source = {require('../../../Assets/Img/psu_cover.jpg')}
    >
        <CloseButton
        name = 'close'
        size = {35}
        color = '#000'
        style = {{margin: 20, position: 'absolute', top: 0, left: 0 }}
        onPress = {() => navigation.goBack('InitialRoutingScreen')}

        />
        <View style = {styles.container}>
            <Text style = {{fontSize: 50, bottom: 50, fontWeight: 'bold'}} >GUEST LOGIN</Text>
            <Text style = {{fontSize: 15,bottom: 30}}>Before we proceed, I need few information about you</Text>
         <View style = {{marginTop: 10,}}>
        <Text style = {{fontSize: 20}}>Fullname</Text>
        <View style = {styles.loginInput}>
            <Icon/>
            <TextInput
                 onChangeText={(value) => setGuestFullName(value)}
                 value={guestfullname}
                placeholder='e.g. Juan Cruz'
                style = {{fontSize: 16, marginLeft: 10}}
            />
        </View>
        </View>
        {/* <View style = {{marginTop: 10}}>
        <Text style = {{fontSize: 20, color: '#000' }}>Address</Text>
        <View style = {styles.loginInput}>
            <Icon/>
            <TextInput
                 onChangeText={(value) => setGuestAddress(value)}
                 value={guestaddress}
                placeholder='e.g, Lingayen, Pangasinan'
                style = {{fontSize: 16, color: 'black', marginLeft: 10}}
            />
        </View>
        </View> */}
        <View style = {{marginTop: 10}}>
        <Text style = {{fontSize: 20}}>Address</Text>
        <View
                
                style = {styles.picker}>
            <Picker
                    title = 'Select Category'
                    selectedValue={guestaddress}
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
                    onValueChange={(itemValue, itemIndex) => setGuestAddress(itemValue)}
                    
                >
                    {location.map((item, index) => {
                      return (
                        
                        <Picker.Item 
                        
                          label={item} 
                          value={index} 
                          key={index}
                          />
                      )      
                      
                      })}

                </Picker>
                </View>
                </View><View style = {{marginTop: 10}}>
        <Text style = {{fontSize: 20}}>Purpose</Text>
        <View
                
                style = {styles.picker}>
            <Picker
                    title = 'Select Category'
                    selectedValue={purpose}
                    mode="dropdown"
                    style={{
                        transform: [
                           { scaleX: 1 }, 
                           { scaleY: 1.1 },
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
        
        onPress ={OpenCameras}
        // disables the button when photo has been taken, cancellation of camera should be remove
        disabled = {image? true : false }
        name = {image ? 'done': 'photo-camera' }
        color = {image ? '#2ade2a' : '#fff'}
        style = {image? styles.opencamera : null}

        />
        <ProceedButton
        onPress={setNewGuest}
        // onPress = {LoginData}
        style={[{backgroundColor: '#fddf54', borderRadius: 5, width :300,}]}
        title = 'Log In'

        />
        </View>
        <View style = {{bottom: 20, position: 'absolute', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}} >
          <Text>Using this system means you agree to our </Text>
          <TouchableOpacity style = {{justifyContent: 'center'}}
            onPress = {() => navigation.navigate('TCScreen')}
          >
            <Text  style = {{color: 'green'}}> Terms of use & Conditions
            </Text>
            </TouchableOpacity>
        </View>
        </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({

  opencamera: {

    backgroundColor: '#eeeeef',
    shadowColor: "#fff",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

  },

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
        backgroundColor: '#fff',
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 20,
        shadowColor: "#eeeeef",
        shadowOffset: {
        width: 1,
        height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 3,
    
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