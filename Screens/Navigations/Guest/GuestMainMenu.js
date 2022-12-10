import { View, Text } from 'react-native'
import React from 'react'
import { Box } from '../../../ScreenComponents/Buttons'
import { useNavigation } from '@react-navigation/native'

export const GuestMainMenu = () => {
  
  const navigation = useNavigation()

  return (
   
    <View style = {{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
      <View style = {{flexDirection: 'column'}} >
        <View style = {{flexDirection: 'row'}}>
        <Box
          
          style = {[{}]}
          source = {require("../../../Assets/Img/icons8-classroom-96.png")}
          title = 'Admin'
          onPress = {() => navigation.navigate('AdminScreen')}
          />
          <Box
          
          style = {[{}]}
          source = {require("../../../Assets/Img/icons8-female-teacher-96.png")}
          title = 'Faculty'
          onPress = {() => navigation.navigate('FacultyScreen')}
          />
          <Box
          
          style = {[{}]}
          source = {require("../../../Assets/Img/icons8-event-accepted-96.png")}
          title = 'Events'
          onPress = {() => navigation.navigate('EventScreen')}
          />
       
        <Box
          
          style = {[{}]}
          source = {require("../../../Assets/Img/icons8-company-96.png")}
          title = 'Buildings  '
          onPress={() => navigation.navigate('OfficesScreen')}
          />
          <Box
          
          style = {[{}]}
          source = {require("../../../Assets/Img/icons8-hint-96.png")}
          title = 'Suggestions'
          onPress={() =>  navigation.navigate('SuggestionsScreen')}
          />
          </View>
      </View>
    </View>
  )
}