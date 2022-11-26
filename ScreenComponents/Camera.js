import React, { useEffect, useState } from 'react'
import {View, Text, Pressable} from 'react-native'
import { RNCamera, FaceDetector } from 'react-native-camera'; //Depricated and bit complicated to setup
import {launchCamera, cameraType} from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { BackHandler } from 'react-native';


export default function Camera() {


  const navigation = useNavigation();
  const [image, setImage] = useState('../../Assets/Img/psu_logo.png')

  useEffect(() => {
    OpenCamera()
    disableBackbutton()

  },[])

  const disableBackbutton = () => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
      return () => backHandler.remove()
    
  }

  const OpenCamera = () => {

    // saves the photo you have, PS: Camera type not working but saving the file does modify mo ayang
    

    const option = {
     
        mediaType: 'photo',
        cameraType: 'front',
        inlcudeBase64: true,
        uri: 'thisimage.jpg',
        storageOption: {
          path: 'image',
        }
    }
    
    launchCamera(option, response => {
      console.log('Response =', response)
      if (response.didCancel) {
        console.log('User Cancelled');
      } else if(response.errorCode) {
        console.log('Error Code');
      } else if(response.errorMessage){
        console.log('Error Message');
      } else if (response.assets){
        console.log('Assets')
        navigation.navigate('GuestLoginScreen')
      }
    }).then(image => {
      console.log(image)
      setImage(image.path);
      
    });

}

return (
    <Pressable
    style  = {{flex: 1, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center',}}
    onPress={OpenCamera}
    >
      <Text>{image}</Text>
      <Text style = {{fontSize: 50}}>OPEN CAMERA</Text>
    </Pressable>
)

}


