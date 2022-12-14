import { View, Text, StyleSheet, TouchableOpacity, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { Box } from '../../../ScreenComponents/Buttons'

export const StudentMainMenu = () => {

    const navigation = useNavigation('');
    const [pressed, isPressed] = useState(true);
  
  
    return (
      <View style = {{ justifyContent: 'center', flexDirection: 'column' }}>
        <View style = {{flexDirection: 'row'}}>
  
          <Box
          
          style = {[{}]}
          source = {require("../../../Assets/Img/icons8-classroom-96.png")}
          title = 'Classes'
          onPress = {() =>  navigation.navigate('ClassScreen')}
          />
          
  
          <Box
          
          source={require("../../../Assets/Img/icons8-admin-settings-male-96.png")}
          onPress = {() => navigation.navigate('AdminScreen')}
          title = 'Admin'
          
          />
           
          <Box
          
          source={require("../../../Assets/Img/icons8-event-accepted-96.png")}
          onPress = {() => navigation.navigate('EventScreen')}
          title = 'Event'
  
          />
        </View>
        <View style = {{flexDirection: 'row'}}>
          <Box
          
          source={require("../../../Assets/Img/icons8-female-teacher-96.png")}
          onPress = {() => navigation.navigate('FacultyScreen')}
          title = 'Faculty'
  
          />
          <Box
          
          source={require("../../../Assets/Img/icons8-company-96.png")}
          onPress={() => navigation.navigate('OfficesScreen')}
          title = 'Buildings'
  
          />
  
          <Box
          
          onPress={() =>  navigation.navigate('SuggestionsScreen')}
          source={require("../../../Assets/Img/icons8-hint-96.png")}
          title = 'Suggestions'
  
          />
        </View>
      </View>
    )
  }