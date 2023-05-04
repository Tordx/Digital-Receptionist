import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './Redux/Store';

import InitialRoutingScreen from './Screens/InitialRoutingScreen';
import ReportScreen from './Screens/ReportScreen';
import TCScreen from './Screens/TCScreen';
// import UniversityMap from './Screens/UniversityMap';
//Student StackScreens
import ClassScreen from './Screens/Navigations/Student/ClassScreen';
import AdminScreen from './Screens/Navigations/Student/AdminScreen';
import FacultySreen from './Screens/Navigations/Student/FacultyScreen';
import FacultyScreen2 from './Screens/Navigations/Student/FacultyScreen2';
import EventScreen from './Screens/Navigations/Student/EventScreen';
import OfficesScreen from './Screens/Navigations/Student/BuildingScreen';
import SuggestionsScreen from './Screens/SuggestionsScreen';
import AddClassScreen from './Screens/Navigations/Admin/AddClassScreen';
import StudentHomeScreen from './Screens/Navigations/Student/StudentHomeScreen';
import UniversityMap from './Screens/Navigations/Student/UniversityMap';
// Admin StackScreen
import AdminHomeScreen from './Screens/Navigations/Admin/AdminHomeScreen';
import AdminMainMenu from './Screens/Navigations/Admin/AdminMainMenu';
import AdminLoginScreen from './Screens/Navigations/Admin/AdminLoginScreen';
import AddFacultyScreen from './Screens/Navigations/Admin/AddFacultyScreen';
import AddAdminScreen from './Screens/Navigations/Admin/AddAdminScreen';
import AddEventScreen from './Screens/Navigations/Admin/AddEventScreen';
import AdminReports from './Screens/Navigations/Admin/AdminReports';
import AddStudentScreen from './Screens/Navigations/Admin/AddStudentScreen';
import AddSuperAdmin from './Screens/Navigations/Admin/AddSuperAdmin';
import LogBookScreen from './Screens/Navigations/Admin/LogBookScreen';
import AddBuildingScreen from './Screens/Navigations/Admin/AddBuildingScreen';
import AddCollege from './Screens/Navigations/Admin/AddCollege';
import AdminSuggestionScreen from './Screens/Navigations/Admin/AdminSuggestionScreen';
import AdminReportScreen from './Screens/Navigations/Admin/AdminReportScreen';
import AdminFeedBackScreen from './Screens/Navigations/Admin/AdminFeedBackScreen';
import AdminBugReportScreen from './Screens/Navigations/Admin/AdminBugReportScreen';
import AddAdminCitizenChart from './Screens/Navigations/Admin/AddAdminCitizenChart';
// Guest StackScreen
import Camera from './Components/Camera';
import Maps from './Components/Maps';
import CourseMapScreen from './Screens/MapScreen/CourseMapScreen';
import FacultyMapScreen from './Screens/MapScreen/FacultyMapScreen';
import BuildingMapScreen from './Screens/MapScreen/BuildingMapScreen';
import CitizenChartScreen  from './Screens/Navigations/Student/CitizenChartScreen';
import SplashScreen from './Screens/SplashScreen';

export default function Directory() {
  
    const Stack = createStackNavigator();

  return (
   <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator initialRouteName='IntialRoutingScreen'>

               
                <Stack.Screen name = 'InitialRoutingScreen' component={InitialRoutingScreen} options = {{ headerShown: false }}/>
                <Stack.Screen name = 'CitizenChartScreen' component={CitizenChartScreen} options = {{headerShown: false }}/>
                <Stack.Screen name = 'SplashScreen' component={SplashScreen} options = {{headerShown: false, transitionSpec: { open: TransitionSpecs.TransitionIOSSpec, close: TransitionSpecs.TransitionIOSSpec, }, }}/>
                <Stack.Screen name = 'FacultyMapScreen' component={FacultyMapScreen} options = {{headerShown: false }}/>
                <Stack.Screen name = 'FacultyScreen2' component={FacultyScreen2} options = {{headerShown: false }}/>
                <Stack.Screen name = 'CourseMapScreen' component={CourseMapScreen} options = {{headerShown: false }}/>
                <Stack.Screen name = 'BuildingMapScreen' component={BuildingMapScreen} options = {{headerShown: false }}/>
                <Stack.Screen name = 'UniversityMap' component={UniversityMap} options = {{headerShown: false }}/>
                <Stack.Screen name = 'Maps' component={Maps} options = {{headerShown: false }}/>
                <Stack.Screen name = 'StudentHomeScreen' component={StudentHomeScreen} options = {{ headerShown: false }} />
                <Stack.Screen name = 'ReportScreen' component={ReportScreen} options = {{ headerShown: false }} />
                <Stack.Screen name = 'ClassScreen' component={ClassScreen} options = {{ headerShown: false }} />
                <Stack.Screen name = 'AdminScreen' component={AdminScreen} options = {{ headerShown: false }} />
                <Stack.Screen name = 'FacultyScreen' component={FacultySreen} options = {{ headerShown: false }} />
                <Stack.Screen name = 'EventScreen' component={EventScreen} options = {{ headerShown: false }} />
                <Stack.Screen name = 'OfficesScreen' component={OfficesScreen} options = {{ headerShown: false }} />
                <Stack.Screen name = 'SuggestionsScreen' component={SuggestionsScreen} options = {{ headerShown: false }} />
                <Stack.Screen name = 'AdminHomeScreen' component={AdminHomeScreen} options = {{ headerShown: false }} />
                <Stack.Screen name = 'AdminMainMenu' component={AdminMainMenu} options = {{ headerShown: false }} />
                <Stack.Screen name = 'AddClassScreen' component={AddClassScreen} options = {{ headerShown: false }} />
                <Stack.Screen name = 'AdminLoginScreen' component={AdminLoginScreen} options = {{ headerShown: false }} />
                <Stack.Screen name = 'AddFacultyScreen' component={AddFacultyScreen} options = {{ headerShown: false }} />
                <Stack.Screen name = 'AddAdminScreen' component={AddAdminScreen} options = {{ headerShown: false }} />
                <Stack.Screen name = 'AddEventScreen' component={AddEventScreen} options = {{ headerShown: false }} />
                <Stack.Screen name = 'AdminReports' component={AdminReports} options = {{ headerShown: false }} />
                <Stack.Screen name = 'AddStudentScreen' component={AddStudentScreen} options = {{ headerShown: false }} />
                <Stack.Screen name = 'AddSuperAdmin' component={AddSuperAdmin} options = {{ headerShown: false }} />
                <Stack.Screen name = 'AddBuildingScreen' component={AddBuildingScreen} options = {{ headerShown: false }} />
                <Stack.Screen name = 'AddCollege' component={AddCollege} options = {{ headerShown: false }} />
                <Stack.Screen name = 'AdminSuggestionScreen' component={AdminSuggestionScreen} options = {{ headerShown: false }} />
                <Stack.Screen name = 'AdminReportScreen' component={AdminReportScreen} options = {{ headerShown: false }} />
                <Stack.Screen name = 'AdminFeedBackScreen' component={AdminFeedBackScreen} options = {{ headerShown: false }} />
                <Stack.Screen name = 'AdminBugReportScreen' component={AdminBugReportScreen} options = {{ headerShown: false }} />
                <Stack.Screen name = 'AddAdminCitizenChart' component={AddAdminCitizenChart} options = {{ headerShown: false }} />
                <Stack.Screen name = 'LogBookScreen' component={LogBookScreen} options = {{ headerShown: false }} />
                <Stack.Screen name = 'Camera' component={Camera} options = {{ headerShown: false }}/>
                <Stack.Screen name = 'TCScreen' component={TCScreen} options= {{headerShown: false}} />

            </Stack.Navigator>
        </NavigationContainer>
    </Provider>

  )
}