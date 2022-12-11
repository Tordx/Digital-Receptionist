import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { Box, CloseButton } from '../../../ScreenComponents/Buttons'
import { useNavigation } from '@react-navigation/native'
import { Version } from '../../../Assets/constants/constants';
export default function AdminMainMenu() {

    const navigation = useNavigation('');


  return (
    <View style = {{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
        
        <Text style = {{fontSize: 30, fontWeight: 'bold'}} >Static Data Configuration</Text>
        <Text style = {{fontSize: 15, fontWeight: '300', color: 'black'}} >Add / Edit / Delete</Text>
        <View style = {{flexDirection: 'row'}}>
      <Box
      
      source = {require('../../../Assets/Img/icons8-classroom-settings-96.png')}
      onPress = {() => navigation.navigate('AddClassScreen')}
      title = 'Classes'
      style = {styles.Box}
      titleStyle = {styles.title}

      />
      <Box
      
      source = {require('../../../Assets/Img/icons8-admin-settings-96.png')}
      onPress = {() => navigation.navigate('AddAdminScreen')}
      title = 'Admin'
      style = {styles.Box}
      titleStyle = {styles.title}

      />
      <Box
      
      source = {require('../../../Assets/Img/icons8-event-settings-96.png')}
      onPress = {() => navigation.navigate('AddEventScreen')}
      title = 'Events'
      style = {styles.Box}
      titleStyle = {styles.title}

      /> 
      <Box
      
      source = {require('../../../Assets/Img/icons8-female-teacher-settings-96.png')}
      onPress = {() => navigation.navigate('AddFacultyScreen')}
      title = 'Faculty'
      style = {styles.Box}
      titleStyle = {styles.title}

      />
      <Box
      
      source = {require('../../../Assets/Img/icons8-building-settings-96.png')}
      onPress = {() => navigation.navigate('AddBuildingScreen')}
      title = 'Buildings'
      style = {styles.Box}
      titleStyle = {styles.title}

      />
      </View>
      <Text style = {{fontSize: 30, fontWeight: 'bold'}} >Gathered Data and Settings</Text>
        <Text style = {{fontSize: 15, fontWeight: '300', color: 'black'}} > Review / Distribute / Improve </Text>
      <View style = {{flexDirection: 'row'}}>
      
      
      <Box
      
      source = {require('../../../Assets/Img/icons8-edit-property-96.png')}
      onPress = {() => navigation.navigate('LogBookScreen')}
      title = 'Log Book'
      style = {styles.Box}
      titleStyle = {styles.title}

      />

      <Box
      
      source = {require('../../../Assets/Img/icons8-edit-property-96.png')}
      onPress = {() => navigation.navigate('AddStudentScreen')}
      title = 'Student Data'
      style = {styles.Box}
      titleStyle = {styles.title}

      />

      <Box
      
      source = {require('../../../Assets/Img/icons8-answers-96.png')}
      onPress = {() => navigation.navigate('AdminReports')}
      title = 'Reports'
      style = {styles.Box}
      titleStyle = {styles.title}

      />
      <Box
      
      source = {require('../../../Assets/Img/icons8-services-96.png')}
      onPress = {() => navigation.navigate('AddSuperAdmin')}
      title = 'Edit Admin'
      style = {styles.Box}
      titleStyle = {styles.title}

      />
      <Box
      
      source = {require('../../../Assets/Img/icons8-conference-96.png')}
      onPress = {() => console.log('General Info')}
      title = 'Developers'
      style = {styles.Box}
      titleStyle = {styles.title}

      />
      </View>
      <Text> DKHDR {Version}</Text>
    </View>
  )
}

const styles = StyleSheet.create({

    title: {

        color: 'grey',
        marginTop: 5,
        fontWeight: '700'

    },

    Box: {

        backgroundColor: '#fff',
        elevation: 3,
        shadowOpacity: 1,
        borderRadius: 1,
        marginVertical: 20,
        margin: 3,


    }

})