
import React from 'react'
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import ClassScreen from '../Screens/Navigations/Student/ClassScreen';
import Student_HomeScreen from '../Screens/Navigations/Student/Student_HomeScreen';
import Student_FacultyScreen from '../Screens/Navigations/Student/Student_FacultyScreen';
import Student_AdminScreen from '../Screens/Navigations/Student/Student_AdminScreen';
import EventScreen from '../Screens/EventScreen';
import SuggestionsScreen from '../Screens/SuggestionsScreen';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

export default function Students() {

    const Tab = createBottomTabNavigator();

  return (

    <Tab.Navigator
    initialRouteName='Home'
    
    screenOptions={({route}) => ({
        
        tabBarIcon:({focused, size, color}) => {
          let iconName;
            if(route.name==='Home'){
              iconName = 'home';
              size = focused ? 30 : 25;
              color = focused ? '#0f2ed6': '#fff'; 

            } else if (route.name === 'Class') {
              iconName = 'book';
              size = focused ? 30 : 25;
              color = focused ? '#0f2ed6': '#fff'; 

            } else if (route.name === 'Events') {
              iconName = 'celebration';
              size = focused ? 30 : 25;
              color = focused ? '#0f2ed6': '#fff'; 

            } else if (route.name === 'Faculty') {
              iconName = 'supervisor-account';
              size = focused ? 30 : 25;
              color = focused ? '#0f2ed6': '#fff'; 

            } else if (route.name === 'Admin') {
                iconName = 'admin-panel-settings';
                size = focused ? 30 : 25;
                color = focused ? '#0f2ed6': '#fff'; 
  
            } else if (route.name === 'Suggestions') {
                iconName = 'speaker-notes';
                size = focused ? 30 : 25;
                color = focused ? '#0f2ed6': '#fff'; 
  
              }


            

              return(
                <Icon
                    name = {iconName}
                    size={size}
                    color = {color}
                />
              )
        },
        tabBarActiveBackgroundColor: '#fddf54',
        tabBarInactiveBackgroundColor: '#0f2ed6',
      
      })}
    >

        <Tab.Screen
        
        name = 'Home'
        component={Student_HomeScreen}
        options = {{

            headerShown: false,
            tabBarActiveTintColor: '#0f2ed6',
            tabBarLabelStyle: { fontSize: 19, fontWeight: '600'}

        }}
        
        />

        <Tab.Screen
        
        name = 'Class'
        component={ClassScreen}
        options = {{

            headerShown: false,
            title: 'Classes',
            tabBarActiveTintColor: '#0f2ed6',
            tabBarLabelStyle: { fontSize: 19, fontWeight: '600'}
        }}

        />
        
        <Tab.Screen
        
        name = 'Events'
        component={EventScreen}
        options = {{

            headerShown: false,
            tabBarActiveTintColor: '#0f2ed6',
            tabBarLabelStyle: { fontSize: 19, fontWeight: '600'}
            
        }}
        
        />

        <Tab.Screen
        
        name = 'Faculty'
        component={Student_FacultyScreen}
        options = {{

            headerShown: false,
            tabBarActiveTintColor: '#0f2ed6',
            tabBarLabelStyle: { fontSize: 19, fontWeight: '600'}
            
        }}
        
        />

        <Tab.Screen
        
        name = 'Admin'
        component={Student_AdminScreen}
        options = {{

            headerShown: false,
            tabBarActiveTintColor: '#0f2ed6',
            tabBarLabelStyle: { fontSize: 19, fontWeight: '600'}
            
        }}
        
        />

        

        <Tab.Screen
        
        name = 'Suggestions'
        component={SuggestionsScreen}
        options = {{

            headerShown: false,
            tabBarActiveTintColor: '#0f2ed6',
            tabBarLabelStyle: { fontSize: 19, fontWeight: '600'}
            
        }}
        
        />
    </Tab.Navigator>

  )
}