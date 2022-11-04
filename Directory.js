import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Employee from './Navigations/Employee';
import LoginScreen from './Screens/LoginScreen';
import VisitorLogin from './Screens/VisitorLoginScreen';
import EmployeeLogin from './Screens/EmployeeLoginScreen';
import Students from './Navigations/Students';
import ReportScreen from './Screens/ReportScreen';


export default function Directory() {
  
    const Stack = createStackNavigator();

  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
            
                name = 'LoginScreen'
                component={LoginScreen}
                options = {{
                    headerShown: false
                }}
            />
            <Stack.Screen
            
            name = 'VisitorLogin'
            component={VisitorLogin}
            options = {{
                headerShown: false
            }}
            />
            <Stack.Screen
            
                name = 'Employee'
                component = {Employee}
                options = {{
                    headerShown: false
                }}

            />
            <Stack.Screen
            
                name = 'ReportScreen'
                component={ReportScreen}
            
            />
{/* Navigations */}

            <Stack.Screen 
            
                name = 'EmployeeLogin'
                component={EmployeeLogin}
                options = {{
                    headerShown: false
                }}
                
            />

            <Stack.Screen
            
                name= 'Students'
                component={Students}
                options = {{
                    headerShown: false
                }}
            
            />
        </Stack.Navigator>
    </NavigationContainer>
  )
}