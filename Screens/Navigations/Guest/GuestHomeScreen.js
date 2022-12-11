import { View, Image, Text,ImageBackground, Alert } from 'react-native'
import React , { useState } from 'react'
import { GuestMainMenu } from './GuestMainMenu'
import { CloseButton, ReportButton } from '../../../ScreenComponents/Buttons';
import { useNavigation } from '@react-navigation/native';

 //Logout Navigation to IntialRoutingScreen

      

export default function GuestHomeScreen() {

  
  
  const navigation = useNavigation();
  
  const confirmLogout = () => {

    Alert.alert(
        'Confirm logout',
        'Are you sure?',
        [
          {
            text: "Cancel",
            onPress: () => console.log('Cancel Pressed'),
            style: "cancel"
          },
          { text: "Yes", onPress: () => navigation.navigate('InitialRoutingScreen') }
        ]
      );
  
   }

  return (
    <ImageBackground
    source={require('../../../Assets/Img/Background_image.png')}
    resizeMode = 'cover'
    style = {{
      backgroundColor: '#f2f3f7',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,

    }}
    >
      <Image
        
        source={require('../../../Assets/Img/psu_logo_emboss.png')}
        style = {{width: 200, height: 200, marginBottom: 25, }}

        />
        <Text style = {{fontSize: 20,}}> Welcome to Pangasinan State University, Lingayen Campus </Text>
          <View style = {{flexDirection: 'row', justifyContent: 'center', alignSelf: 'center'}}>
            
      <GuestMainMenu/>
            </View>
            <CloseButton
          onPress  = {confirmLogout}
        title =  'logout'
        name = 'logout'
        size = {30}
        style = {{flexDirection: 'row', top: 0, left: 0, position: 'absolute', margin: 20}}
        />
       <ReportButton/>
    </ImageBackground>
  )
}