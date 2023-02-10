import React, { useEffect, useState } from 'react'
import {View, Text, Pressable , Alert} from 'react-native'
import { RNCamera, FaceDetector } from 'react-native-camera'; //Depricated and bit complicated to setup
import {launchCamera, cameraType} from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';
import { useDispatch } from 'react-redux';
import { setImages } from '../Redux/TaskReducer';
import { useSelector } from 'react-redux';


export default function Camera() {

  // const Images = useSelector(state => state.items.Images)
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const [image, setImage] = useState('')
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  

  useEffect(() => {
    OpenCamera()
    disableBackbutton()
    console.log('image')
    console.log(image)
    console.log('image')

  },[])

  const disableBackbutton = () => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
      return () => backHandler.remove()
    
  }


  const uploadImage = async () => {

    console.log('Images')
    console.log(image)
    console.log('Images')
    // const  uri  = image;
    const filename = image.substring(image.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? image.replace('file://', '') : image;
    setUploading(true);
    setTransferred(0);
    const task = storage()
      .ref(filename)
      .putFile(uploadUri);
    // set progress state
    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      );
    });
    try {
      await task;
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
    Alert.alert(
      'Successfully added Photo!'
    );  
    setImage(null);
    const url = await storage().ref(filename).getDownloadURL();
    dispatch(setImages(url));
    console.log(url)
    console.log('url')
  };
  

  const OpenCamera = async() => {

    // saves the photo you have, PS: Camera type not working but saving the file does modify mo ayang
    

    launchCamera({cameraType: 'front' , maxHeight: 300 , maxWidth: 300 ,  mediaType: 'photo'}, response => {
      
      console.log(response)

      navigation.navigate('GuestLoginScreen')

    }).then(image => {
      console.log('yyyyyyyyyyyyy')
      console.log(image.assets[0].uri)
      console.log('xxxxxxxxxxxx')
      setImage(image.assets[0].uri); 
      dispatch(setImages(image.assets[0].uri))
      // uploadImage()
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


