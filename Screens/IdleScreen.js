import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import psu_backgroundImage from '../Assets/Img/psu_backgroundImage.png';
import { useNavigation } from '@react-navigation/native';


export default function IdleScreen() {

    const navigation = useNavigation('');

  return (
    <ImageBackground
    
    source={psu_backgroundImage}
    style = {{flex: 1,
      alignItems: 'center',
      justifyContent: 'center', }}

    >
        <TouchableOpacity
          style = {{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',}}

            onPress={() => navigation.replace('LoginScreen')}
        >
            <Text style = {{fontSize: 30, fontWeight: '700'}}>
                Tap anywhere to continue
            </Text>
            
        </TouchableOpacity>
    </ImageBackground>
  )
}