import React, { useEffect, useState } from 'react'
import {View, Image} from 'react-native'
import { RNCamera, FaceDetector } from 'react-native-camera'; //Depricated a bit complicated to setup
import {launchCamera, cameraType} from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';


export default function Camera() {


  const navigation = useNavigation();
  const [image, setImage] = useState('../../Assets/Img/psu_logo.png')

  useEffect(() => {
    OpenCamera()

  },)

  const OpenCamera = () => {

    // saving the photo you have, PS: Camera type not working but saving the file does modify mo ayang
    const option = {
     
        path: image,
        mediaType: 'photo',
        cameraType: 'front',
        inlcudeBase64: true,
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
        // navigation.navigate('GuestLoginScreen')
      }
    });
    
    return(

      <View>
        <Image
        
        source={Image}
        style = {{width: 100, height: 100}}
        />
      </View>

    )

}
}


