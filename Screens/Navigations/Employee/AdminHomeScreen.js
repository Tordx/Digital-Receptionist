import { View, Text, Image } from 'react-native'
import React from 'react'
import AdminMainMenu from './AdminMainMenu'
import { useNavigation } from '@react-navigation/native'
import { CloseButton } from '../../../ScreenComponents/Buttons'

export default function AdminHomeScreen() {

    const navigation = useNavigation();

  return (
    <View style = {{flex: 1, backgroundColor: '#f2f3f7',justifyContent: 'center', alignItems: 'center'}}>
        <Image
        source={require('../../../Assets/Img/psu_logo.png')}
        style = {{width: 1500, height: 1500, opacity: 0.1, justifyContent: 'center', position: 'absolute', alignItems: 'center'}}
        />
       
        <CloseButton
        
        name = 'logout'
        size = {25}
        color = 'black'
        style = {{position: 'absolute', left: 0, top: 0, margin: 20, flexDirection: 'row', justifyContent: 'center' }}
        onPress = {() => navigation.goBack('InitialLoginRouting')}
        title = 'logout'

        />
      <AdminMainMenu/>
    </View>
  )
}