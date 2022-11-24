import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './Redux/Store';

import InitialRoutingScreen from './Screens/InitialRoutingScreen';
import IdleScreen from './Screens/IdleScreen';
//Student StackScreens
import Employee from './Navigations/Employee';
import ClassScreen from './Screens/Navigations/Student/ClassScreen';
import ReportScreen from './Screens/ReportScreen';
import AdminScreen from './Screens/Navigations/Student/AdminScreen';
import FacultySreen from './Screens/Navigations/Student/FacultyScreen';
import EventScreen from './Screens/Navigations/Student/EventScreen';
import OfficesScreen from './Screens/Navigations/Student/BuildingScreen';
import SuggestionsScreen from './Screens/SuggestionsScreen';
import AddClassScreen from './Screens/Navigations/Employee/AddClassScreen';
import StudentLoginScreen from './Screens/Navigations/Student/StudentLoginScreen';
import Student_HomeScreen from './Screens/Navigations/Student/StudentHomeScreen';
// Admin StackScreen
import AdminHomeScreen from './Screens/Navigations/Employee/AdminHomeScreen';
import AdminMainMenu from './Screens/Navigations/Employee/AdminMainMenu';
import AdminLoginScreen from './Screens/Navigations/Employee/AdminLoginScreen';
import FacultyConfig from './Screens/Navigations/Employee/FacultyConfig';
import AddFacultyScreen from './Screens/Navigations/Employee/AddFacultyScreen';
import AddAdminScreen from './Screens/Navigations/Employee/AddAdminScreen';
import AddEventScreen from './Screens/Navigations/Employee/AddEventScreen';
import AdminReports from './Screens/Navigations/Employee/AdminReports';
import AddStudentScreen from './Screens/Navigations/Employee/AddStudentScreen';
import AddSuperAdmin from './Screens/Navigations/Employee/AddSuperAdmin';
import LogBookScreen from './Screens/Navigations/Employee/LogBookScreen';
// Guest StackScreen

import GuestHomeScreen from './Screens/Navigations/Guest/GuestHomeScreen';
import GuestLoginScreen from './Screens/Navigations/Guest/GuestLoginScreen';

export default function Directory() {
  
    const Stack = createStackNavigator();

  return (
   <Provider store={store}>
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
            
                name = 'AdminLoginScreen'
                component={AdminLoginScreen}
                options = {{
                    headerShown: false
                }}
            />

            <Stack.Screen 
                
            name = 'AddFacultyScreen'
            component={AddFacultyScreen}
            options = {{
                headerShown: false
            }}
           />
           <Stack.Screen 
                
                name = 'AddAdminScreen'
                component={AddAdminScreen}
                options = {{
                    headerShown: false
                }}
               />
               <Stack.Screen 
                
                name = 'AddEventScreen'
                component={AddEventScreen}
                options = {{
                    headerShown: false
                }}
               />
               <Stack.Screen 
                
                name = 'AdminReports'
                component={AdminReports}
                options = {{
                    headerShown: false
                }}
               />
                 <Stack.Screen 
                
                name = 'AddStudentScreen'
                component={AddStudentScreen}
                options = {{
                    headerShown: false
                }}
               />
        {/* Guest Screen */}

                <Stack.Screen 
                
                name = 'GuestLoginScreen'
                component={GuestLoginScreen}
                options = {{
                    headerShown: false
                }}/>

                <Stack.Screen 
                
                name = 'GuestHomeScreen'
                component={GuestHomeScreen}
                options = {{
                    headerShown: false
                }}/>
                <Stack.Screen 
                
                name = 'AddSuperAdmin'
                component={AddSuperAdmin}
                options = {{
                    headerShown: false
                }}/>
                 <Stack.Screen 
                
                name = 'LogBookScreen'
                component={LogBookScreen}
                options = {{
                    headerShown: false
                }}/>

                
        </Stack.Navigator>
    </NavigationContainer>
    </Provider>

  )
}