import { View, Text } from 'react-native'
import React from 'react'
import { Box } from '../../../ScreenComponents/Buttons'

export const GuestMainMenu = () => {
  return (
   
    <View style = {{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
      <View style = {{flexDirection: 'column'}} >
        <View style = {{flexDirection: 'row'}}>
        <Box
          
          style = {[{}]}
          source = {require("../../../Assets/Img/icons8-classroom-96.png")}
          title = 'Admin'
          onPress = {() =>  console.log('Admin')}
          />
          <Box
          
          style = {[{}]}
          source = {require("../../../Assets/Img/icons8-female-teacher-96.png")}
          title = 'Faculty'
          onPress = {() =>  console.log('Admin')}
          />
          <Box
          
          style = {[{}]}
          source = {require("../../../Assets/Img/icons8-event-accepted-96.png")}
          title = 'Events'
          onPress = {() =>  console.log('Admin')}
          />
       
        <Box
          
          style = {[{}]}
          source = {require("../../../Assets/Img/icons8-company-96.png")}
          title = 'Buildings  '
          onPress = {() =>  console.log('Admin')}
          />
          <Box
          
          style = {[{}]}
          source = {require("../../../Assets/Img/icons8-hint-96.png")}
          title = 'Suggestions'
          onPress = {() =>  console.log('Admin')}
          />
          </View>
      </View>
    </View>
  )
}