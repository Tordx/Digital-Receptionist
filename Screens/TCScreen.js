import { View, Text, Pressable, Image, Animated, Easing } from 'react-native'
import React from 'react'
import { ProceedButton } from '../ScreenComponents/Buttons'
import { useNavigation } from '@react-navigation/native'
import { FlipLogo } from '../ScreenComponents/FlipLogo'
export default function TCScreen() {

  const navigation = useNavigation()

  return (
    <View style = {{justifyContent: 'center', alignItems: 'center', flex: 1}} >
      <FlipLogo/>
      <Text>You must use this system with accordance to the privacy policy of Pangasinan State University</Text>
      <View style = {{flexDirection: 'row', margin: 20}} >
      <ProceedButton
      title = "Proceed"
      onPress = {()=>navigation.navigate('GuestLoginScreen')}
      style = {{backgroundColor: '#fff', margin: 5, borderRadius: 5,}}
      titleStyle = {{color: '#000'}}
      />
      <ProceedButton
      title = "Exit"
      onPress = {()=> navigation.navigate('InitialRoutingScreen')}
      style = {{backgroundColor: '#fff', margin: 5, borderRadius: 5,}}
      titleStyle = {{color: '#000'}}
      />
      </View>
    </View>
  )
}