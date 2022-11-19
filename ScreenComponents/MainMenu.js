import { View, Text, StyleSheet, TouchableOpacity, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'


const Box = (props) => {

  return (
  <Pressable 
  style = {[styles.box, props.style]}
  onPress = {props.onPress}
  android_ripple = {{

      color: '#fddf54',
      radius: 130,
      borderless: 25,

  }}
  >
  <Image
    source={props.source}
    style = {{width: 100, height: 100}}
  />
  <Text style = {styles.text}>{props.title}</Text>
</Pressable>

)

}


export const StudentMainMenu = () => {

  const navigation = useNavigation('');
  const [pressed, isPressed] = useState(true);


  return (
    <View style = {{ justifyContent: 'center', flexDirection: 'column' }}>
      <View style = {{flexDirection: 'row'}}>

        <Box
        
        style = {[{}]}
        source = {require("../Assets/Img/icons8-classroom-96.png")}
        title = 'Classes'
        onPress = {() =>  navigation.navigate('ClassScreen')}
        />
        

        <Box
        
        source={require("../Assets/Img/icons8-admin-settings-male-96.png")}
        onPress = {() => navigation.navigate('AdminScreen')}
        title = 'Admin'
        
        />
         
        <Box
        
        source={require("../Assets/Img/icons8-event-accepted-96.png")}
        onPress = {() => navigation.navigate('EventScreen')}
        title = 'Event'

        />
      </View>
      <View style = {{flexDirection: 'row'}}>
        <Box
        
        source={require("../Assets/Img/icons8-female-teacher-96.png")}
        onPress = {() => navigation.navigate('FacultyScreen')}
        title = 'Faculty'

        />
        <Box
        
        source={require("../Assets/Img/icons8-university-96.png")}
        onPress={() => navigation.navigate('OfficesScreen')}
        title = 'Buildings'

        />

        <Box
        
        onPress={() =>  navigation.navigate('SuggestionsScreen')}
        source={require("../Assets/Img/icons8-hint-96.png")}
        title = 'Suggestions'

        />
      </View>
    </View>
  )
}

const styles  = StyleSheet.create({

  box: {
    
    height: 200,
    width: 200,  
    borderRadius: 30,
    margin: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#f2f3f7',
    backgroundColor: '#0f2ed6',
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

  
  },

  boxpressed: {
    
    height: 150,
    width: 150,  
    borderRadius: 20,
    margin: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fddf54',

  
  },

  text: {

    color: '#fff',
    fontSize: 25,

  }

})