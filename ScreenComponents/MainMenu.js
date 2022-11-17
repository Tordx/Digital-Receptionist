import { View, Text, StyleSheet, TouchableOpacity, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'



export default function MainMenu() {

  const navigation = useNavigation('');
  const [pressed, isPressed] = useState(true);


  return (
    <View style = {{ justifyContent: 'center', flexDirection: 'column' }}>
      <View style = {{flexDirection: 'row'}}>
        <Pressable 
          style = {styles.box}
          onPress = {() =>  navigation.navigate('ClassScreen')}
          android_ripple = {{
      
              color: '#fddf54',
              radius: 94,
              borderless: 25,

          }}
        >
          <Image
            source={require("../Assets/Img/icons8-classroom-96.png")}
            style = {{width: 75, height: 75}}
          />
          
          <Text style = {styles.text}>Classes</Text>
        </Pressable>
        <Pressable 
          onPress = {() =>  navigation.navigate('AdminScreen')}
          style = {styles.box}
          android_ripple = {{
      
              color: '#fddf54',
              radius: 94,
              borderless: 25,

          }} 
        
        >
        
        <Image
        source={require("../Assets/Img/icons8-admin-settings-male-96.png")}
        style = {{width: 75, height: 75}}
        /><Text style = {styles.text}>Admin</Text>
        </Pressable>

          <Pressable  style = {styles.box}
            onPress = {() => navigation.navigate('EventScreen')}
            android_ripple = {{
      
            color: '#fddf54',
            radius: 94,
            borderless: 25
            }}
            >
        
        <Image
        source={require("../Assets/Img/icons8-event-accepted-96.png")}
        style = {{width: 75, height: 75}}
        />
        
        <Text style = {styles.text}>Events</Text>
      </Pressable>
      </View>
      <View style = {{flexDirection: 'row'}}>
      <Pressable 
          onPress={() => navigation.navigate('FacultyScreen')}
          style = {styles.box}
          android_ripple = {{
      
              color: '#fddf54',
              radius: 94,
              borderless: 25,

          }}
        
        >

        <Image
          source={require("../Assets/Img/icons8-female-teacher-96.png")}
          style = {{width: 75, height: 75}}
        />
        
        <Text style = {styles.text}>Faculty</Text>
          
      </Pressable>
      <Pressable 
          onPress={() => navigation.navigate('OfficesScreen')}
          style = {styles.box}
          android_ripple = {{
      
              color: '#fddf54',
              radius: 94,
              borderless: 25,

          }}
        
        >
       <Image
        source={require("../Assets/Img/icons8-university-96.png")}
        style = {{width: 75, height: 75}}/>
        
        <Text style = {styles.text}>Buildings</Text>
      </Pressable>
      <Pressable 
          onPress={() =>  navigation.navigate('SuggestionsScreen')}
          style = {styles.box}
          android_ripple = {{
      
              color: '#fddf54',
              radius: 94,
              borderless: 25,

          }}
        
        >
      
      <Image
        source={require("../Assets/Img/icons8-hint-96.png")}
        style = {{width: 75, height: 75}}
        />
        <Text style = {styles.text}>Suggestions</Text></Pressable>
      </View>
    </View>
  )
}

const styles  = StyleSheet.create({

  box: {
    
    height: 150,
    width: 150,  
    borderRadius: 30,
    margin: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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

    color: '#fff'

  }

})