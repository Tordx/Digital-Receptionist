import { View, Text } from 'react-native'
import React from 'react'
import { Box } from '../../../ScreenComponents/Buttons'

export const GuestMainMenu = () => {
  return (
   
    <View style = {{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
        <View style = {{flexDirection: 'row'}}>
        <Box
          
          style = {[{}]}
          source = {require("../../../Assets/Img/icons8-classroom-96.png")}
          title = 'Admin'
          onPress = {() =>  console.log('Admin')}
          />
        </View>
    </View>
  )
}