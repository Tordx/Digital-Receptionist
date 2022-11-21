import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Employee from './Navigations/Employee';
import VisitorLogin from './Screens/VisitorLoginScreen';
import EmployeeLogin from './Screens/EmployeeLoginScreen';
import ClassScreen from './Screens/Navigations/Student/ClassScreen';
import ReportScreen from './Screens/ReportScreen';
import IdleScreen from './Screens/IdleScreen'
import Student_HomeScreen from './Screens/Navigations/Student/StudentHomeScreen';
import InitialRoutingScreen from './Screens/InitialRoutingScreen';
import AdminScreen from './Screens/Navigations/Student/AdminScreen';
import FacultySreen from './Screens/Navigations/Student/FacultyScreen';
import EventScreen from './Screens/Navigations/Student/EventScreen';
import OfficesScreen from './Screens/Navigations/Student/BuildingScreen';
import SuggestionsScreen from './Screens/SuggestionsScreen';
import AddClassScreen from './Screens/Navigations/Employee/AddClassScreen';
import StudentLoginScreen from './Screens/Navigations/Student/StudentLoginScreen';
import AdminHomeScreen from './Screens/Navigations/Employee/AdminHomeScreen';
import AdminMainMenu from './Screens/Navigations/Employee/AdminMainMenu';
import FacultyConfig from './Screens/Navigations/Employee/FacultyConfig';
import AddFaculty from './Screens/Navigations/Employee/AddFaculty';


export default function Directory() {
  
    const Stack = createStackNavigator();

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='IntialRoutingScreen'>
            <Stack.Screen
            
                name = 'InitialRoutingScreen'
                component={InitialRoutingScreen}
                options = {{
                    headerShown: false
                }}
            />

            <Stack.Screen
            
                name = 'Student_HomeScreen'
                component={Student_HomeScreen}
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
                options = {{
                    headerShown: false
                }}  
            
            />

            <Stack.Screen
            
                name = 'IdleScreen'
                component={IdleScreen}
                options = {{
                    headerShown: false
                }}  
            />
        {/* Student Screen */}

            <Stack.Screen
            
            name = 'StudentLoginScreen'
            component={StudentLoginScreen}
            options = {{
                headerShown: false
            }}
            />

            <Stack.Screen
            
                name = 'ClassScreen'
                component={ClassScreen}
                options = {{
                headerShown: false
                }}  
             />

            <Stack.Screen
            
                name = 'AdminScreen'
                component={AdminScreen}
                options = {{
                headerShown: false
                }}  
            />

            <Stack.Screen

                name = 'FacultyScreen'
                component={FacultySreen}
                options = {{
                    headerShown: false
                }}  
            />

            <Stack.Screen

                name = 'EventScreen'
                component={EventScreen}
                options = {{
                    headerShown: false
                }}  
            />

            <Stack.Screen
            
                name = 'OfficesScreen'
                component={OfficesScreen}
                options = {{
                    headerShown: false
                }}
            
            />

            <Stack.Screen 
            
                name = 'SuggestionsScreen'
                component={SuggestionsScreen}
                options = {{
                    headerShown: false
                }}
            />

                {/* Admin Screens */}

            <Stack.Screen 
            
                name = 'AdminHomeScreen'
                component={AdminHomeScreen}
                options = {{
                headerShown: false
                }}
            />

            <Stack.Screen 
            
                name = 'AdminMainMenu'
                component={AdminMainMenu}
                options = {{
                headerShown: false
                }}
            />

            <Stack.Screen 
            
                name = 'AddClassScreen'
                component={AddClassScreen}
                options = {{
                    headerShown: false
                }}
            />

            <Stack.Screen 
            
                name = 'FacultyConfig'
                component={FacultyConfig}
                options = {{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                
            name = 'AddFaculty'
            component={AddFaculty}
            options = {{
                headerShown: false
            }}
           />

        </Stack.Navigator>
    </NavigationContainer>
  )
}